import { createAppointment, getAvailableTimeSlots } from '@/actions/appointment-actions';
import { AppointmentForm } from '@/components/forms/appointment-form';
import { AppointmentFormValues } from '@/types/appointments';

export default async function AppointmentPage() {
  const availableTimeSlots = await getAvailableTimeSlots();

  // Müsait zaman aralıklarını form için uygun formata dönüştürme
  const formattedTimeSlots = availableTimeSlots.reduce<{ date: string; times: string[] }[]>(
    (acc, slot) => {
      const existingDate = acc.find((item) => item.date === slot.date);
      if (existingDate) {
        existingDate.times.push(slot.startTime);
      } else {
        acc.push({ date: slot.date, times: [slot.startTime] });
      }
      return acc;
    },
    []
  );

  async function handleSubmit(data: AppointmentFormValues) {
    'use server';
    await createAppointment(data);
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Randevu Al</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <AppointmentForm availableTimeSlots={formattedTimeSlots} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
