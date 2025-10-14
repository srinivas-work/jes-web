"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import styles from "./ProcessDetails.module.css";

interface Process {
  title: string;
  description: string;
  cardClass: string;
  iconClass: string;
  descClass: string;
  height: string;
}

const processes: Process[] = [
  {
    title: "Demo Process 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    cardClass: "cardGray1",
    iconClass: "iconWrapperGray",
    descClass: "descriptionGray",
    height: "17.5rem",
  },
  {
    title: "Demo Process 2",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    cardClass: "cardGray2",
    iconClass: "iconWrapperGray",
    descClass: "descriptionGray",
    height: "20rem",
  },
  {
    title: "Demo Process 3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    cardClass: "cardRed",
    iconClass: "iconWrapperRed",
    descClass: "descriptionRed",
    height: "25rem",
  },
  {
    title: "Demo Process 4",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    cardClass: "cardGray3",
    iconClass: "iconWrapperGray",
    descClass: "descriptionGray",
    height: "15rem",
  },
];

export default function ProcessDetails() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className={styles.processDetailSection} ref={sectionRef}>
      <h2 className={styles.title}>Process Details</h2>
      <img
        className={styles.approachSectionBg}
        src="/img/bg_pattern.svg"
        alt="JES"
      />
      <div className={styles.processWrapper}>
        {processes.map((process, index) => (
          <motion.div
            key={index}
            initial={{ height: 0, opacity: 0 }}
            animate={
              isVisible
                ? { height: process.height, opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{
              duration: 0.8,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className={`${styles.processCard} ${styles[process.cardClass]}`}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isVisible ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
            >
              <div
                className={`${styles.iconWrapper} ${styles[process.iconClass]}`}
              >
                <Target
                  color={process.cardClass === "cardRed" ? "white" : "#374151"}
                  size={32}
                />
              </div>
              <h3 className={styles.cardTitle}>{process.title}</h3>
              <p
                className={`${styles.cardDescription} ${
                  styles[process.descClass]
                }`}
              >
                {process.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
