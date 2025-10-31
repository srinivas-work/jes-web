import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import styles from "./ServiceSteps.module.css";
import { toRoman } from "@/utils/helperFunctions";
import { GenericType } from "@/utils/types";

const ServiceSteps: React.FC<{ subServiceItem?: GenericType[] }> = ({
  subServiceItem,
}) => {
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
  }, [subServiceItem?.length]);

  // map vertical scroll to horizontal translation (left → right)
  const x = useTransform(scrollYProgress, [0, 1], [50, -maxX * 1.2]);

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
            {/* {cardsData.map((card, index) => (
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
            ))} */}

            {subServiceItem?.map((item, index) => (
              <div className={styles.card} key={index}>
                <div className={styles.cardLabel}>
                  Part {toRoman(index + 1)}
                </div>
                <div className={styles.cardNumber}>0{index + 1}</div>
                <div className={styles.cardTitle}>{item.title}</div>
                <ul className={styles.cardContent}>
                  {Array.isArray(item.desc) &&
                    item.desc.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSteps;
