export interface Env {
  media_leads: D1Database;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 1. Handle CORS
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // 2. Fetch Approved Reviews (GET /reviews)
    if (request.method === "GET" && url.pathname.endsWith("/reviews")) {
      try {
        const { results } = await env.media_leads.prepare(
          "SELECT * FROM reviews WHERE approved = 1 ORDER BY created_at DESC"
        ).all();
        return new Response(JSON.stringify(results), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { headers: corsHeaders, status: 500 });
      }
    }

    // 3. Submit a New Review (POST /reviews)
    if (request.method === "POST" && url.pathname.endsWith("/reviews")) {
      try {
        const { name, rating, text } = (await request.json()) as any;
        await env.media_leads.prepare(
          "INSERT INTO reviews (name, rating, text, approved) VALUES (?1, ?2, ?3, 0)"
        ).bind(name, rating, text).run();
        
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { headers: corsHeaders, status: 500 });
      }
    }

    // 4. Submit a Booking Lead (POST /leads)
    if (request.method === "POST" && url.pathname.endsWith("/leads")) {
      try {
        const { name, email, bundle, message, total } = (await request.json()) as any;
        await env.media_leads.prepare(
          "INSERT INTO leads (name, email, bundle, message, total) VALUES (?1, ?2, ?3, ?4, ?5)"
        ).bind(name, email, bundle, message, total).run();
        
        return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { headers: corsHeaders, status: 500 });
      }
    }

    return new Response("Not found", { status: 404, headers: corsHeaders });
  },
};