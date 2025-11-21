"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BackToTopButton.module.css";
import { usePathname } from "next/navigation";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 120);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();
    setIsMounted(true);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToTop();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      scrollToTop();
    }
  };

  // Don't render until after mount to avoid hydration issues
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          className={styles.button}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            pointerEvents: "auto",
            bottom: pathname.includes("/services") ? "8rem" : "2rem",
          }}
        >
          <img
            src="/icons/arrow-icon.svg"
            alt=""
            className={styles.icon}
            aria-hidden
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
