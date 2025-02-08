import { getAppointments, updateAppointmentStatus } from '@/actions/appointment-actions';
import { AppointmentsTable } from '@/components/appointments-table';
import { AppointmentStatus } from '@/types/appointments';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export default async function AdminPage() {
  const appointments = await getAppointments();

  async function handleStatusChange(id: string, status: AppointmentStatus) {
    'use server';
    await updateAppointmentStatus(id, status);
    revalidatePath('/admin');
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Randevular</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <AppointmentsTable appointments={appointments} onStatusChange={handleStatusChange} />
      </div>
    </div>
  );
}
