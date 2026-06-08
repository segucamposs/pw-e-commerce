import { createClient } from '@supabase/supabase-js';

// createClient connects to our Supabase project using the project URL and the
// anon (public) key. The anon key is safe to expose in the browser because
// Row Level Security (RLS) on each table controls what the anon role can do.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
