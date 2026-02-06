import {
  createTimeBlock,
  deleteTimeBlock,
  getTimeBlocks,
  getWeeklySchedule,
  updateWeeklySchedule
} from '@/actions/appointment-actions';
import { TimeBlockForm } from '@/components/forms/time-block-form';
import { WeeklyScheduleForm } from '@/components/forms/weekly-schedule-form';
import { TimeBlocksTable } from '@/components/time-blocks-table';
import { TimeBlockFormValues, WeeklyScheduleDay } from '@/types/appointments';
import { revalidatePath } from 'next/cache';

export default async function AvailableTimesPage() {
  const weeklySchedule = await getWeeklySchedule();
  const timeBlocks = await getTimeBlocks();

  async function handleUpdateSchedule(schedule: Omit<WeeklyScheduleDay, 'id'>[]) {
    'use server';
    await updateWeeklySchedule(schedule);
    revalidatePath('/admin/available-times');
  }

  async function handleCreateTimeBlock(data: TimeBlockFormValues) {
    'use server';
    await createTimeBlock(data);
    revalidatePath('/admin/available-times');
  }

  async function handleDeleteTimeBlock(id: string) {
    'use server';
    await deleteTimeBlock(id);
    revalidatePath('/admin/available-times');
  }

  return (
    <div className="px-4 md:container md:mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl md:text-3xl font-bold">Müsait Zamanlar</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Haftalık Şablon */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Haftalık Çalışma Şablonu</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Genel çalışma saatlerinizi belirleyin. Bu şablon her hafta otomatik olarak uygulanır.
          </p>
          <WeeklyScheduleForm initialSchedule={weeklySchedule} onSubmit={handleUpdateSchedule} />
        </div>

        {/* Zaman Bloğu Ekle */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">🚫 Zaman Bloğu Ekle</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Site dışı randevular, tatiller veya özel durumlar için belirli zamanları bloklayın.
          </p>
          <TimeBlockForm onSubmit={handleCreateTimeBlock} />
        </div>
      </div>

      {/* Bloklanmış Zamanlar Listesi */}
      <div className="mt-8 bg-white shadow-md rounded-lg">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">📅 Bloklanmış Zamanlar</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Aktif zaman blokları. Site üzerinden alınan randevular otomatik olarak burada görünür.
          </p>
        </div>
        <TimeBlocksTable timeBlocks={timeBlocks} onDelete={handleDeleteTimeBlock} />
      </div>
    </div>
  );
}
