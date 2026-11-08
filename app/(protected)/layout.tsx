import { createClient } from '@/utils/supabase/server';
import { getAdminBadgeCounts } from '@/actions/dashboard-actions';
import { AdminLayoutClient } from '@/components/admin-layout-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default async function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const badgeCounts = user ? await getAdminBadgeCounts() : { appointments: 0, questions: 0 };

  return (
    <AdminLayoutClient userEmail={user?.email ?? null} badgeCounts={badgeCounts}>
      {children}
    </AdminLayoutClient>
  );
}
