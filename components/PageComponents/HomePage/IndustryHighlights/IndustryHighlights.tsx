import React from "react";
import { motion } from "framer-motion";
import styles from "./IndustryHighlights.module.css";
import { highlights } from "@/utils/data/dummyData";

export default function IndustryHighlights() {
  console.log("Industry Highlights");

  return (
    <section className={styles.industryHighlightsSection}>
      <div className={styles.backgroundPattern}></div>
      <motion.h2
        className={styles.title}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        Unlocking Engineering Possibilities
      </motion.h2>

      <div className={styles.industryItems}>
        {highlights.map((highlight, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: highlight.delay || 0,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            viewport={{ once: true, amount: 0.3 }} // 👈 runs only once when visible
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
