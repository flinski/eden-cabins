import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hfhicokclkefuuconotw.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmaGljb2tjbGtlZnV1Y29ub3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDE4NzgsImV4cCI6MjA3NjExNzg3OH0.JuAdH4QHUEOiup_4y-yECIRqvpb5fcmz0s0CF6hMCoA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
