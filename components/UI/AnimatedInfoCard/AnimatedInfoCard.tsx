import { SecurityItemType } from "@/utils/types";
import { motion } from "framer-motion";
import React from "react";
import styles from "./AnimatedInfoCard.module.css";

const AnimatedInfoCard: React.FC<SecurityItemType> = ({
  imgLink,
  title,
  desc,
}) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, x: -50, scaleX: 0.5 }}
      whileInView={{ opacity: 1, x: 0, scaleX: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ amount: 0.3 }}
    >
      <div className={styles.iconWrapper}>
        <img src={imgLink} className={styles.icon} />
      </div>

      <motion.div
        className={styles.textWrapper}
        initial={{ x: -60 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        viewport={{ amount: 0.3 }}
      >
        <h4>{title}</h4>
        <p>{desc}</p>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedInfoCard;
