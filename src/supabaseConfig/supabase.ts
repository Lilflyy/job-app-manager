import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://usqfubxlyzotybfspeyt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzcWZ1YnhseXpvdHliZnNwZXl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwODgxNTEsImV4cCI6MjA1NzY2NDE1MX0.KWE-HR8t3DdEKP_W-bMNTG-33gn4WUy9KZTnMLd7ON8'

export const supabase = createClient(supabaseUrl, supabaseKey)