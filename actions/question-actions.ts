'use server';

import { QuestionFormData, Question, PublicQuestion } from '@/types/questions';
import { createClient } from '@/utils/supabase/server';
import { createPublicClient } from '@/utils/supabase/public';
import { Resend } from 'resend';
import QuestionAnsweredEmail from '@/emails/question-answered';

const QUESTIONS_TABLE = 'questions';
const resend = new Resend(process.env.RESEND_API_KEY);

// Takip kodu oluştur: SRU-A7K3M2
function generateTrackingCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // I,O,0,1 karışıklık olmaması için çıkarıldı
  let code = 'SRU-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Public: Yeni soru gönder
export async function submitQuestion(
  data: QuestionFormData
): Promise<{ trackingCode: string }> {
  // Honeypot kontrolü
  if (data.honeypot) {
    // Spam sessizce reddedilir
    return { trackingCode: 'SRU-000000' };
  }

  const supabase = createPublicClient();
  const trackingCode = generateTrackingCode();

  const { error } = await supabase.from(QUESTIONS_TABLE).insert([
    {
      tracking_code: trackingCode,
      name: data.name || null,
      email: data.email || null,
      question_text: data.question_text,
      status: 'pending',
      allow_publish: data.allow_publish
    }
  ]);

  if (error) throw new Error('Soru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');

  return { trackingCode };
}

// Public: Takip kodu ile soru durumunu sorgula
export async function getQuestionByTrackingCode(code: string): Promise<{
  question_text: string;
  answer_text: string | null;
  status: string;
  created_at: string;
  answered_at: string | null;
} | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from(QUESTIONS_TABLE)
    .select('question_text, answer_text, status, created_at, answered_at')
    .eq('tracking_code', code.toUpperCase().trim())
    .single();

  if (error || !data) return null;
  return data;
}

// Public: Herkese açık cevaplanan soruları getir
export async function getPublicQuestions(): Promise<PublicQuestion[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from(QUESTIONS_TABLE)
    .select('id, question_text, answer_text, name, is_public, answered_at, created_at')
    .eq('is_public', true)
    .eq('status', 'answered')
    .order('answered_at', { ascending: false });

  if (error) return [];
  return data as PublicQuestion[];
}

// Admin: Tüm soruları getir (opsiyonel durum filtresi)
export async function getQuestions(status?: string): Promise<Question[]> {
  const supabase = await createClient();
  let query = supabase
    .from(QUESTIONS_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data as Question[];
}

// Admin: Soruyu cevapla
export async function answerQuestion(
  id: string,
  answerText: string,
  isPublic: boolean
): Promise<void> {
  const supabase = await createClient();

  // Önce soruyu bul (e-posta kontrolü için)
  const { data: question } = await supabase
    .from(QUESTIONS_TABLE)
    .select('*')
    .eq('id', id)
    .single();

  if (!question) throw new Error('Soru bulunamadı');

  const { error } = await supabase
    .from(QUESTIONS_TABLE)
    .update({
      answer_text: answerText,
      status: 'answered',
      is_public: isPublic,
      answered_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) throw new Error(error.message);

  // E-posta varsa bildirim gönder
  if (question.email) {
    try {
      await resend.emails.send({
        from: 'Lokman Yılmaz <onboarding@resend.dev>',
        to: question.email,
        subject: 'Sorunuz Cevaplandı - Psk. Lokman Yılmaz',
        react: QuestionAnsweredEmail({
          name: question.name || undefined,
          questionText: question.question_text,
          trackingCode: question.tracking_code
        })
      });
    } catch (e) {
      console.error('Email sending failed:', e);
    }
  }
}

// Admin: Soruyu reddet
export async function rejectQuestion(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from(QUESTIONS_TABLE)
    .update({
      status: 'rejected',
      updated_at: new Date().toISOString()
    })
    .eq('id', id);

  if (error) throw new Error(error.message);
}

// Admin: Soruyu sil
export async function deleteQuestion(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from(QUESTIONS_TABLE).delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// Admin: Bekleyen soru sayısı (sidebar badge için)
export async function getPendingQuestionCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from(QUESTIONS_TABLE)
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  if (error) return 0;
  return count || 0;
}

// Admin: Herkese açık görünürlüğü değiştir
export async function toggleQuestionPublic(id: string, isPublic: boolean): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from(QUESTIONS_TABLE)
    .update({ is_public: isPublic, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) throw new Error(error.message);
}
