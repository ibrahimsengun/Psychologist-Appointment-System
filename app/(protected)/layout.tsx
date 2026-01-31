import { createClient } from '@/utils/supabase/server';
import { AdminLayoutClient } from '@/components/admin-layout-client';

export default async function ProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <>
      {/* Prevent search engines from indexing admin pages */}
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <AdminLayoutClient userEmail={user?.email ?? null}>
        {children}
      </AdminLayoutClient>
    </>
  );
}
