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

  // Use the environment variable or hardcoded path for GitHub Pages
  const videoSrc = src.startsWith('/') && !src.startsWith('/Website') 
    ? `/Website${src}` 
    : src;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isIntersecting || priority) {
      video.muted = true; // Double-ensure silence for autoplay
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay is blocked, try again after a user interaction
          console.log("Autoplay waiting for interaction");
        });
      }
    }
  }, [isIntersecting, priority]);

  useEffect(() => {
    if (priority) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" } // Load earlier so it's ready before scroll
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <video
      ref={videoRef}
      className={`object-cover w-full h-full pointer-events-none ${className}`}
      autoPlay
      muted
      loop
      playsInline
      controls={false} // This hides the play button
      preload={priority ? "auto" : "metadata"}
      style={{ background: 'transparent' }} 
    >
      {(isIntersecting || priority) && <source src={videoSrc} type="video/mp4" />}
    </video>
  );
}