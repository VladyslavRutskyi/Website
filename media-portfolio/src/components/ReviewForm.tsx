"use client";
import React, { useState } from "react";

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewConsent, setReviewConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedName = name.replace(/[\u0000-\u001F\u007F]/g, '').trim();
    const sanitizedReview = reviewText.replace(/[\u0000-\u001F\u007F]/g, '').trim();

    if (!reviewConsent) {
      alert('Please confirm that you agree to the review disclosure before submitting.');
      return;
    }

    if (!sanitizedName || sanitizedName.length < 2) {
      alert('Please enter your name or business name.');
      return;
    }

    if (sanitizedReview.length < 10) {
      alert('Please provide a more detailed review.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await fetch('https://media-api.vladyslavrutskyi.workers.dev/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: sanitizedName, rating, text: sanitizedReview })
      });
      setIsSubmitted(true);
    } catch (error) {
      alert("Error submitting review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div style={{ background: '#151515', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '12px', textAlign: 'center', marginTop: '40px' }}>
        <h3 style={{ color: '#c8ff3d', marginBottom: '8px', fontSize: '1.5rem' }}>Thank You!</h3>
        <p style={{ color: '#d1d5db' }}>Your feedback has been submitted and is pending approval.</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#151515', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '12px', marginTop: '40px' }}>
      <h3 style={{ color: '#fff', marginBottom: '8px' }}>Leave a Review</h3>
      <p style={{ color: '#686a70', fontSize: '0.85rem', marginBottom: '24px' }}>Share your experience working with me.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ color: '#fff', display: 'block', marginBottom: '8px', fontSize: '0.85rem' }}>Rating</label>
          <div style={{ display: 'flex', gap: '8px', cursor: 'pointer' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                style={{ color: star <= (hoveredRating || rating) ? '#c8ff3d' : '#333', fontSize: '2rem', lineHeight: '1', transition: 'color 0.2s ease' }}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <label htmlFor="review-name" style={{ color: '#fff', fontSize: '0.85rem' }}>Name / Business</label>
        <input id="review-name" type="text" placeholder="Your Name / Brand" required value={name} onChange={(e) => setName(e.target.value)} style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#0a0a0a', color: '#fff', padding: '13px 14px', borderRadius: '8px' }} />
        <label htmlFor="review-text" style={{ color: '#fff', fontSize: '0.85rem' }}>Your review</label>
        <textarea id="review-text" placeholder="Tell me about your experience..." rows={4} required value={reviewText} onChange={(e) => setReviewText(e.target.value)} style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#0a0a0a', color: '#fff', padding: '13px 14px', borderRadius: '8px' }} />
        <p style={{ color: '#d1d5db', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
          By submitting a review, you authorize Vladyslav Rutskyi Creative Studios to display the review and the name or business name you provide on its website, portfolio, social media, and other promotional materials. Review content may be edited for clarity or length before publication.
        </p>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#fff', fontSize: '0.85rem', lineHeight: 1.5 }}>
          <input
            type="checkbox"
            checked={reviewConsent}
            onChange={(e) => setReviewConsent(e.target.checked)}
            required
            aria-label="I agree to the use of my submitted review as described above and acknowledge the Privacy Policy"
            style={{ marginTop: '2px', minWidth: '18px', width: '18px', height: '18px' }}
          />
          <span>
            I agree to the use of my submitted review as described above and acknowledge the <a href="/Website/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#c8ff3d' }}>Privacy Policy</a>.
          </span>
        </label>
        <button type="submit" disabled={isSubmitting} className="button primary" style={{ background: '#c8ff3d', color: '#000', fontWeight: 900, alignSelf: 'flex-start', marginTop: '8px', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
          {isSubmitting ? "Posting..." : "Post Feedback"}
        </button>
      </form>
    </div>
  );
}