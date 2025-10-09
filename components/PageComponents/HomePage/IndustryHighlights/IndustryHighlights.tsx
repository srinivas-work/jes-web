import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./IndustryHighlights.module.css";

const highlights = [
  {
    number: "01",
    title: "Industry Highlight",
    description: "Lorem Ipsum ...",
    delay: 0,
  },
  {
    number: "02",
    title: "Industry Highlight",
    description: "Lorem Ipsum ...",
    delay: 0.15,
  },
  {
    number: "03",
    title: "Industry Highlight",
    description: "Lorem Ipsum ...",
    delay: 0.3,
  },
  {
    number: "04",
    title: "Industry Highlight",
    description: "Lorem Ipsum ...",
    delay: 0.45,
  },
  {
    number: "05",
    title: "Industry Highlight",
    description: "Lorem Ipsum ...",
    delay: 0.6,
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
        Industry Highlights
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
            <div className={styles.numberLarge}>{highlight.number}</div>
            <h3 className={styles.cardTitle}>{highlight.title}</h3>
            <p className={styles.cardDescription}>{highlight.description}</p>
            <a className={styles.link}>Discover more...</a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
