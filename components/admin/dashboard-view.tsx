import { ApproveAppointmentButton } from '@/components/admin/approve-appointment-button';
import { cn } from '@/lib/utils';
import { DashboardAppointment, DashboardData } from '@/types/dashboard';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import Link from 'next/link';

function formatDay(date: string) {
  return format(new Date(`${date}T00:00:00`), 'd MMMM EEEE', { locale: tr });
}

function MetricCard({
  label,
  value,
  href,
  highlight
}: {
  label: string;
  value: number;
  href: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'rounded-lg border p-4 transition-colors',
        highlight
          ? 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-200'
          : 'bg-card hover:bg-muted/60'
      )}
    >
      <p className={cn('text-sm', highlight ? 'text-amber-800 dark:text-amber-300' : 'text-muted-foreground')}>{label}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums">{value.toLocaleString('tr-TR')}</p>
    </Link>
  );
}

function Section({
  title,
  href,
  linkLabel,
  children
}: {
  title: string;
  href?: string;
  linkLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border bg-card p-5">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="font-semibold">{title}</h2>
        {href && (
          <Link href={href} className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            {linkLabel}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function AppointmentRow({
  appointment,
  showDate,
  canApprove
}: {
  appointment: DashboardAppointment;
  showDate?: boolean;
  canApprove: boolean;
}) {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <div className="min-w-0">
        <p className="truncate text-sm">
          <span className="font-semibold tabular-nums">{appointment.time.slice(0, 5)}</span>{' '}
          {showDate && <span className="text-muted-foreground">{formatDay(appointment.date)} · </span>}
          {appointment.name}
        </p>
        <a href={`tel:${appointment.phone}`} className="text-xs text-muted-foreground hover:underline">
          {appointment.phone}
        </a>
      </div>
      {appointment.status === 'pending' ? (
        canApprove ? (
          <ApproveAppointmentButton id={appointment.id} />
        ) : (
          <span className="shrink-0 text-xs text-muted-foreground">Saati geçti</span>
        )
      ) : (
        <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-950/50 dark:text-green-300">
          Onaylandı
        </span>
      )}
    </li>
  );
}

function EmptyText({ children }: { children: React.ReactNode }) {
  return <p className="py-2 text-sm text-muted-foreground">{children}</p>;
}

export function DashboardView({ data }: { data: DashboardData }) {
  const waitingCount = data.pendingAppointments.length + data.pendingQuestionCount;
  const pendingOnOtherDays = data.pendingAppointments.filter(
    (appointment) => !data.todayAppointments.some((today) => today.id === appointment.id)
  );

  return (
    <div className="mx-auto max-w-5xl py-4">
      <h1 className="text-2xl font-bold md:text-3xl">{data.greeting} Lokman Bey</h1>
      <p className="mt-1 text-muted-foreground">
        {waitingCount > 0 ? `${waitingCount} işiniz sizi bekliyor.` : 'Şu an bekleyen bir işiniz yok.'}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard
          label="Onay bekleyen randevu"
          value={data.pendingAppointments.length}
          href="/admin/appointments"
          highlight={data.pendingAppointments.length > 0}
        />
        <MetricCard
          label="Cevap bekleyen soru"
          value={data.pendingQuestionCount}
          href="/admin/questions"
          highlight={data.pendingQuestionCount > 0}
        />
        <MetricCard label="Son 7 gün gelen mesaj" value={data.messagesLast7Days} href="/admin/messages" />
        <MetricCard label="Toplam blog okunması" value={data.totalViews} href="/admin/blog" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Bugünün randevuları" href="/admin/appointments" linkLabel="Tüm randevular">
          {data.todayAppointments.length > 0 ? (
            <ul className="divide-y">
              {data.todayAppointments.map((appointment) => (
                <AppointmentRow
                  key={appointment.id}
                  appointment={appointment}
                  canApprove={data.pendingAppointments.some((pending) => pending.id === appointment.id)}
                />
              ))}
            </ul>
          ) : (
            <EmptyText>
              Bugün randevunuz yok.
              {data.nextAppointment &&
                ` Sıradaki: ${formatDay(data.nextAppointment.date)}, ${data.nextAppointment.time.slice(0, 5)}.`}
            </EmptyText>
          )}
        </Section>

        <Section title="Cevap bekleyen sorular" href="/admin/questions" linkLabel="Tüm sorular">
          {data.pendingQuestions.length > 0 ? (
            <ul className="divide-y">
              {data.pendingQuestions.map((question) => (
                <li key={question.id} className="py-2.5 text-sm">
                  <p className="line-clamp-2">{question.questionText}</p>
                  {question.name && <p className="mt-0.5 text-xs text-muted-foreground">{question.name}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <EmptyText>Cevap bekleyen soru yok.</EmptyText>
          )}
        </Section>

        {pendingOnOtherDays.length > 0 && (
          <Section title="Onay bekleyen diğer randevular">
            <ul className="divide-y">
              {pendingOnOtherDays.map((appointment) => (
                <AppointmentRow key={appointment.id} appointment={appointment} showDate canApprove />
              ))}
            </ul>
          </Section>
        )}

        <Section title="En çok okunan yazılar" href="/admin/blog" linkLabel="Tüm yazılar">
          {data.topPosts.length > 0 ? (
            <ul className="divide-y">
              {data.topPosts.map((post) => (
                <li key={post.slug} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                  <Link href={`/blog/${post.slug}`} target="_blank" prefetch={false} className="truncate hover:underline">
                    {post.title}
                  </Link>
                  <span className="shrink-0 tabular-nums text-muted-foreground">{post.views.toLocaleString('tr-TR')}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyText>Yazılar okundukça burada listelenecek.</EmptyText>
          )}
        </Section>
      </div>
    </div>
  );
}
