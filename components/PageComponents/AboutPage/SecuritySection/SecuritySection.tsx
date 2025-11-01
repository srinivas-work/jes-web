import React from "react";
import styles from "./SecuritySection.module.css";
import { securityList } from "@/utils/data/dummyData";
import AnimatedInfoCard from "@/components/UI/AnimatedInfoCard/AnimatedInfoCard";
import { motion } from "framer-motion";

const SecuritySection = () => {
  return (
    <section className={styles.securitySection}>
      <h2>Security</h2>
      <div className={styles.gridContainer}>
        {securityList.map((s, i) => (
          <AnimatedInfoCard {...s} />
        ))}
      </div>
    </section>
  );
};

export default SecuritySection;
