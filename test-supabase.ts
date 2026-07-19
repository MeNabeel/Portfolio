import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

async function testSupabase() {
  if (!supabaseUrl) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL in .env");
    return;
  }

  console.log(`Connecting to: ${supabaseUrl}`);
  console.log(`Using Anon Key: ${supabaseKey.substring(0, 10)}...`);
  
  console.time("Supabase Auth Ping");
  try {
    // We ping the health endpoint directly using native fetch
    // This avoids the Node 20 WebSocket issue from the Supabase SDK
    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });
    
    console.timeEnd("Supabase Auth Ping");
    
    if (response.ok) {
      const data = await response.json();
      console.log("Supabase Auth is ONLINE and reachable!");
      console.log("Health response:", data);
    } else {
      console.error("Supabase API returned an error:", response.status, response.statusText);
      console.log(await response.text());
    }
  } catch (err: any) {
    console.timeEnd("Supabase Auth Ping");
    console.error("Network error: Could not reach Supabase.", err.message);
  }
}

testSupabase();
