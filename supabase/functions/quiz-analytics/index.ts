import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // POST: track a quiz event
    if (req.method === "POST") {
      const { session_id, quiz_variant, event_type } = await req.json();

      if (!session_id || !quiz_variant || !event_type) {
        return new Response(
          JSON.stringify({ error: "Missing required fields: session_id, quiz_variant, event_type" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const { error } = await supabase.from("quiz_events").insert({
        session_id,
        quiz_variant,
        event_type,
      });

      if (error) {
        throw new Error(`Insert failed: ${error.message}`);
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // GET: fetch aggregated analytics
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("quiz_events")
        .select("quiz_variant, event_type");

      if (error) {
        throw new Error(`Query failed: ${error.message}`);
      }

      const map: Record<string, { quiz_variant: string; page_visits: number; starts: number; completions: number; claims: number }> = {};

      for (const row of data) {
        if (!map[row.quiz_variant]) {
          map[row.quiz_variant] = { quiz_variant: row.quiz_variant, page_visits: 0, starts: 0, completions: 0, claims: 0 };
        }
        const entry = map[row.quiz_variant];
        if (row.event_type === "page_visited") entry.page_visits++;
        else if (row.event_type === "quiz_start") entry.starts++;
        else if (row.event_type === "quiz_complete") entry.completions++;
        else if (row.event_type === "claim") entry.claims++;
      }

      return new Response(JSON.stringify(Object.values(map)), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("quiz-analytics error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
