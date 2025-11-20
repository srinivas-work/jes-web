"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Preloader.module.css";

const loadingStates = [
  { text: "Buying a condo" },
  { text: "Travelling in a flight" },
  { text: "Meeting Tyler Durden" },
  { text: "He makes soap" },
  { text: "We goto a bar" },
];

export default function Preloader({ duration = 1500 }: { duration?: number }) {
  const [currentState, setCurrentState] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (currentState < loadingStates.length - 1) {
      const t = setTimeout(() => setCurrentState((p) => p + 1), duration);
      return () => clearTimeout(t);
    }

    const endTimeout = setTimeout(() => {
      setFinished(true);
    }, 600);

    return () => clearTimeout(endTimeout);
  }, [currentState, duration]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -140,
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          <div className={styles.loaderWrapper}>
            <LoaderCore value={currentState} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoaderCore({ value }: { value: number }) {
  return (
    <div className={styles.listWrapper}>
      {loadingStates.map((state, i) => {
        const distance = Math.abs(i - value);
        const opacity = Math.max(1 - distance * 0.2, 0);

        return (
          <motion.div
            key={i}
            className={styles.item}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.iconWrapper}>
              {i <= value ? (
                <FilledCheck active={i === value} />
              ) : (
                <CheckIcon />
              )}
            </div>

            <span
              className={`${styles.text} ${value === i ? styles.active : ""}`}
            >
              {state.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className={styles.iconOutline}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.7}
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0Z" />
    </svg>
  );
}

function FilledCheck({ active }: { active: boolean }) {
  return (
    <svg
      className={`${styles.iconFilled} ${active ? styles.activeIcon : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" className={styles.filledCircle} />
      <path className={styles.filledTick} d="M9 12.75 11.25 15 15 9.75" />
    </svg>
  );
}
