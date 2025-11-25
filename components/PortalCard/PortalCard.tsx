"use client";

import { PortalCardType } from "@/utils/types";
import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./PortalCard.module.css";

const PortalCard: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    portalCardItem: PortalCardType;
    index: number;
    scrollProgress: any;
    visibleAt: number;
    invisibleAt?: number;
  }
> = ({
  portalCardItem,
  index,
  scrollProgress,
  visibleAt,
  invisibleAt,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Animation only on main container
  const scaleX = useTransform(
    scrollProgress,
    [visibleAt, visibleAt + 0.1],
    [0, 1]
  );

  const opacity = useTransform(
    scrollProgress,
    invisibleAt
      ? [visibleAt, visibleAt + 0.1, invisibleAt, invisibleAt + 0.1]
      : [visibleAt, visibleAt + 0.1],
    invisibleAt ? [0, 1, 1, 0] : [0, 1]
  );

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card} ${props.className}`}
      style={{
        scaleX,
        opacity,
        //translateY: index === 1 ? "-45%" : "initial",
      }}
    >
      {/* Image Container - No animation */}
      <div className={styles.imageContainer}>
        <img
          src={portalCardItem.imgLink}
          alt={portalCardItem.title}
          className={styles.image}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1556655848-f3a7049761a6?w=500&h=300&fit=crop";
          }}
        />
        <div className={styles.imageOverlay} />
      </div>

      {/* Text Content - No animation */}
      <div className={styles.textContent}>
        <h3 className={styles.title}>
          {index + 1}.{portalCardItem.title}
        </h3>
        <p className={styles.description}>{portalCardItem.desc}</p>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorativeLine} />
    </motion.div>
  );
};

export default PortalCard;
