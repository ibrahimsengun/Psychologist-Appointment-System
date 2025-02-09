import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface AppointmentRejectedEmailProps {
  name: string;
  date: string;
  time: string;
  reason?: string;
}

export default function AppointmentRejectedEmail({
  name,
  date,
  time,
  reason
}: AppointmentRejectedEmailProps) {
  const formattedDate = format(new Date(date), 'EEEE, d MMMM yyyy', { locale: tr });

  return (
    <Html>
      <Head />
      <Preview>Randevu Talebiniz Reddedildi - Lokman Yılmaz</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Randevu Talebiniz Reddedildi</Heading>
          <Text style={text}>Sayın {name},</Text>
          <Text style={text}>Maalesef aşağıdaki randevu talebiniz reddedilmiştir:</Text>

          <Section style={section}>
            <Text style={detailText}>
              <strong>Tarih:</strong> {formattedDate}
            </Text>
            <Text style={detailText}>
              <strong>Saat:</strong> {time}
            </Text>
          </Section>

          {reason && (
            <Text style={text}>
              <strong>Red Nedeni:</strong> {reason}
            </Text>
          )}

          <Text style={text}>
            Yeni bir randevu talebi oluşturmak için web sitemizi ziyaret edebilirsiniz.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Bu e-posta randevu sistemimiz tarafından otomatik olarak gönderilmiştir. Lütfen bu
            e-postayı yanıtlamayınız.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif'
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px'
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  marginBottom: '24px',
  textAlign: 'center' as const
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '16px'
};

const detailText = {
  ...text,
  marginBottom: '8px'
};

const section = {
  padding: '24px',
  backgroundColor: '#f9fafb',
  borderRadius: '12px',
  marginBottom: '24px'
};

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '100%',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
  marginBottom: '16px'
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '24px 0'
};

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'center' as const
};
