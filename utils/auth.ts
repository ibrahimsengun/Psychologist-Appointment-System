import { createClient } from '@/utils/supabase/server';

// Server action'lar middleware'den bağımsız çağrılabildiği için admin işlemleri
// kendi girişini doğrular.
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Bu işlem için giriş yapmalısınız');
  }

  return supabase;
}
