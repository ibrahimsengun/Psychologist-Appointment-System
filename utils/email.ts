import AppointmentConfirmationEmail from '@/emails/appointment-confirmation';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendAppointmentConfirmationEmailParams {
  to: string;
  name: string;
  date: string;
  time: string;
  cancelToken: string;
  cancelCode: string;
}

export async function sendAppointmentConfirmationEmail({
  to,
  name,
  date,
  time,
  cancelToken,
  cancelCode
}: SendAppointmentConfirmationEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY bulunamadı');
    return { success: false, error: 'RESEND_API_KEY bulunamadı' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Lokman Yılmaz <onboarding@resend.dev>',
      to: [to],
      subject: 'Randevu Onayı - Lokman Yılmaz',
      react: AppointmentConfirmationEmail({
        name,
        date,
        time,
        cancelToken,
        cancelCode
      })
    });

    if (error) {
      console.error('Resend API hatası:', error);
      return { success: false, error };
    }

    console.log('E-posta gönderildi:', data);
    return { success: true, data };
  } catch (error) {
    console.error('E-posta gönderimi başarısız:', error);
    return { success: false, error };
  }
}
