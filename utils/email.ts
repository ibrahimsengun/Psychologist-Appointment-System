import AppointmentConfirmedEmail from '@/emails/appointment-confirmed';
import AppointmentRejectedEmail from '@/emails/appointment-rejected';
import AppointmentRequestEmail from '@/emails/appointment-request';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendAppointmentConfirmationEmailParams {
  to: string;
  name: string;
  date: string;
  time: string;
  cancelToken: string;
}

interface SendAppointmentConfirmedEmailParams {
  to: string;
  name: string;
  date: string;
  time: string;
}

interface SendAppointmentRejectedEmailParams {
  to: string;
  name: string;
  date: string;
  time: string;
}

export async function sendAppointmentRequestEmail({
  to,


  name,
  date,
  time,
  cancelToken
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
      react: AppointmentRequestEmail({
        name,
        date,
        time,
        cancelToken
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


export async function sendAppointmentConfirmedEmail({
  to,
  name,
  date,
  time
}: SendAppointmentConfirmedEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY bulunamadı');
    return { success: false, error: 'RESEND_API_KEY bulunamadı' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Lokman Yılmaz <onboarding@resend.dev>',
      to: [to],
      subject: 'Randevu Onayı - Lokman Yılmaz',
      react: AppointmentConfirmedEmail({
        name,
        date,
        time
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

export async function sendAppointmentRejectedEmail({
  to,
  name,
  date,
  time
}: SendAppointmentRejectedEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY bulunamadı');
    return { success: false, error: 'RESEND_API_KEY bulunamadı' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Lokman Yılmaz <onboarding@resend.dev>',
      to: [to],
      subject: 'Randevu Reddedildi - Lokman Yılmaz',
      react: AppointmentRejectedEmail({
        name,
        date,
        time
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





