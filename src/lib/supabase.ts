// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hzopbajgwmnxqztdgkrp.supabase.co';
const supabaseKey = 'sb_publishable_EekdRwHSoGUO3Yqp7rnuXA_eg5vp8pB';

export const supabase = createClient(supabaseUrl, supabaseKey);
