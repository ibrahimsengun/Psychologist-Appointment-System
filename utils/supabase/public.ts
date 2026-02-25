import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Cookie-free Supabase client for public read-only queries.
 * Safe to use inside unstable_cache() since it doesn't access cookies().
 */
export const createPublicClient = () => {
    return createSupabaseClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!
    );
};
