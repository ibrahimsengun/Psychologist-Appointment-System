'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminPageHeader } from '@/components/admin/page-header';
import { AppointmentsList } from '@/components/appointments-list';
import { useAppointments } from '@/hooks/use-appointments';
import { isAfter } from 'date-fns';

export default function AppointmentsPage() {
  const { appointments, isLoading, updateAppointmentStatus } = useAppointments();
  const today = new Date();

  const activeAppointments = appointments.filter((appointment) =>
    isAfter(new Date(`${appointment.date} ${appointment.time}`), today)
  );

  const pastAppointments = appointments.filter(
    (appointment) => !isAfter(new Date(`${appointment.date} ${appointment.time}`), today)
  );

  if (isLoading) {
    return <p className="container py-8 text-sm text-muted-foreground">Randevular yükleniyor…</p>;
  }

  return (
    <div className="container py-8">
      <AdminPageHeader
        title="Randevular"
        description="Danışanların aldığı randevuları onaylayın veya iptal edin. Onay ve iptal, danışana e-postayla bildirilir."
      />

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" className="relative">
            Aktif Randevular
            {activeAppointments.length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                {activeAppointments.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="past">Geçmiş Randevular</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <AppointmentsList
            appointments={activeAppointments}
            onStatusChange={updateAppointmentStatus}
          />
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <AppointmentsList
            appointments={pastAppointments}
            onStatusChange={updateAppointmentStatus}
            isPastView
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
