'use server';

import { AdminBadgeCounts, DashboardAppointment, DashboardData } from '@/types/dashboard';
import { createClient } from '@/utils/supabase/server';

const SITE_TIME_ZONE = 'Europe/Istanbul';

// Sunucu UTC'de çalıştığı için "bugün" ve saat her zaman Türkiye saatine göre hesaplanır
function getLocalNow() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: SITE_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)!.value;

  return {
    date: `${get('year')}-${get('month')}-${get('day')}`,
    time: `${get('hour')}:${get('minute')}`,
    hour: Number(get('hour'))
  };
}

// YYYY-MM-DD biçimindeki tarihten n gün öncesini verir
function daysBefore(date: string, days: number) {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() - days);
  return value.toISOString().slice(0, 10);
}

function getGreeting(hour: number) {
  if (hour >= 5 && hour < 12) return 'Günaydın';
  if (hour >= 12 && hour < 18) return 'İyi günler';
  return 'İyi akşamlar';
}

// Saati geçmiş randevular artık onaylanamayacağı için bekleyen sayısına dahil edilmez
function isStillUpcoming(appointment: { date: string; time: string }, now: { date: string; time: string }) {
  return appointment.date > now.date || (appointment.date === now.date && appointment.time.slice(0, 5) >= now.time);
}

export async function getAdminBadgeCounts(): Promise<AdminBadgeCounts> {
  const supabase = await createClient();
  const now = getLocalNow();

  const [appointments, questions] = await Promise.all([
    supabase.from('appointments').select('date, time').eq('status', 'pending').gte('date', now.date),
    supabase.from('questions').select('*', { count: 'exact', head: true }).eq('status', 'pending')
  ]);

  return {
    appointments: (appointments.data ?? []).filter((a) => isStillUpcoming(a, now)).length,
    questions: questions.count ?? 0
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  const supabase = await createClient();
  const now = getLocalNow();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [appointmentsResult, questionsResult, messagesResult, viewsResult, whatsappResult] = await Promise.all([
    supabase
      .from('appointments')
      .select('id, date, time, name, phone, status')
      .gte('date', now.date)
      .neq('status', 'canceled')
      .order('date', { ascending: true })
      .order('time', { ascending: true }),
    supabase
      .from('questions')
      .select('id, name, question_text', { count: 'exact' })
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).gte('createdAt', sevenDaysAgo),
    supabase.from('blog_post_views').select('views, blog_posts (title, slug)').order('views', { ascending: false }),
    supabase.from('whatsapp_clicks').select('day, clicks')
  ]);

  for (const result of [appointmentsResult, questionsResult, messagesResult, viewsResult, whatsappResult]) {
    if (result.error) {
      console.error('Bugün ekranı verisi alınamadı:', result.error.message);
    }
  }

  const appointments = (appointmentsResult.data ?? []) as DashboardAppointment[];
  const upcoming = appointments.filter((a) => isStillUpcoming(a, now));
  const views = (viewsResult.data ?? []) as any[];
  const whatsappRows = whatsappResult.data ?? [];
  const sumClicksSince = (firstDay: string) =>
    whatsappRows.filter((row) => row.day >= firstDay).reduce((sum, row) => sum + Number(row.clicks), 0);

  return {
    greeting: getGreeting(now.hour),
    todayAppointments: appointments.filter((a) => a.date === now.date),
    nextAppointment: upcoming.find((a) => a.date !== now.date) ?? null,
    pendingAppointments: upcoming.filter((a) => a.status === 'pending'),
    pendingQuestions: (questionsResult.data ?? []).map((q) => ({
      id: q.id,
      name: q.name,
      questionText: q.question_text
    })),
    pendingQuestionCount: questionsResult.count ?? 0,
    messagesLast7Days: messagesResult.count ?? 0,
    totalViews: views.reduce((sum, row) => sum + Number(row.views), 0),
    topPosts: views
      .filter((row) => row.blog_posts)
      .slice(0, 5)
      .map((row) => ({ title: row.blog_posts.title, slug: row.blog_posts.slug, views: Number(row.views) })),
    whatsappClicks: {
      today: sumClicksSince(now.date),
      last7Days: sumClicksSince(daysBefore(now.date, 6)),
      last30Days: sumClicksSince(daysBefore(now.date, 29)),
      total: sumClicksSince('0000-01-01')
    }
  };
}
