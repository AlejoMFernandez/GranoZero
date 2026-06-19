import { createClient } from '@supabase/supabase-js'

// Credenciales del proyecto Supabase de GranoZero
const SUPABASE_URL = 'https://xtsywuxnxijepsrwwycg.supabase.co'
const SUPABASE_KEY = 'sb_publishable_0gUnvhjWz0rEZE2XfVqGXA_71GnHm9j'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
