"use client";

import { useEffect, useMemo, useState } from "react";
import OptimizedVideo from "../components/OptimizedVideo";
import ReviewForm from "../components/ReviewForm";
import { budgetOptions, pricingAddons, pricingTiers } from "../data/pricing";
import {
  brandPartners,
  businessMetrics,
  caseStudyHighlights,
  portfolioCategories,
  portfolioVideos,
  services,
  studioProcess,
} from "../data/siteContent";

type Review = {
  id: string;
  rating: number;
  name: string;
  text: string;
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [contactStatus, setContactStatus] = useState<string | null>(null);
  const [inquiry, setInquiry] = useState({
    name: "",
    businessName: "",
    email: "",
    service: "Commercial videography",
    budget: "",
    timeline: "",
    projectDescription: "",
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://media-api.vladyslavrutskyi.workers.dev/reviews");
        if (!response.ok) {
          setReviews([]);
          return;
        }

        const data = (await response.json()) as Review[];
        setReviews(Array.isArray(data) ? data : []);
      } catch {
        setReviews([]);
      }
    };

    fetchReviews();
  }, []);

  const filteredPortfolio = useMemo(() => {
    if (activeCategory === "All") return portfolioVideos;
    return portfolioVideos.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, businessName, email, service, budget, timeline, projectDescription } = inquiry;

    if (!name.trim() || !email.trim() || !projectDescription.trim()) {
      setContactStatus("Please complete the required fields before sending your inquiry.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setContactStatus("Please enter a valid email address.");
      return;
    }

    const body = [
      `Name: ${name}`,
      `Business: ${businessName || "Not provided"}`,
      `Email: ${email}`,
      `Service: ${service}`,
      `Budget: ${budget || "Not specified"}`,
      `Timeline: ${timeline || "Not specified"}`,
      "",
      "Project description:",
      projectDescription,
    ].join("\n");

    window.location.href = `mailto:vladyslavrutskyi@gmail.com?subject=${encodeURIComponent(
      `Project inquiry - ${service}`,
    )}&body=${encodeURIComponent(body)}`;

    setContactStatus("Your email app should open with the inquiry details ready to send.");
    setInquiry({
      name: "",
      businessName: "",
      email: "",
      service: "Commercial videography",
      budget: "",
      timeline: "",
      projectDescription: "",
    });
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand-mark" aria-label="Vladyslav Rutskyi Creative Studios home">
            <span className="brand-icon">VR</span>
            <span className="brand-text">Vladyslav Rutskyi</span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#portfolio">Portfolio</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="#contact" className="btn btn-primary header-cta">
            Start a Project
          </a>

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="section-kicker">Vladyslav Rutskyi — Founder & Creative Producer</p>
              <h1>Visual Storytelling That Moves Businesses Forward.</h1>
              <p className="lead">
                Strategic creative production, cinematic videography, and content designed to help businesses stand out and grow.
              </p>

              <div className="cta-row">
                <a href="#portfolio" className="btn btn-primary">
                  Explore Our Work
                </a>
                <a href="#contact" className="btn btn-secondary">
                  Start a Project
                </a>
              </div>

              <div className="mini-trust">
                <span>Commercial</span>
                <span>Brand campaigns</span>
                <span>Automotive</span>
                <span>Luxury product</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-video-shell">
                <OptimizedVideo
                  src="https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Black%20Lambo%20High%20Class%20Autosales%20v2.mp4"
                  className="hero-video"
                  priority
                />
              </div>
              <div className="floating-badge">Commercial • Brand • Automotive</div>
              <div className="floating-card">
                <strong>4+ years</strong>
                <span>Creative production experience</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-band">
          <div className="container stats-grid">
            {businessMetrics.map((metric) => (
              <div key={metric.label} className="stat-item">
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
                <small>{metric.note}</small>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Services</p>
              <h2>Creative production built for growth.</h2>
            </div>

            <div className="service-grid">
              {services.map((service) => (
                <article key={service.title} className="service-card">
                  <div className="service-index">0{services.indexOf(service) + 1}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="section light-section">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="section-kicker">Portfolio</p>
                <h2>Selected work across premium visual categories.</h2>
              </div>
              <div className="filter-group" aria-label="Portfolio categories">
                {portfolioCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={category === activeCategory ? "filter-chip active" : "filter-chip"}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="portfolio-grid">
              {filteredPortfolio.map((video) => (
                <article key={video.id} className="portfolio-card">
                  <div className="video-frame">
                    <OptimizedVideo src={video.url} className="portfolio-video" />
                  </div>
                  <div className="portfolio-copy">
                    <span>{video.category}</span>
                    <h3>{video.title}</h3>
                    <p>{video.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="case-studies" className="section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Case studies</p>
              <h2>Built around business goals, not just aesthetics.</h2>
            </div>

            <div className="case-grid">
              {caseStudyHighlights.map((study) => (
                <article key={study.client} className="case-card">
                  <div className="case-topline">
                    <span>{study.client}</span>
                    <span>{study.industry}</span>
                  </div>
                  <h3>{study.summary}</h3>
                  <ul>
                    <li>
                      <strong>Challenge:</strong> {study.challenge}
                    </li>
                    <li>
                      <strong>Strategy:</strong> {study.strategy}
                    </li>
                    <li>
                      <strong>Outcome:</strong> {study.outcome}
                    </li>
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="about-copy-block">
              <p className="section-kicker">About</p>
              <h2>Vladyslav Rutskyi — Founder & Creative Producer.</h2>
              <p>
                With 4+ years of experience and more than 500 completed projects, I produce cinematic visual content for businesses that want a stronger market presence.
              </p>
              <p>
                My work sits at the intersection of creative direction, marketing understanding, and production execution. I focus on turning ideas into professional visual systems that support brand perception, business growth, and campaign performance.
              </p>
              <div className="process-list">
                {studioProcess.map((step) => (
                  <span key={step}>{step}</span>
                ))}
              </div>
            </div>

            <div className="about-side-card">
              <div className="about-stat">
                <strong>4+</strong>
                <span>Years producing commercial and branded visual content.</span>
              </div>
              <div className="about-stat">
                <strong>500+</strong>
                <span>Projects delivered across brands, product launches, and events.</span>
              </div>
              <div className="about-stat">
                <strong>10+</strong>
                <span>Clients and collaborators across commercial and lifestyle work.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="section light-section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Pricing</p>
              <h2>Transparent packages built for real production needs.</h2>
            </div>

            <div className="pricing-grid">
              {pricingTiers.map((tier) => (
                <article key={tier.id} className={tier.accent === "gold" ? "tier-card featured" : "tier-card"}>
                  {tier.badge && <span className="badge">{tier.badge}</span>}
                  <div className="tier-header">
                    <h3>{tier.name}</h3>
                    <span className="price">${tier.price.toLocaleString()}</span>
                  </div>
                  <p className="tier-blurb">{tier.blurb}</p>
                  <ul>
                    {tier.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="tier-meta">
                    <span>{tier.timeline}</span>
                    <span>{tier.revisions}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="addon-section">
              <div className="section-heading compact">
                <p className="section-kicker">Add-ons</p>
                <h3>Optional production upgrades.</h3>
              </div>
              <div className="addon-grid">
                {pricingAddons.map((addon) => (
                  <div key={addon.id} className="addon-item">
                    <div>
                      <strong>{addon.name}</strong>
                      <span>{addon.note}</span>
                    </div>
                    <em>${addon.price}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Testimonials</p>
              <h2>Feedback from collaborators and clients.</h2>
            </div>

            {reviews.length > 0 ? (
              <div className="testimonial-grid">
                {reviews.map((review) => (
                  <article key={review.id} className="testimonial-card">
                    <div className="stars">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                    <p>&ldquo;{review.text}&rdquo;</p>
                    <span>— {review.name}</span>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">Reviews are loading or currently unavailable. Please check back soon.</div>
            )}

            <ReviewForm />
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading">
              <p className="section-kicker">Partners</p>
              <h2>Selected collaborators and creative partners.</h2>
            </div>

            <div className="brand-grid">
              {brandPartners.map((brand) => (
                <span key={brand} className="brand-pill">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div className="contact-panel">
              <p className="section-kicker">Contact</p>
              <h2>Tell me about your project.</h2>
              <p>
                Whether you need a single campaign shoot, a content system for growth, or a premium creative partner, I can help shape the right production plan.
              </p>
              <ul>
                <li>
                  Email: <a href="mailto:vladyslavrutskyi@gmail.com">vladyslavrutskyi@gmail.com</a>
                </li>
                <li>Location: Sacramento, California</li>
                <li>Availability: Project-based bookings and ongoing partnerships</li>
              </ul>
            </div>

            <form className="inquiry-form" onSubmit={handleSubmit}>
              <div className="field-grid">
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    value={inquiry.name}
                    onChange={(event) => setInquiry((current) => ({ ...current, name: event.target.value }))}
                    required
                  />
                </label>
                <label>
                  <span>Business name</span>
                  <input
                    type="text"
                    value={inquiry.businessName}
                    onChange={(event) =>
                      setInquiry((current) => ({ ...current, businessName: event.target.value }))
                    }
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    value={inquiry.email}
                    onChange={(event) => setInquiry((current) => ({ ...current, email: event.target.value }))}
                    required
                  />
                </label>
                <label>
                  <span>Service</span>
                  <select
                    value={inquiry.service}
                    onChange={(event) => setInquiry((current) => ({ ...current, service: event.target.value }))}
                  >
                    <option>Commercial videography</option>
                    <option>Social media video production</option>
                    <option>Automotive production</option>
                    <option>Jewelry and product videography</option>
                    <option>Photography</option>
                    <option>Brand campaigns</option>
                    <option>Creative direction</option>
                    <option>Monthly content partnership</option>
                  </select>
                </label>
                <label>
                  <span>Estimated budget</span>
                  <select
                    value={inquiry.budget}
                    onChange={(event) => setInquiry((current) => ({ ...current, budget: event.target.value }))}
                  >
                    <option value="">Select a budget</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Timeline</span>
                  <input
                    type="text"
                    value={inquiry.timeline}
                    onChange={(event) => setInquiry((current) => ({ ...current, timeline: event.target.value }))}
                    placeholder="e.g. Within 2-4 weeks"
                  />
                </label>
              </div>

              <label className="full-width">
                <span>Project description</span>
                <textarea
                  rows={6}
                  value={inquiry.projectDescription}
                  onChange={(event) =>
                    setInquiry((current) => ({ ...current, projectDescription: event.target.value }))
                  }
                  required
                />
              </label>

              {contactStatus && <p className="form-status">{contactStatus}</p>}

              <button type="submit" className="btn btn-primary submit-btn">
                Send Inquiry
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <h3>Vladyslav Rutskyi Creative Studios</h3>
            <p>Commercial videography, photography, and content systems for ambitious brands.</p>
          </div>

          <div className="footer-links">
            <a href="#portfolio">Portfolio</a>
            <a href="#services">Services</a>
            <a href="#pricing">Pricing</a>
            <a href="#about">About</a>
            <a href="/Website/privacy-policy">Privacy Policy</a>
            <a href="/Website/terms">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}
