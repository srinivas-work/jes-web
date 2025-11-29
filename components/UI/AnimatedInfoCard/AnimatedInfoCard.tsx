"use client";

import { SecurityItemType } from "@/utils/types";
import { motion, Variants } from "framer-motion";
import React from "react";
import styles from "./AnimatedInfoCard.module.css";

const AnimatedInfoCard: React.FC<SecurityItemType> = ({
  imgLink,
  title,
  desc,
}) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      className={styles.card}
      variants={cardVariants}
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
    >
      {/* Accent Line */}
      <motion.div
        className={styles.accentLine}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      <div className={styles.iconWrapper}>
        <img
          src={imgLink}
          alt={title}
          width={60}
          height={60}
          className={styles.icon}
        />
      </div>

      <motion.h3
        className={styles.title}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h3>

      <motion.p
        className={styles.desc}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {desc}
      </motion.p>
    </motion.div>
  );
};

export default AnimatedInfoCard;
