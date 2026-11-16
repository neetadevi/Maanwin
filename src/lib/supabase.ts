import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://serszarrdzwfaiojaops.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcnN6YXJyZHp3ZmFpb2phb3BzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ3OTY4NzgsImV4cCI6MjExMDM3Mjg3OH0.Ju1lywLF35g2qgrF-8OEt9zeZq0p38hCBViudKbuqRY';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables! Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
