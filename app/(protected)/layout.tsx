import { createClient } from '@/utils/supabase/server';
import { getAdminBadgeCounts } from '@/actions/dashboard-actions';
import { AdminLayoutClient } from '@/components/admin-layout-client';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

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

  if (!user) {
    redirect('/sign-in');
  }

  const badgeCounts = await getAdminBadgeCounts();

  return (
    <AdminLayoutClient userEmail={user?.email ?? null} badgeCounts={badgeCounts}>
      {children}
    </AdminLayoutClient>
  );
}
