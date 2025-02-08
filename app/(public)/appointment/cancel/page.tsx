import { cancelAppointmentByCode, cancelAppointmentByToken } from '@/actions/appointment-actions';
import { AppointmentCancelForm } from '@/components/forms/appointment-cancel-form';
import { AppointmentCancelFormValues } from '@/types/appointments';
import { redirect } from 'next/navigation';

// Sayfayı dinamik olarak işaretle
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Form ile iptal işlemi için server action
async function handleFormSubmit(data: AppointmentCancelFormValues) {
  'use server';
  try {
    await cancelAppointmentByCode(data.phone, data.cancelCode);
    redirect('/appointment/cancel/success');
  } catch (error) {
    if (error instanceof Error && error.message === 'Bu randevu zaten iptal edilmiş') {
      redirect('/appointment/cancel/already-canceled');
    }
    throw error;
  }
}

// Token ile iptal işlemi için server action
async function handleTokenCancel(token: string) {
  'use server';
  try {
    await cancelAppointmentByToken(token);
    return { success: true, alreadyCanceled: false };
  } catch (error) {
    console.error('İptal hatası:', error);
    if (error instanceof Error && error.message === 'Bu randevu zaten iptal edilmiş') {
      return { success: false, alreadyCanceled: true };
    }
    return { success: false, alreadyCanceled: false };
  }
}

export default async function CancelPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const token = params.token as string | undefined;

  // Token ile iptal
  if (token) {
    const result = await handleTokenCancel(token);
    if (result.success) {
      redirect('/appointment/cancel/success');
    } else if (result.alreadyCanceled) {
      redirect('/appointment/cancel/already-canceled');
    } else {
      redirect('/appointment/cancel/error');
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8">Randevu İptali</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-600 mb-6">
            Randevunuzu iptal etmek için size e-posta ile gönderilen iptal kodunu ve randevu
            oluştururken kullandığınız telefon numarasını girin.
          </p>
          <AppointmentCancelForm onSubmit={handleFormSubmit} />
        </div>
      </div>
    </div>
  );
}
