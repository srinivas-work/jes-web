import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import styles from "./ServiceSteps.module.css";

const cardsData = [
  {
    label: "Part I",
    number: "01",
    title: "LOD 100 - Conceptual Design",
    content: [
      "LOD 100 represents the most basic level of BIM modeling.",
      "It includes conceptual information, basic geometry, and overall project massing.",
      "Used in the early stages of design to communicate the project's basic form and concept.",
    ],
  },
  {
    label: "Part II",
    number: "02",
    title: "LOD 200 - Schematic Design",
    content: [
      "LOD 200 involves more developed elements than LOD 100.",
      "It includes approximate sizes, shapes, and locations of building elements.",
      "Used in the schematic design phase to visualize the project and assess its feasibility.",
    ],
  },
  {
    label: "Part III",
    number: "03",
    title: "LOD 300 - Detailed Design",
    content: [
      "LOD 300 provides a more detailed representation of building elements.",
      "It includes accurate geometry, sizes, shapes, quantities, and relationships between components.",
      "Used during the detailed design phase for coordination and construction documentation.",
    ],
  },
  {
    label: "Part IV",
    number: "04",
    title: "LOD 400 - Fabrication and Assembly",
    content: [
      "LOD 400 is highly detailed and suitable for fabrication and assembly purposes.",
      "It includes precise geometry, specific product information, and assembly details.",
      "Used for manufacturing, fabrication, and assembly of building components.",
    ],
  },
  {
    label: "Part V",
    number: "05",
    title: "LOD 500 - As-Built Model",
    content: [
      "LOD 500 represents the highest level of detail, capturing actual installed elements and accurate as-built conditions.",
      "It includes precise geometry, product data, and operational information.",
      "Used for facility management, maintenance, and renovation purposes post-construction.",
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
        <h2 className={styles.title}>Service Details</h2>

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
