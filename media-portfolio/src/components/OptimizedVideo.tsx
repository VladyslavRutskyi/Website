"use client";

import { useRef, useEffect, useState } from "react";

interface OptimizedVideoProps {
  src: string;
  className?: string;
  priority?: boolean;
}

export default function OptimizedVideo({ src, className = "", priority = false }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // If priority is true, it starts intersecting instantly
  const [isIntersecting, setIsIntersecting] = useState(priority);

  useEffect(() => {
    if (priority) return; // Skip the observer completely if it's a priority video

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
      {(isIntersecting || priority) && <source src={src} type="video/mp4" />}
    </video>
  );
}