import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text
} from '@react-email/components';

interface QuestionAnsweredEmailProps {
  name?: string;
  questionText: string;
  trackingCode: string;
}

export default function QuestionAnsweredEmail({
  name,
  questionText,
  trackingCode
}: QuestionAnsweredEmailProps) {
  const truncatedQuestion =
    questionText.length > 100 ? questionText.substring(0, 100) + '...' : questionText;

  return (
    <Html>
      <Head />
      <Preview>Sorunuz Cevaplandı - Lokman Yılmaz</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Sorunuz Cevaplandı</Heading>
          <Text style={text}>{name ? `Sayın ${name},` : 'Merhaba,'}</Text>
          <Text style={text}>Sorduğunuz soru cevaplandı.</Text>

          <Section style={section}>
            <Text style={detailText}>
              <strong>Sorunuz:</strong> {truncatedQuestion}
            </Text>
          </Section>

          <Section style={section}>
            <Link
              href={`${process.env.NEXT_PUBLIC_SITE_URL}/soru-sor/takip?kod=${trackingCode}`}
              style={button}
            >
              Cevabı Görüntüle
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Bu e-posta soru-cevap sistemimiz tarafından otomatik olarak gönderilmiştir. Lütfen bu
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
