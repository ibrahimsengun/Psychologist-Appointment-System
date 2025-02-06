import {
  createAvailableTimeSlot,
  deleteAvailableTimeSlot,
  getAppointments,
  getAvailableTimeSlots,
  updateAppointmentStatus
} from '@/actions/appointment-actions';
import { getContactMessages } from '@/actions/contact-messages-actions';
import { AppointmentsTable } from '@/components/appointments-table';
import { AvailableTimeSlotsTable } from '@/components/available-time-slots-table';
import ContactMessagesTable from '@/components/contact-messages-table';
import { AvailableTimeSlotForm } from '@/components/forms/available-time-slot-form';
import { AppointmentStatus, AvailableTimeSlotFormValues } from '@/types/appointments';
import { revalidatePath } from 'next/cache';

export default async function AdminPage() {
  const contactMessages = await getContactMessages();
  const appointments = await getAppointments();
  const availableTimeSlots = await getAvailableTimeSlots();

  async function handleStatusChange(id: string, status: AppointmentStatus) {
    'use server';
    await updateAppointmentStatus(id, status);
    revalidatePath('/admin');
  }

  async function handleAvailableTimeSlotSubmit(data: AvailableTimeSlotFormValues) {
    'use server';
    await createAvailableTimeSlot(data);
    revalidatePath('/admin');
  }

  async function handleAvailableTimeSlotDelete(id: string) {
    'use server';
    await deleteAvailableTimeSlot(id);
    revalidatePath('/admin');
  }
  return (
    <div className="grid grid-cols-1 container mb-8">
      <div className="border p-6 mb-8">
        <div className="text-lg font-semibold mb-4">İletişim Formunu Dolduranlar</div>
        <ContactMessagesTable contactMessages={contactMessages} />
      </div>
      <div>
        <div className="mb-12">
          <div className="bg-white border p-6">
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Yeni Müsait Zaman Ekle</h3>
              <AvailableTimeSlotForm onSubmit={handleAvailableTimeSlotSubmit} />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Mevcut Müsait Zamanlar</h3>
              <div className="bg-white border overflow-hidden">
                <AvailableTimeSlotsTable
                  timeSlots={availableTimeSlots}
                  onDelete={handleAvailableTimeSlotDelete}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border p-6">
          <h2 className="text-2xl font-bold mb-4">Randevular</h2>
          <div className="bg-white rounded-lg overflow-hidden">
            <AppointmentsTable appointments={appointments} onStatusChange={handleStatusChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
