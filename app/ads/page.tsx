"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Ads.module.css";
import { NEXT_PUBLIC_BUCKET_URL } from "@/utils/data/constants";

export default function AdClient() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle double-mount: hard reload on second visit
    if ((window as any).__adpage_loaded) {
      window.location.reload();
      return;
    } else {
      (window as any).__adpage_loaded = true;
    }

    async function loadHTML() {
      if (!containerRef.current) return;

      // Clear previous HTML
      containerRef.current.innerHTML = "";

      // Fetch HTML
      const res = await fetch(`${NEXT_PUBLIC_BUCKET_URL}/ad-page/index.html`, {
        cache: "no-cache",
      });
      const htmlString = await res.text();

      // Insert HTML
      containerRef.current.innerHTML = htmlString;

      // Execute scripts
      const scripts = containerRef.current.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");

        // Copy attributes
        for (const attr of oldScript.attributes) {
          newScript.setAttribute(attr.name, attr.value);
        }

        if (!oldScript.src) {
          newScript.textContent = oldScript.textContent;
        }

        oldScript.replaceWith(newScript);
      });

      // Allow app to boot, then fade loader
      setTimeout(() => setLoading(false), 300);
    }

    loadHTML();
  }, []);

  return (
    <div className={styles.wrapper}>
      {loading && (
        <div className={styles.loaderOverlay}>
          <div className={styles.loaderCard}>
            <div className={styles.spinner}></div>
            <p className={styles.text}>Thanks for waiting…</p>
          </div>
        </div>
      )}

      <div ref={containerRef} className={styles.content} />
    </div>
  );
}
