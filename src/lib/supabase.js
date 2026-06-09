import { createClient } from '@supabase/supabase-js';

// Lazy initialization — client is created on first use, not at module load.
// This prevents the build from failing if env vars aren't available at build time.
let _client;

export function getSupabase() {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return _client;
}
