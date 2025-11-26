"use client";

import { useEffect } from "react";

const CustomScrollbar = () => {
  useEffect(() => {
    // Create track + thumb
    const track = document.createElement("div");
    track.className = "custom-scrollbar-track";

    const thumb = document.createElement("div");
    thumb.className = "custom-scrollbar-thumb";

    track.appendChild(thumb);
    document.body.appendChild(track);

    const updateThumb = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop;
      const scrollHeight = doc.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        thumb.style.opacity = "0";
        return;
      }

      const progress = scrollTop / scrollHeight;

      const thumbHeight =
        (window.innerHeight / doc.scrollHeight) * window.innerHeight;

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.top = `${progress * (window.innerHeight - thumbHeight)}px`;

      // Fade in on scroll
      thumb.style.opacity = "1";

      // Fade out after 800ms
      clearTimeout((window as any).scrollbarHideTimer);
      (window as any).scrollbarHideTimer = setTimeout(() => {
        thumb.style.opacity = "0";
      }, 800);
    };

    window.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);

    updateThumb();

    return () => {
      window.removeEventListener("scroll", updateThumb);
      window.removeEventListener("resize", updateThumb);
      track.remove();
    };
  }, []);

  return null; // This component injects DOM elements only
};

export default CustomScrollbar;
