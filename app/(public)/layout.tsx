import Footer from '@/components/footer';
import Header from '@/components/header';
import { createClient } from '@/utils/supabase/server';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  let adminEmail: string | null = null;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    adminEmail = user?.email ?? null;
  } catch { }

  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header adminEmail={adminEmail} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
