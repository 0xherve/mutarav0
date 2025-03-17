
import { createClient } from '@supabase/supabase-js';

// The public keys can be exposed in the client code
// Private keys should be stored in environment variables on the server
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

// Create a Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
