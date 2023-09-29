import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kgbnjkjewnxuerruqbrg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtnYm5qa2pld254dWVycnVxYnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU0OTIwNjksImV4cCI6MjAxMTA2ODA2OX0.P8D9wQv6CZc6ESQ_RpyuLr9GVrwD_Al4kXYepu51Kko';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;