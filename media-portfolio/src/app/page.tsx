"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import OptimizedVideo from "../components/OptimizedVideo";
import ReviewForm from "../components/ReviewForm";
// Import EmailJS module securely for client-side execution context
import emailjs from "@emailjs/browser";

const featuredCases = [
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Black%20Lambo%20High%20Class%20Autosales%20v2.mp4", label: "Auto Showcase", title: "Black Lambo High Class", desc: "Luxury auto content for high-end sales", category: "Automotive" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Lambo%20Edit%20Narek%20%231.mp4", label: "Hero Cut", title: "Lambo Edit Narek #1", desc: "Performance-driven hero cut", category: "Automotive" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/BMW%20Alpina%20Prestige%20Motorsport%20%232.mp4", label: "Auto Showcase", title: "BMW Alpina Prestige", desc: "Motorsport highlight reel", category: "Automotive" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/6Side%20Hellcat.mp4", label: "Auto Showcase", title: "6Side Hellcat", desc: "High energy automotive edit", category: "Automotive" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Prestige%20Motorsport%20Introductory%20Showroom%20Video%201v4%20.mp4", label: "Showroom", title: "Prestige Motorsport", desc: "Introductory showroom tour", category: "Automotive" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Supra%20Edit%204k.mp4", label: "Auto Showcase", title: "Supra 4K Edit", desc: "High-performance car feature", category: "Automotive" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Blue%20Rolex%20Oyster%20Peretual%20Datejust%20v1.1.mp4", label: "Product Film", title: "Blue Rolex Oyster", desc: "Luxury watch lifestyle film", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Ice%20Vault%20Rolex%20March%2021,%202026.mp4", label: "Showcase", title: "Ice Vault Rolex", desc: "Watch product showcase", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Ice%20Vault%20Hope%20pendant.mp4", label: "Product Feature", title: "Ice Vault Hope Pendant", desc: "Detailed piece showcase", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Iced%20Watch%20Ice%20Vault%20FD.mp4", label: "Product Feature", title: "Iced Watch FD", desc: "Premium watch visuals", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Kendrick%20spinning%20Rolexes%20Recolored.mp4", label: "Creative Edit", title: "Spinning Rolexes", desc: "Dynamic recolored sequence", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/LALA%20pendant%20recolored.mp4", label: "Product Feature", title: "LALA Pendant", desc: "Custom pendant detail", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/MR%20K%20BUSSED%20DOWN%20SHELL%20CHAIN%20V2.mp4", label: "Showcase", title: "Mr K Shell Chain", desc: "Custom bussed down chain", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Narek%20Team%20Steez%20Sterling%20Silver%20Watch%20%232.mp4", label: "Product Highlight", title: "Team Steez Silver Watch", desc: "Sterling silver showcase", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Ice%20Vault%20New%20Ring%20.mp4", label: "Product Feature", title: "Ice Vault New Ring", desc: "Premium ring showcase", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/NAREK%20RING%20.mp4", label: "Product Feature", title: "Narek Ring", desc: "Detailed custom ring showcase", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Production%20of%20the%20ring%20Render%20Finalized%20%232.mp4", label: "BTS Process", title: "Ring Production", desc: "Behind the scenes 3D render", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Proposal%20Ring%20by%20the%20ocean.mp4", label: "Lifestyle", title: "Ocean Proposal Ring", desc: "Cinematic ring showcase", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Sprite%20Rolex%20Oyster%20Peretual%20Date%20v1.1.mp4", label: "Watch Showcase", title: "Sprite Rolex Oyster", desc: "Luxury watch presentation", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Swag%20Pendant.mp4", label: "Product Feature", title: "Swag Pendant", desc: "Detailed piece showcase", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/mr%20K%20diamond%20for%20500%20or%209000.mp4", label: "Comparison", title: "Mr K Diamond Challenge", desc: "Jewelry price comparison", category: "Jewelry" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/M1llionz%20Grillz%20Final%20Video.mp4", label: "Editorial", title: "M1llionz Grillz", desc: "Music brand editorial content", category: "Lifestyle & Events" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Laron%20Backyard%20Final%20Final%20RTP.mp4", label: "Event", title: "Laron Backyard", desc: "Event coverage and vibes", category: "Lifestyle & Events" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/OneWayNick.MP4", label: "Lifestyle", title: "One Way Nick", desc: "Lifestyle and event feature", category: "Lifestyle & Events" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Ice%20Vault%20AD%20Commercial%20Final.mp4", label: "Commercial", title: "Ice Vault AD Commercial", desc: "Retail campaign commercial edit", category: "Brand & Commercial" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Kflex%20IceVault.mp4", label: "Promo", title: "Kflex IceVault", desc: "Artist feature promo", category: "Brand & Commercial" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/Mr%20K%20Customs%20Resell%20Final.mp4", label: "Commercial", title: "Mr K Customs", desc: "Resell promotion video", category: "Brand & Commercial" },
  { url: "https://pub-3b7f22f29c844581b299336014312a8b.r2.dev/Website%20Ready%20Videos/MR%20K%20Why%20did%20choose%20Jewelry%20FINAL%20VIDEO.mp4", label: "Brand Interview", title: "Why Choose Jewelry", desc: "Mr K brand narrative", category: "Brand & Commercial" }
];

const categories = ["All", "Jewelry", "Automotive", "Lifestyle & Events", "Brand & Commercial"];
const panelClasses = ['one', 'two', 'three', 'four', 'five', 'six'];

const monthlyData = [
  { name: "Starter Batch", price: 1000, dot: "green", features: ["2 shoots, up to 3 hrs each", "4 Basic Videos", "2 Standard Videos", "10 Retouched Photos"], value: 1350 },
  { name: "Growth Batch", price: 2500, dot: "yellow", features: ["4 shoots, up to 3 hrs each", "6 Basic Videos", "4 Standard Videos", "2 Premium Videos", "1 Luxury Video", "30 Retouched Photos"], value: 3800 },
  { name: "Premium Batch", price: 4000, dot: "red", features: ["4 shoots, up to 4 hrs each", "8 Basic Videos", "6 Standard Videos", "2 Premium Videos", "2 Luxury Videos", "50 Retouched Photos"], value: 5500 },
  { name: "Elite Batch", price: 7500, dot: "white", features: ["6 shoots (up to 6 hrs ea)", "10 Basic + 10 Standard Videos", "3 Premium + 3 Luxury Videos", "Social Media Mgmt Included", "100+ Photos"], value: 9950 }
];

const oneTimeData = [
  { name: "Pro Photoshoot (8 hrs)", price: 800, desc: "An 8-hour comprehensive production session with up to 100 retouched photos." },
  { name: "Luxury Single Video", price: 500, desc: "A singular 15-60s cinematic edit with 3D elements and Digital Compositing. DOES NOT INCLUDE THE SHOOT"  },
  { name: "Half-Day Session (4 hrs)", price: 350, desc: "A focused 4-hour shooting block with up to 60 retouched photos." },
  { name: "Mini Session (2 hrs)", price: 250, desc: "A quick 2-hour shoot with up to 20 retouched photos." }
];

const videoTiers = [
  { name: "Basic", time: "10-60s", desc: "Simple cuts, minimal transitions, subtitles." },
  { name: "Standard", time: "10-50s", desc: "Creative cuts, multi-layer transitions, localized Frequency EQ, and VFX." },
  { name: "Premium", time: "10-40s", desc: "Advanced Masking, Color Grading, motion graphics, and Speed Ramping." },
  { name: "Luxury", time: "10-30s", desc: "3D Elements, Digital Compositing, and AI-Enhanced tools." }
];

const addonData = [
  { name: "Rush Delivery (24h)", price: 300, desc: "Project priority with first proof delivered in 24 hours." },
  { name: "Rush Delivery (48h)", price: 200, desc: "Project delivery ahead of the standard 14-day window." },
  { name: "RAW Gallery Access", price: 200, desc: "Full access to all unedited RAW files from your production." },
  { name: "Cinematic Video Add-on", price: 100, desc: "Up to 30s cinematic video added to any photoshoot." },
  { name: "Photos on Set", price: 100, desc: "Up to 20 retouched high-resolution stills made on set at videoshoot." },
  { name: "Extra Retouching", price: 100, desc: "10 additional high-resolution retouched photos." },
  { name: "Live Editing", price: 50, desc: "Watch the workflow live and provide feedback in real-time." }
];

export default function Home() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [introVideos, setIntroVideos] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [shuffledCases, setShuffledCases] = useState<any[]>([]);
  const [packageTab, setPackageTab] = useState("Monthly");
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [customAdded, setCustomAdded] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeVideoTier, setActiveVideoTier] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  
  const [customShoots, setCustomShoots] = useState(0);
  const [basicQty, setBasicQty] = useState(0);
  const [standardQty, setStandardQty] = useState(0);
  const [premiumQty, setPremiumQty] = useState(0);
  const [luxuryQty, setLuxuryQty] = useState(0);

  useEffect(() => {
    fetch('https://media-api.vladyslavrutskyi.workers.dev/reviews')
      .then(res => res.json())
      .then((data: any) => setReviews(data))
      .catch(err => console.error("Error fetching reviews:", err));
  }, []);

  useEffect(() => {
    const shuffle = () => [...featuredCases].sort(() => 0.5 - Math.random());
    const clientShuffled = shuffle();
    setShuffledCases(clientShuffled);
    setIntroVideos(clientShuffled.slice(0, 6)); 
    const timer = setTimeout(() => setIsIntroComplete(true), 3900); 
    return () => clearTimeout(timer);
  }, []);

  const displayedCases = useMemo(() => {
    if (activeCategory === "All") return shuffledCases.length > 0 ? shuffledCases : featuredCases;
    return featuredCases.filter(v => v.category === activeCategory);
  }, [activeCategory, shuffledCases]);

  const infiniteCases = [...displayedCases, ...displayedCases, ...displayedCases];

  const totalStats = useMemo(() => {
    const allItems = [...monthlyData, ...oneTimeData, ...addonData, { name: 'Full SMM Management', price: 500, value: 500 }];
    const items = selectedPackages.filter(p => !p.startsWith("Custom Build")).map(name => allItems.find(p => p.name === name)).filter(Boolean);

    const basePrice = items.reduce((acc, p) => acc + (p?.price || 0), 0);
    const baseValue = items.reduce((acc, p) => {
      const val = (p as any)?.value !== undefined ? (p as any).value : (p?.price || 0);
      return acc + val;
    }, 0);

    const customRaw = (customShoots * 150) + (basicQty * 100) + (standardQty * 250) + (premiumQty * 500) + (luxuryQty * 350);
    const totalVideos = basicQty + standardQty + premiumQty + luxuryQty;
    const customDiscount = totalVideos >= 3 ? customRaw * 0.15 : 0;
    const finalCustom = customRaw - customDiscount;

    return {
      price: basePrice + (customAdded ? finalCustom : 0),
      savings: (baseValue - basePrice) + (customAdded ? customDiscount : 0),
      customCurrent: finalCustom,
      customDiscounted: customDiscount > 0
    };
  }, [selectedPackages, customAdded, customShoots, basicQty, standardQty, premiumQty, luxuryQty]);

  const togglePackage = (pkgName: string) => setSelectedPackages(prev => prev.includes(pkgName) ? prev.filter(p => p !== pkgName) : [...prev, pkgName]);
  
  const handleCustomToggle = () => {
    const customKey = "Custom Build";
    if (customAdded) {
      setSelectedPackages(prev => prev.filter(p => p !== customKey));
      setCustomAdded(false);
    } else {
      setSelectedPackages(prev => [...prev, customKey]);
      setCustomAdded(true);
    }
  };

  const handleInfiniteScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const oneCopyWidth = container.scrollWidth / 3;
    if (container.scrollLeft <= 10 || container.scrollLeft >= (oneCopyWidth * 2) - 10) container.scrollLeft = oneCopyWidth;
  };

  const scrollLeft = () => carouselRef.current?.scrollBy({ left: -454, behavior: 'smooth' });
  const scrollRight = () => carouselRef.current?.scrollBy({ left: 454, behavior: 'smooth' });

  // EmailJS form processor loop
  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const clientName = formData.get('name') as string;
    const clientEmail = formData.get('email') as string;
    const clientMessage = formData.get('message') as string;
    const totalPrice = totalStats.price.toLocaleString();
    const selectedBundles = selectedPackages.length > 0 ? selectedPackages.join(', ') : "Custom Build Layout";

    const templateParams = {
      name: clientName,
      client_email: clientEmail,
      selected_bundles: selectedBundles,
      total_price: totalPrice,
      message: clientMessage,
    };

    try {
      // Corrected API integration mapping utilizing your explicit public key
      await emailjs.send(
        'service_lg0v2dk', 
        'template_cjsaj8o', 
        templateParams,
        'MCPap-zTMCUR6jGWt'
      );

      // Smooth inline HTML replacement to eliminate jarring alert popups entirely
      const container = document.getElementById('booking-form-wrapper');
      if (container) {
        container.innerHTML = `
          <div style="text-align: center; padding: 30px 10px; color: #151515; background: #f8f6f0; border-radius: 8px; border: 2px dashed #151515;">
            <div style="font-size: 3rem; margin-bottom: 10px; color: #151515;">[ + ]</div>
            <h3 style="font-size: 1.6rem; margin: 0 0 10px 0; font-weight: 900; uppercase; letter-spacing: 0.05em;">Agreement Sent!</h3>
            <p style="color: #686a70; line-height: 1.6; font-size: 0.95rem; margin: 0 auto; max-width: 290px;">
              Thank you, <strong>${clientName}</strong>. A stylized blueprint contract overview has been dispatched to <strong>${clientEmail}</strong>. Check your inbox to view the agreement and lock in your production date!
            </p>
          </div>
        `;
      }
      setSelectedPackages([]); 
    } catch (error) {
      console.error("Email delivery failed:", error);
      alert("Automation delivery skipped. Please email me directly at vladyslavrutskyi@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* INTRO */}
      <div className={`intro ${isIntroComplete ? "is-complete" : ""}`} id="intro">
        <canvas id="videoWall" aria-hidden="true"></canvas>
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'white', zIndex: 99999, opacity: 0, pointerEvents: 'none', animation: 'hardFlash 2s ease-out 4.0s forwards' }}></div>
        <div className="lens-flight">
          <div className="tunnel-ring ring-d"></div><div className="tunnel-ring ring-c"></div><div className="glass-disc"></div><div className="tunnel-ring ring-b"></div><div className="iris-core"></div><div className="ring-a"></div>
        </div>
        <div className="flight-stage">
          <div className="stage-light"></div><div className="stage-floor"></div>
          <div className="media-orbit">
            {introVideos.map((video, idx) => (
              <div key={idx} className={`orbit-panel panel-${panelClasses[idx]}`}><OptimizedVideo priority={true} src={video.url} /></div>
            ))}
          </div>
        </div>
      </div>

      <header className="topbar">
        <a className="brand" href="#home"><span className="brand-mark"></span><span>Media Producer</span></a>
        <nav><a href="#cases">Cases</a><a href="#packages">Prices</a><a href="#reviews">Reviews</a><a href="#book">Book</a></nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-media">
            <div className="camera-body">
              <div className="fx-top-handle"></div><div className="fx-hotshoe"></div><div className="fx-record"></div><div className="fx-logo">SONY</div><div className="fx-model">FX30</div><div className="fx-grip"></div><div className="camera-lens"></div>
            </div>
            <div className="floating-frame frame-a"></div><div className="floating-frame frame-b"></div><div className="floating-frame frame-c"></div>
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Vladyslav Rutskyi</p>
            <h1>Creative Studios</h1>
            <div className="hero-actions"><a className="button primary" href="#packages">Build Package</a><a className="button ghost" href="#cases">View cases</a></div>
          </div>
        </section>

        <section className="marquee">
          <div style={{ display: 'flex', width: 'max-content', gap: '60px', padding: '25px 0', animation: 'marquee 40s linear infinite' }}>
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <span className="flame-text" style={{ color: '#c8ff3d' }}>Short-form Video</span><span className="flame-text" style={{ color: '#c8ff3d' }}>Launch Content</span><span className="flame-text" style={{ color: '#c8ff3d' }}>Brand Shoots</span>
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section className="section cases" id="cases">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
            <div><p className="eyebrow">Selected cases</p><h2 style={{ margin: 0 }}>Featured work</h2></div>
            <div className="work-controls"><button className="work-arrow" onClick={scrollLeft}>‹</button><button className="work-arrow" onClick={scrollRight}>›</button></div>
          </div>
          <div className="no-scrollbar" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '16px' }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '8px 20px', borderRadius: '999px', border: activeCategory === cat ? '1px solid #c8ff3d' : '1px solid #e5e7eb', backgroundColor: activeCategory === cat ? '#c8ff3d' : '#ffffff', color: activeCategory === cat ? '#000' : '#686a70', fontWeight: 700, cursor: 'pointer' }}>{cat}</button>
            ))}
          </div>
          <div className="case-grid-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="carousel-indicator indicator-left"></div><div className="carousel-indicator indicator-right"></div>
            <div className="case-grid no-scrollbar" ref={carouselRef} onScroll={handleInfiniteScroll} style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', gap: '1.5rem', paddingBottom: '1.5rem', scrollBehavior: 'smooth' }}>
              {infiniteCases.map((video, idx) => (
                <article key={`${activeCategory}-${video.url}-${idx}`} className="case-card">
                  <div className="case-visual" style={{ aspectRatio: '4/5' }}><OptimizedVideo src={video.url} /></div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 800, color: '#686a70', margin: '0 0 4px' }}>{video.label}</p>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#151515', textShadow: 'none' }}>{video.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section about" id="about">
          <div className="about-copy" style={{ background: '#151515', padding: '40px', borderRadius: '12px' }}>
            <p className="eyebrow" style={{ color: '#c8ff3d' }}>About me</p>
            <h2 style={{ color: '#fff' }}>I am not JUST a Videographer</h2>
            <p style={{ color: '#d1d5db' }}>I am 21 years old based in Sacramento, CA, Currently a 4-th year student pursuing Computer Science Degree at the University of California, Merced.</p>
            <p style={{ color: '#d1d5db' }}>I help founders, local brands, venues, and service businesses produce consistent videos that build momentum and drive results. With <strong>4 years</strong> of background in media production and a passion for storytelling, I craft compelling narratives that resonate with audiences.</p>
          </div>
          <div className="about-stats" style={{ display: 'grid', gap: '16px' }}>
            {[{v: "4 YEARS", l: "Of Experience"}, {v: "500+", l: "Projects"}, {v: "10+ Clients", l: "100% Satisfaction"}].map((s, i) => (
              <div key={i} style={{ background: '#151515', border: '1px solid #fff', padding: '32px', textAlign: 'center', borderRadius: '8px' }}>
                <strong style={{ color: '#fff', fontSize: '2.5rem', display: 'block' }}>{s.v}</strong>
                <span style={{ color: '#c8ff3d', fontWeight: 800 }}>{s.l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PACKAGES */}
        <section className="section packages" id="packages">
          <div style={{ marginBottom: '32px' }}>
            <p className="eyebrow">Investment</p><h2>Build your production.</h2>
            <div className="no-scrollbar" style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginTop: '20px' }}>
              {["Monthly", "Management", "One-Time", "Add-ons", "Custom"].map(t => (
                <button key={t} onClick={() => setPackageTab(t)} style={{ padding: '8px 20px', borderRadius: '999px', background: packageTab === t ? '#c8ff3d' : '#fff', border: 'none', fontWeight: 800, cursor: 'pointer' }}>{t}</button>
              ))}
            </div>
          </div>

          {(packageTab === "Monthly" || packageTab === "Custom") && (
            <div style={{ marginBottom: '32px', background: '#151515', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 800, marginBottom: '12px', textTransform: 'uppercase' }}>Reels Video Tier Definitions</p><p style={{ color: '#c8ff3d', fontSize: '0.85rem', fontWeight: 400 }}> Each next video style may include previous description </p>
              
              <div className="no-scrollbar" style={{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: activeVideoTier ? '16px' : '0' }}>
                {videoTiers.map(tier => (
                  <button
                    key={tier.name}
                    onClick={() => setActiveVideoTier(activeVideoTier === tier.name ? null : tier.name)}
                    style={{ padding: '6px 16px', borderRadius: '999px', background: activeVideoTier === tier.name ? '#c8ff3d' : '#222', color: activeVideoTier === tier.name ? '#000' : '#fff', border: '1px solid', borderColor: activeVideoTier === tier.name ? '#c8ff3d' : '#333', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s' }}
                  >
                    {tier.name} {activeVideoTier === tier.name ? '↓' : '→'}
                  </button>
                ))}
              </div>

              {activeVideoTier && (
                <div style={{ background: '#0a0a0a', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ color: '#fff' }}>{activeVideoTier} Edit</strong>
                    <span style={{ color: '#c8ff3d', fontSize: '0.85rem', fontWeight: 800 }}>{videoTiers.find(t => t.name === activeVideoTier)?.time}</span>
                  </div>
                  <p style={{ margin: 0, color: '#d1d5db', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {videoTiers.find(t => t.name === activeVideoTier)?.desc}
                  </p>
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {packageTab === "Monthly" && monthlyData.map(pkg => {
              const isGrowth = pkg.name === "Growth Batch";
              const isElite = pkg.name === "Elite Batch";
              const isSelected = selectedPackages.includes(pkg.name);
              const isDark = isGrowth || isElite;
              return (
                <article key={pkg.name} className="package-card" style={{ background: isElite ? '#000' : (isGrowth ? '#151515' : '#fff'), color: isDark ? '#fff' : '#000', position: 'relative' }}>
                  {isGrowth && <div style={{ position: 'absolute', top: '40px', right: '-45px', background: '#c8ff3d', color: '#000', padding: '10px 60px', transform: 'rotate(45deg)', fontWeight: 900 }}>Most Popular</div>}
                  {isElite && <div style={{ position: 'absolute', top: '40px', right: '-45px', background: '#ff3b3b', color: '#fff', padding: '10px 60px', transform: 'rotate(45deg)', fontWeight: 900 }}>Best Value</div>}
                  <h3>{pkg.name}</h3><p className="price">${pkg.price.toLocaleString()}</p>
                  <p style={{ color: '#c8ff3d', fontSize: '0.85rem', fontWeight: 800, textShadow: '1px 1px 2px #000' }}>Save ${(pkg.value - pkg.price).toLocaleString()} in this batch</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', flexGrow: 1 }}>
                    {pkg.features.map(f => <li key={f} style={{ padding: '8px 0', borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>{f}</li>)}
                  </ul>
                  <button onClick={() => togglePackage(pkg.name)} className="select-package" style={{ background: isSelected ? '#c8ff3d' : (isDark ? '#fff' : '#000'), color: isSelected ? '#000' : (isDark ? '#000' : '#fff'), border: isSelected ? '2px solid #000' : 'none' }}>
                    {isSelected ? "✓ Added" : "Select Batch"}
                  </button>
                </article>
              );
            })}

            {packageTab === "Management" && (
              <article className="package-card featured" style={{ gridColumn: '1 / -1', maxWidth: '500px', margin: '0 auto', background: '#151515', color: '#fff' }}>
                <span className="dot" style={{ background: '#8fe8ff' }}></span>
                <h3>Social Media Management</h3><p className="price">$500 <small>/ mo</small></p>
                <p style={{ color: 'rgba(255,255,255,0.7)', margin: '20px 0', fontSize: '0.9rem' }}>
                  Creation of a tailored 3-month plan, monthly posting calendar, 3-4 posts per week, copywriting, hashtag research, community engagement, and performance reports.
                </p>
                <button onClick={() => togglePackage("Full SMM Management")} className="select-package" style={{ background: selectedPackages.includes("Full SMM Management") ? '#c8ff3d' : '#fff', color: '#000' }}>
                  {selectedPackages.includes("Full SMM Management") ? "✓ Added" : "Add Management"}
                </button>
              </article>
            )}

            {packageTab === "One-Time" && oneTimeData.map(p => (
              <article key={p.name} className="package-card" style={{ minHeight: 'auto', background: '#fff' }}>
                <h3>{p.name}</h3><p className="price">${p.price}</p>
                <p style={{ fontSize: '0.85rem', color: '#686a70', marginBottom: '20px', lineHeight: '1.4' }}>{p.desc}</p>
                <button onClick={() => togglePackage(p.name)} className="select-package" style={{ background: selectedPackages.includes(p.name) ? '#c8ff3d' : '#000', color: selectedPackages.includes(p.name) ? '#000' : '#fff' }}>
                  {selectedPackages.includes(p.name) ? "✓ Added" : "Add to Bundle"}
                </button>
              </article>
            ))}

            {packageTab === "Add-ons" && addonData.map(a => (
              <article key={a.name} className="package-card" style={{ minHeight: 'auto', background: '#fff' }}>
                <h3 style={{ marginBottom: '4px' }}>{a.name}</h3><p className="price" style={{ fontSize: '1.5rem', marginBottom: '12px' }}>${a.price}</p>
                <p style={{ fontSize: '0.85rem', color: '#686a70', marginBottom: '20px', lineHeight: '1.4' }}>{a.desc}</p>
                <button onClick={() => togglePackage(a.name)} className="select-package" style={{ background: selectedPackages.includes(a.name) ? '#c8ff3d' : '#000', color: selectedPackages.includes(a.name) ? '#000' : '#fff' }}>
                  {selectedPackages.includes(a.name) ? "✓ Added" : "Add to Bundle"}
                </button>
              </article>
            ))}

            {packageTab === "Custom" && (
              <div style={{ gridColumn: '1 / -1', background: '#fff', padding: '32px', borderRadius: '12px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                <div>
                  <h3 style={{ color: '#151515' }}>Tailored Content Builder</h3>
                  <label style={{ color: '#151515', fontWeight: 800 }}>Shoots (3hr blocks)
                    <input type="number" min="0" value={customShoots} onChange={e => setCustomShoots(Number(e.target.value))} style={{ border: '1px solid #ddd', marginTop: '8px' }} />
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                    <div><label style={{ fontSize: '0.75rem', color: '#151515', fontWeight: 800 }}>Basic ($100)</label><input type="number" min="0" value={basicQty} onChange={e => setBasicQty(Number(e.target.value))} style={{ border: '1px solid #ddd' }} /></div>
                    <div><label style={{ fontSize: '0.75rem', color: '#151515', fontWeight: 800 }}>Standard ($250)</label><input type="number" min="0" value={standardQty} onChange={e => setStandardQty(Number(e.target.value))} style={{ border: '1px solid #ddd' }} /></div>
                    <div><label style={{ fontSize: '0.75rem', color: '#151515', fontWeight: 800 }}>Premium ($350)</label><input type="number" min="0" value={premiumQty} onChange={e => setPremiumQty(Number(e.target.value))} style={{ border: '1px solid #ddd' }} /></div>
                    <div><label style={{ fontSize: '0.75rem', color: '#151515', fontWeight: 800 }}>Luxury ($500)</label><input type="number" min="0" value={luxuryQty} onChange={e => setLuxuryQty(Number(e.target.value))} style={{ border: '1px solid #ddd' }} /></div>
                  </div>
                </div>
                <div style={{ background: '#f8f6f0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '8px', padding: '24px', textAlign: 'center' }}>
                  <p style={{ margin: 0, color: '#686a70', fontWeight: 800 }}>Estimated Build Total:</p>
                  <div style={{ fontSize: '3rem', fontWeight: 900, color: '#151515' }}>${totalStats.customCurrent.toLocaleString()}</div>
                  {totalStats.customDiscounted && <p style={{ color: '#c8ff3d', fontWeight: 900, textShadow: '1px 1px 2px #000', margin: '8px 0 0' }}>✓ 15% Multi-Video Discount Applied</p>}
                  <button onClick={handleCustomToggle} className="select-package" style={{ marginTop: '24px', width: '100%', maxWidth: '240px', background: customAdded ? '#c8ff3d' : '#000', color: customAdded ? '#000' : '#fff' }}>
                    {customAdded ? "Remove from Bundle" : "Add to Bundle"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FEEDBACK */}
        <section className="section" id="reviews" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="eyebrow" style={{ color: '#c8ff3d' }}>Feedback</p><h2 style={{ color: '#fff' }}>Client Reviews</h2>
          
          <div className="no-scrollbar" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px', 
            marginTop: '40px',
            maxHeight: '400px', 
            overflowY: 'auto',  
            paddingRight: '10px'
          }}>
            {reviews.length === 0 ? (
              <p style={{ color: '#686a70' }}>Loading reviews...</p>
            ) : (
              reviews.map((r: any) => (
                <div key={r.id} style={{ background: '#151515', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '12px', height: 'fit-content' }}>
                  <div style={{ color: '#c8ff3d', marginBottom: '8px' }}>
                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                  </div>
                  <p style={{ color: '#d1d5db', fontStyle: 'italic', lineHeight: '1.5' }}>"{r.text}"</p>
                  <div style={{ color: '#fff', fontWeight: 800, marginTop: '16px' }}>— {r.name}</div>
                </div>
              ))
            )}
          </div>

          <ReviewForm />
        </section>

        {/* NETWORK */}
        <section className="section" id="collaborations" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="eyebrow" style={{ color: '#c8ff3d' }}>Network</p><h2 style={{ color: '#fff' }}>Work & Collaborations</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginTop: '40px' }}>
            {["ICE VAULT", "KOIMENE", "PRESTIGE MOTORSPORT", "KFLEX", "OneWayNick", "DbBouttabag", "EVEN RIGHTS", "UC MERCED", "TED", "FSP"].map(brand => (
              <span key={brand} style={{ padding: '12px 24px', background: '#151515', border: '1px solid #fff', borderRadius: '4px', fontWeight: 900, color: '#fff' }}>{brand}</span>
            ))}
          </div>
        </section>

        {/* BOOKING */}
        <section className="section booking" id="book" style={{ paddingBottom: '80px', boxShadow: 'none' }}>
          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', position: 'relative', zIndex: 10 }}>
            <div>
              <h2 style={{ color: '#151515', margin: '8px 0 16px 0' }}>Ready to launch.</h2>
              {totalStats.price > 0 ? (
                <div style={{ marginTop: '20px', padding: '24px', background: '#151515', borderRadius: '8px', color: '#fff' }}>
                  <p style={{ color: '#686a70', fontWeight: 800, fontSize: '0.7rem' }}>INVESTMENT SUMMARY:</p>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#c8ff3d' }}>${totalStats.price.toLocaleString()}</div>
                  {totalStats.savings > 0 && (
                    <div style={{ color: '#c8ff3d', fontWeight: 800, fontSize: '0.9rem', marginTop: '8px', textShadow: '1px 1px 2px #000' }}>
                      ✓ You are saving ${totalStats.savings.toLocaleString()} by bundling!
                    </div>
                  )}
                </div>
              ) : <p style={{ color: '#686a70' }}>Select a service above to see your customized quote.</p>}
            </div>
            
            <div id="booking-form-wrapper">
              <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input name="name" placeholder="Name" required style={{ border: '1px solid #ddd', background: '#fff', color: '#151515' }} />
                <input name="email" placeholder="Email" type="email" required style={{ border: '1px solid #ddd', background: '#fff', color: '#151515' }} />
                <textarea name="message" placeholder="Project details..." rows={4} style={{ border: '1px solid #ddd', background: '#fff', color: '#151515' }} />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="button primary" 
                  style={{ background: '#c8ff3d', color: '#000', fontWeight: 900, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  {isSubmitting ? "Generating Agreement..." : "Request Agreement"}
                </button>
              </form>
            </div>
          </div>
        </section>
            
      </main>

      <footer style={{ background: '#0a0a0a', padding: '60px 20px', color: '#fff', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', color: '#fff' }}>Let's Build Something Great.</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <a href="https://www.instagram.com/vlad_rutskyi/" target="_blank" rel="noopener noreferrer" style={{ color: '#c8ff3d', textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem', transition: 'opacity 0.2s' }}>
            Instagram
          </a>
          <a href="https://www.linkedin.com/in/vladyslavrutskyi/" target="_blank" rel="noopener noreferrer" style={{ color: '#c8ff3d', textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem', transition: 'opacity 0.2s' }}>
            LinkedIn
          </a>
          <a href="mailto:vladyslavrutskyi@gmail.com?subject=Media%20Production%20Inquiry" style={{ color: '#c8ff3d', textDecoration: 'none', fontWeight: 800, fontSize: '1.1rem', transition: 'opacity 0.2s' }}>
            Email Me
          </a>
        </div>
        
        <p style={{ margin: 0, color: '#686a70', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} Vladyslav Rutskyi. All rights reserved.
        </p>
      </footer>
    </>
  );
}