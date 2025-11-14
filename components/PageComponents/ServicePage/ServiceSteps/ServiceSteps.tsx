import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { GenericType } from "@/utils/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard/ServiceCard";
import styles from "./ServiceSteps.module.css";
import ServiceCarousel from "@/components/UI/ServiceCarousel/ServiceCarousel";

const ServiceSteps: React.FC<{ subServiceItem?: GenericType[] }> = ({
  subServiceItem,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isPhoneScreen = useIsPhoneScreen();
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
    <div
      className={styles.wrapper}
      ref={containerRef}
      style={isPhoneScreen ? { height: "unset" } : {}}
    >
      <div className={!isPhoneScreen ? styles.stickyContainer : ""}>
        <h2
          className={styles.title}
          style={isPhoneScreen ? { marginBottom: "-1rem" } : {}}
        >
          Service Details
        </h2>

        <ServiceCarousel items={subServiceItem!} autoplay loop />
        {!isPhoneScreen && (
          <div className={styles.scrollContainer}>
            <motion.div
              className={styles.cardsContainer}
              ref={cardsRef}
              style={isPhoneScreen ? { x } : { overflowX: "scroll" }}
            >
              {subServiceItem?.map((item, index) => (
                <ServiceCard cardItem={item} cardIndex={index} key={index} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceSteps;
