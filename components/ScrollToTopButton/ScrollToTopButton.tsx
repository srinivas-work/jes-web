"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import useIsPhoneScreen from "../../utils/hooks/useIsPhoneScreen";
import styles from "./ScrollToTopButton.module.css";

const ScrollToTopButton = () => {
  const controls = useAnimation();
  const scrollButtonRef = useRef<HTMLButtonElement>(null);
  const isPhoneScreen = useIsPhoneScreen();
  const manuallyHidden = useRef(false);

  // Show/hide button based on scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (!scrollButtonRef.current || manuallyHidden.current) return;

      if (window.scrollY > 50) {
        controls.start({ opacity: 1, y: 0, pointerEvents: "auto" });
      } else {
        controls.start({ opacity: 0, y: 70, pointerEvents: "none" });
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [controls]);

  // Smooth scroll using native browser API
  const scrollToTop = () => {
    manuallyHidden.current = true;

    // hide button immediately
    controls.start({ opacity: 0, y: 70, pointerEvents: "none" });

    if (isPhoneScreen) {
      window.scrollTo({ top: 0, behavior: "auto" });

      setTimeout(() => {
        manuallyHidden.current = false;
      }, 300);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        manuallyHidden.current = false;
      }, 100);
    }
  };

  return (
    <motion.button
      ref={scrollButtonRef}
      className={styles["scroll-to-top-button"]}
      aria-label="Scroll to top"
      onClick={scrollToTop}
      animate={controls}
      initial={{ opacity: 0, y: 0, pointerEvents: "none" }}
      transition={{ duration: 0.35 }}
    >
      <img src="/icons/arrow-icon.svg" alt="Back to top" />
    </motion.button>
  );
};

export default ScrollToTopButton;
