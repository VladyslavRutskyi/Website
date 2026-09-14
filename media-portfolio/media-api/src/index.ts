export interface Env {
  media_leads: D1Database;
}

const allowedOrigins = new Set([
  "https://vladyslavrutskyi.github.io",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost",
]);

export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX_REQUESTS = 12;
export const MAX_BODY_BYTES = 64 * 1024;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...headers,
    },
  });
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true;
  return allowedOrigins.has(origin);
}

export function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && isAllowedOrigin(origin) ? origin : "https://vladyslavrutskyi.github.io";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

export function enforceRateLimit(key: string, maxRequests = RATE_LIMIT_MAX_REQUESTS, windowMs = RATE_LIMIT_WINDOW_MS): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || now >= existing.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= maxRequests) {
    return false;
  }

  existing.count += 1;
  return true;
}

function stripDangerousMarkup(raw: string): string {
  return raw.replace(/\s+/g, " ").replace(/[<>]/g, "").trim();
}

export function sanitizeText(value: unknown, maxLength: number, fieldName: string, minLength = 1): string {
  const raw = typeof value === "string" ? value : String(value ?? "");
  const trimmed = stripDangerousMarkup(raw);

  if (trimmed.length < minLength) {
    throw new Error(`${fieldName} is required.`);
  }

  if (trimmed.length > maxLength) {
    throw new Error(`${fieldName} is too long.`);
  }

  if (/<\s*(script|iframe|object|embed|svg|style)\b|javascript:|on\w+\s*=|behavior\s*:/i.test(raw)) {
    throw new Error(`${fieldName} contains unsupported content.`);
  }

  return trimmed;
}

export function validateEmail(value: unknown): string {
  const email = sanitizeText(value, 254, "email", 5).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please provide a valid email address.");
  }
  return email;
}

export function normalizeReviewInput(body: unknown) {
  if (!body || typeof body !== "object") {
    throw new Error("Review payload must be a JSON object.");
  }

  const review = body as Record<string, unknown>;
  const name = sanitizeText(review.name, 120, "name", 2);
  const rating = Number(review.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("Rating must be an integer between 1 and 5.");
  }

  const text = sanitizeText(review.text, 2000, "review text", 10);
  return { name, rating, text };
}

export function normalizeLeadInput(body: unknown) {
  if (!body || typeof body !== "object") {
    throw new Error("Lead payload must be a JSON object.");
  }

  const lead = body as Record<string, unknown>;
  const name = sanitizeText(lead.name, 120, "name", 2);
  const email = validateEmail(lead.email);
  const bundle = lead.bundle ? sanitizeText(lead.bundle, 200, "bundle", 1) : "";
  const message = lead.message ? sanitizeText(lead.message, 2500, "message", 1) : "";
  const total = lead.total ? sanitizeText(lead.total, 80, "total") : "";
  return { name, email, bundle, message, total };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const corsHeaders = getCorsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (origin && !isAllowedOrigin(origin)) {
      return jsonResponse({ error: "Origin not allowed." }, 403, corsHeaders);
    }

    const clientIp = getClientIp(request);
    const routeKey = `${clientIp}:${url.pathname}`;
    if (!enforceRateLimit(routeKey)) {
      return jsonResponse({ error: "Too many requests. Please try again in a minute." }, 429, corsHeaders);
    }

    if (request.method === "GET" && url.pathname.endsWith("/reviews")) {
      try {
        const { results } = await env.media_leads.prepare(
          "SELECT id, name, rating, text, approved, created_at FROM reviews WHERE approved = 1 ORDER BY created_at DESC LIMIT 20"
        ).all();
        return new Response(JSON.stringify(results), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
        });
      } catch (err: any) {
        return jsonResponse({ error: err.message }, 500, corsHeaders);
      }
    }

    if (request.method === "POST" && url.pathname.endsWith("/reviews")) {
      try {
        const contentType = request.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          return jsonResponse({ error: "JSON request body required." }, 415, corsHeaders);
        }

        const rawBody = await request.text();
        if (rawBody.length === 0 || rawBody.length > MAX_BODY_BYTES) {
          return jsonResponse({ error: "Request body is empty or exceeds the maximum allowed size." }, 413, corsHeaders);
        }

        const payload = JSON.parse(rawBody) as unknown;
        const { name, rating, text } = normalizeReviewInput(payload);

        await env.media_leads.prepare(
          "INSERT INTO reviews (name, rating, text, approved) VALUES (?1, ?2, ?3, 0)"
        ).bind(name, rating, text).run();

        return jsonResponse({ success: true }, 200, corsHeaders);
      } catch (err: any) {
        return jsonResponse({ error: err.message || "Unable to submit review." }, 400, corsHeaders);
      }
    }

    if (request.method === "POST" && url.pathname.endsWith("/leads")) {
      try {
        const contentType = request.headers.get("content-type") || "";
        if (!contentType.includes("application/json")) {
          return jsonResponse({ error: "JSON request body required." }, 415, corsHeaders);
        }

        const rawBody = await request.text();
        if (rawBody.length === 0 || rawBody.length > MAX_BODY_BYTES) {
          return jsonResponse({ error: "Request body is empty or exceeds the maximum allowed size." }, 413, corsHeaders);
        }

        const payload = JSON.parse(rawBody) as unknown;
        const { name, email, bundle, message, total } = normalizeLeadInput(payload);

        await env.media_leads.prepare(
          "INSERT INTO leads (name, email, bundle, message, total) VALUES (?1, ?2, ?3, ?4, ?5)"
        ).bind(name, email, bundle, message, total).run();

        return jsonResponse({ success: true }, 200, corsHeaders);
      } catch (err: any) {
        return jsonResponse({ error: err.message || "Unable to submit inquiry." }, 400, corsHeaders);
      }
    }

    return jsonResponse({ error: "Not found." }, 404, corsHeaders);
  },
};