export type PricingTier = {
  id: string;
  name: string;
  price: number;
  blurb: string;
  deliverables: string[];
  timeline: string;
  revisions: string;
  accent: "neutral" | "gold" | "slate" | "charcoal";
  badge?: string;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "STARTER",
    price: 1250,
    blurb: "A focused production sprint designed for businesses needing short-form content quickly.",
    deliverables: [
      "One production session up to 3 hours",
      "4 edited short-form videos",
      "10 edited photos",
      "Basic creative direction",
      "1 revision round included",
    ],
    timeline: "Standard turnaround: 7-10 business days",
    revisions: "Up to 2 revision rounds",
    accent: "neutral",
  },
  {
    id: "growth",
    name: "GROWTH",
    price: 2750,
    blurb: "The sweet spot for growing brands that need more volume, consistency, and campaign support.",
    deliverables: [
      "Two production sessions up to 3 hours each",
      "8 edited videos",
      "20 edited photos",
      "Creative direction",
      "Content planning",
      "2 revision rounds included",
    ],
    timeline: "Standard turnaround: 10-14 business days",
    revisions: "Up to 3 revision rounds",
    accent: "gold",
    badge: "Most Popular",
  },
  {
    id: "premium",
    name: "PREMIUM",
    price: 4500,
    blurb: "A premium campaign package for businesses building a stronger visual presence across channels.",
    deliverables: [
      "Four production sessions up to 3 hours each",
      "12 edited videos",
      "30 edited photos",
      "Advanced editing",
      "Cinematic storytelling",
      "Monthly content strategy",
      "Performance review",
      "3 revision rounds included",
    ],
    timeline: "Standard turnaround: 2-3 weeks",
    revisions: "Up to 4 revision rounds",
    accent: "slate",
  },
  {
    id: "elite",
    name: "ELITE",
    price: 7500,
    blurb: "A high-touch content partnership for multi-location campaigns and ongoing creative production.",
    deliverables: [
      "Four to six production sessions",
      "16-20 edited videos",
      "50+ edited photos",
      "Creative direction",
      "Campaign development",
      "Social media management options",
      "Analytics and reporting",
      "Priority scheduling",
      "Priority support",
    ],
    timeline: "Custom production calendar",
    revisions: "Project-based revision plan",
    accent: "charcoal",
    badge: "Custom Quote",
  },
];

export const pricingAddons = [
  { id: "extra-video", name: "Additional videos", price: 220, note: "Per additional edited short-form video." },
  { id: "extra-hour", name: "Additional shooting hours", price: 180, note: "Per additional hour beyond the included package time." },
  { id: "extra-photo", name: "Additional photography", price: 45, note: "Per additional edited photo." },
  { id: "motion-graphics", name: "Advanced motion graphics", price: 350, note: "For motion overlays, text animation, and brand sequences." },
  { id: "drone", name: "Drone footage", price: 600, note: "Where legally permitted and insured for use." },
  { id: "rush-edit", name: "Rush editing", price: 300, note: "Priority turnaround for urgent campaign deadlines." },
  { id: "revisions", name: "Additional revisions", price: 120, note: "Per revision cycle beyond the included allowance." },
  { id: "raw-footage", name: "Raw footage delivery", price: 200, note: "Delivered as a full, unedited gallery for select projects." },
  { id: "extra-location", name: "Additional locations", price: 250, note: "Per extra location or setup change beyond the original plan." },
];

export const budgetOptions = [
  "Under $1,000",
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000+",
];
