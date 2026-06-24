import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = "https://xtsywuxnxijepsrwwycg.supabase.co";
const SUPABASE_KEY = "sb_publishable_0gUnvhjWz0rEZE2XfVqGXA_71GnHm9j";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
