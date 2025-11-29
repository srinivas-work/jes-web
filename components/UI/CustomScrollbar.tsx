"use client";

import { useEffect } from "react";

const CustomScrollbar = () => {
  useEffect(() => {
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

      // If page doesn't scroll
      if (scrollHeight <= 0) {
        thumb.style.opacity = "1"; // always visible
        thumb.style.height = "100%";
        thumb.style.top = "0";
        return;
      }

      const progress = scrollTop / scrollHeight;

      const thumbHeight =
        (window.innerHeight / doc.scrollHeight) * window.innerHeight;

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.top = `${progress * (window.innerHeight - thumbHeight)}px`;

      // Always visible
      thumb.style.opacity = "1";
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

  return null;
};

export default CustomScrollbar;
