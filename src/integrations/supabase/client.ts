import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nrgfxjotjfxtligbhahn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ2Z4am90amZ4dGxpZ2JoYWhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4Nzk4NTIsImV4cCI6MjA4MDQ1NTg1Mn0.l-ZLpAXA03_LMGT9w-QMEkcmQ_1Vo_q9qGkLqcaduJ4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);