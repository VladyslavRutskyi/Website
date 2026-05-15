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

  // FIX: Handle GitHub Pages subdirectory pathing
  const videoSrc = src.startsWith('/') && !src.startsWith('/Website') 
    ? `/Website${src}` 
    : src;

  useEffect(() => {
    // Force Autoplay: Browsers often need a manual trigger when the source is dynamic
    if (isIntersecting && videoRef.current) {
      const playVideo = async () => {
        try {
          // Resetting the load ensures the new source is recognized
          videoRef.current?.load();
          await videoRef.current?.play();
        } catch (err) {
          console.warn("Autoplay blocked. Ensure the video is muted.", err);
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
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        // "pointer-events-none" prevents the user from accidentally 
        // triggering browser video menus/controls when clicking
        className="object-cover w-full h-full pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        // Explicitly ensuring no controls are shown
        controls={false}
        preload={priority ? "auto" : "none"}
      >
        {(isIntersecting || priority) && <source src={videoSrc} type="video/mp4" />}
      </video>
    </div>
  );
}