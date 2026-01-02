"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import styles from "./Preloader.module.css";

const loadingStates = [
  { text: "Calculating project requirements" },
  { text: "Processing MEP system data" },
  { text: "Generating BIM insights" },
  { text: "Reviewing engineering specifications" },
  { text: "Preparing your project dashboard" },
];

export default function Preloader({ duration = 900 }: { duration?: number }) {
  const pathname = usePathname();
  const [currentState, setCurrentState] = useState(0);
  const [finished, setFinished] = useState(false);

  // Skip preloader on specific routes
  if (
    pathname.includes("/lp") ||
    pathname.includes("/thanks") ||
    pathname.includes("/terms")
  ) {
    return null;
  }

  useEffect(() => {
    if (currentState < loadingStates.length - 1) {
      const timer = setTimeout(
        () => setCurrentState((prev) => prev + 1),
        duration
      );
      return () => clearTimeout(timer);
    }

    const endTimer = setTimeout(() => {
      setFinished(true);
    }, 500);

    return () => clearTimeout(endTimer);
  }, [currentState, duration]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: "easeInOut" },
          }}
        >
          <div className={styles.loaderWrapper}>
            <div className={styles.listContainer}>
              {/* ✅ ONLY THIS MOVES VERTICALLY */}
              <motion.div
                className={styles.listWrapper}
                animate={{
                  y: -(currentState * 28),
                }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 22,
                  mass: 0.8,
                }}
              >
                {loadingStates.map((state, i) => {
                  const distance = Math.abs(i - currentState);
                  const opacity = Math.max(1 - distance * 0.15, 0.3);

                  return (
                    <motion.div
                      key={i}
                      className={styles.item}
                      animate={{
                        opacity,
                        scale: i === currentState ? 1.03 : 1,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                    >
                      <div className={styles.iconWrapper}>
                        {i <= currentState ? (
                          <FilledCheck active={i === currentState} />
                        ) : (
                          <CheckIcon />
                        )}
                      </div>

                      <span
                        className={`${styles.text} ${
                          currentState === i ? styles.active : ""
                        }`}
                      >
                        {state.text}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
