"use client";

import { useRef, useEffect, useState } from "react";

interface OptimizedVideoProps {
  src: string;
  className?: string;
  priority?: boolean;
}

export default function OptimizedVideo({ src, className = "", priority = false }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(priority);

  // FIX 1: Ensure the path includes /Website for GitHub Pages
  // This prevents 404s on the video files
  const videoSrc = src.startsWith('/') && !src.startsWith('/Website') 
    ? `/Website${src}` 
    : src;

  useEffect(() => {
    // FIX 2: Manual play trigger
    // Browsers often ignore the 'autoPlay' attribute during React hydration.
    // This effect forces the video to play once it is ready.
    if (isIntersecting && videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (err) {
          console.warn("Autoplay blocked or failed:", err);
        }
      };
      playVideo();
    }
  }, [isIntersecting]);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); 
        }
      },
      { rootMargin: "200px" } 
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <video
      ref={videoRef}
      className={`object-cover w-full h-full ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload={priority ? "auto" : "none"}
    >
      {(isIntersecting || priority) && <source src={videoSrc} type="video/mp4" />}
    </video>
  );
}