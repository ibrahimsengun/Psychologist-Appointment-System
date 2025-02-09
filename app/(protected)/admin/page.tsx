'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppointmentsTable } from '@/components/appointments-table';
import { useAppointments } from '@/hooks/use-appointments';
import { isAfter, startOfDay } from 'date-fns';

export default function AdminPage() {
  const { appointments, updateAppointmentStatus } = useAppointments();
  const today = new Date();

  const activeAppointments = appointments.filter((appointment) =>
    isAfter(new Date(`${appointment.date} ${appointment.time}`), today)
  );

  const pastAppointments = appointments.filter(
    (appointment) => !isAfter(new Date(appointment.date), today)
  );

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Randevular</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Toplam aktif randevu: {activeAppointments.length}
          </span>
        </div>
      </div>

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
          <AppointmentsTable
            appointments={activeAppointments}
            onStatusChange={updateAppointmentStatus}
          />
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          <AppointmentsTable
            appointments={pastAppointments}
            onStatusChange={updateAppointmentStatus}
            isPastView
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
