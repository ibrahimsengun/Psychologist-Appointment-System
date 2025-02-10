import {
  createAvailableTimeSlot,
  deleteAvailableTimeSlot,
  getAvailableTimeSlots
} from '@/actions/appointment-actions';
import { AvailableTimeSlotsTable } from '@/components/available-time-slots-table';
import { AvailableTimeSlotForm } from '@/components/forms/available-time-slot-form';
import { AvailableTimeSlotFormValues } from '@/types/appointments';
import { revalidatePath } from 'next/cache';

export default async function AvailableTimesPage() {
  const availableTimeSlots = await getAvailableTimeSlots();

  async function handleSubmit(data: AvailableTimeSlotFormValues) {
    'use server';
    await createAvailableTimeSlot(data);
    revalidatePath('/admin/available-times');
  }

  async function handleDelete(id: string) {
    'use server';
    await deleteAvailableTimeSlot(id);
    revalidatePath('/admin/available-times');
  }

  return (
    <div className="px-4 md:container md:mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl md:text-3xl font-bold">Müsait Zamanlar</h1>
      </div>

      <div className="grid gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Yeni Müsait Zaman Ekle</h2>
          <AvailableTimeSlotForm onSubmit={handleSubmit} />
        </div>

        <div className="bg-white shadow-md rounded-lg">
          <AvailableTimeSlotsTable timeSlots={availableTimeSlots} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}
