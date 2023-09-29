import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bzqfvoyafgzuisxfisrt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6cWZ2b3lhZmd6dWlzeGZpc3J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3ODE4NzAsImV4cCI6MjAxMTM1Nzg3MH0.Ohn7J6E0xyReUlslZYc8CyX8umN8JZtkNQjMrnqckh8';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;