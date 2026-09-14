import { describe, it, expect } from "vitest";
import worker, { enforceRateLimit, normalizeLeadInput, normalizeReviewInput } from "../src/index";

const baseEnv = {
  media_leads: {
    prepare: () => ({
      bind: () => ({
        run: async () => ({ success: true }),
      }),
      all: async () => ({ results: [] }),
    }),
  },
} as any;

describe("media API validation", () => {
  it("accepts valid review input", () => {
    expect(normalizeReviewInput({ name: "Jane Studio", rating: 5, text: "Excellent creative direction and delivery." })).toEqual({
      name: "Jane Studio",
      rating: 5,
      text: "Excellent creative direction and delivery.",
    });
  });

  it("rejects invalid review values", () => {
    expect(() => normalizeReviewInput({ name: "J", rating: 6, text: "Too short" })).toThrow();
  });

  it("accepts valid lead input", () => {
    expect(normalizeLeadInput({
      name: "Acme Brand",
      email: "hello@example.com",
      bundle: "Growth Batch",
      message: "We need a social launch package.",
      total: "$2,500",
    })).toEqual({
      name: "Acme Brand",
      email: "hello@example.com",
      bundle: "Growth Batch",
      message: "We need a social launch package.",
      total: "$2,500",
    });
  });

  it("rate limits repeated requests per IP path", () => {
    const key = "127.0.0.1:/reviews";
    for (let i = 0; i < 12; i += 1) {
      expect(enforceRateLimit(key, 12, 60_000)).toBe(true);
    }
    expect(enforceRateLimit(key, 12, 60_000)).toBe(false);
  });

  it("rejects malformed or oversized review submissions", async () => {
    const request = new Request("https://example.com/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "A", rating: 4, text: "Short" }),
    });

    const response = await worker.fetch(request, baseEnv);
    expect(response.status).toBe(400);
  });
});
