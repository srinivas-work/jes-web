import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./IndustryHighlights.module.css";

const highlights = [
  {
    title: "JES Inc.",
    description: "Trusted American company with decades of experience.",
    delay: 0,
  },
  {
    title: "Fast Delivery & Accuracy",
    description: "Known for lightning-fast project delivery and precision.",
    delay: 0.15,
  },
  {
    title: "ISO Certifications",
    description: "Offshore partner with ISO 27001 & ISO 9001 certifications.",
    delay: 0.3,
  },
  {
    title: "Efficient Processes",
    description:
      "Rigorous training and streamlined processes for unmatched speed and accuracy.",
    delay: 0.45,
  },
  {
    title: "High Output",
    description: "Completing 1,000–2,000 projects per month.",
    delay: 0.6,
  },
  {
    title: "Trusted Network",
    description:
      "Serving 38 clients, including manufacturer reps, distributors, and contractors.",
    delay: 0.45,
  },
];

export default function IndustryHighlights() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => {
              if (!prev.includes(index)) return [...prev, index];
              return prev;
            });
          } else {
            setVisibleIndexes((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section className={styles.industryHighlightsSection}>
      <div className={styles.backgroundPattern}></div>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Unlocking Engineering Possibilities
      </motion.h2>

      <div className={styles.industryItems}>
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el; // ✅ TS-safe
            }}
            data-index={index}
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            animate={
              visibleIndexes.includes(index)
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 50 }
            }
            transition={{
              duration: 0.6,
              delay: highlight.delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className={styles.numberLarge}>0{index + 1}</div>
            <h3 className={styles.cardTitle}>{highlight.title}</h3>
            <p className={styles.cardDescription}>{highlight.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
