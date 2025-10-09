import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import styles from "./ServiceSteps.module.css";

const cardsData = [
  {
    label: "Part II",
    number: "01",
    title: "Specialized Quantity Surveying",
    content: [
      "LOD 100 represents the most basic level of BIM modeling.",
      "It includes conceptual information, basic geometry, and overall project massing.",
      "Used in the early stages of design to communicate the project's basic form and concept.",
    ],
  },
  {
    label: "Part II",
    number: "02",
    title: "Software-Aided QTO",
    content: [
      "LOD 100 represents the most basic level of BIM modeling.",
      "It includes conceptual information, basic geometry, and overall project massing.",
      "Used in the early stages of design to communicate the project's basic form and concept.",
    ],
  },
  {
    label: "Part II",
    number: "03",
    title: "Customized Reports & Documentation",
    content: [
      "LOD 100 represents the most basic level of BIM modeling.",
      "It includes conceptual information, basic geometry, and overall project massing.",
      "Used in the early stages of design to communicate the project's basic form and concept.",
    ],
  },
  {
    label: "Part II",
    number: "04",
    title: "Customized Documentation",
    content: [
      "LOD 100 represents the most basic level of BIM modeling.",
      "It includes conceptual information, basic geometry, and overall project massing.",
      "Used in the early stages of design to communicate the project's basic form and concept.",
    ],
  },
  {
    label: "Part II",
    number: "05",
    title: "Customized Documentation",
    content: [
      "LOD 100 represents the most basic level of BIM modeling.",
      "It includes conceptual information, basic geometry, and overall project massing.",
      "Used in the early stages of design to communicate the project's basic form and concept.",
    ],
  },
];

export default function ServiceSteps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [maxX, setMaxX] = useState(0);

  useEffect(() => {
    if (containerRef.current && cardsRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const cardsWidth = cardsRef.current.scrollWidth;
      const distance = cardsWidth - containerWidth;
      setMaxX(distance); // max scroll distance in px
    }
  }, [cardsData.length]);

  // map vertical scroll to horizontal translation (left → right)
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX * 1.2]);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <div className={styles.stickyContainer}>
        <h2 className={styles.title}>Service Steps</h2>

        <div className={styles.scrollContainer}>
          <motion.div
            className={styles.cardsContainer}
            ref={cardsRef}
            style={{ x }}
          >
            {cardsData.map((card, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.cardLabel}>{card.label}</div>
                <div className={styles.cardNumber}>{card.number}</div>
                <div className={styles.cardTitle}>{card.title}</div>
                <ul className={styles.cardContent}>
                  {card.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
