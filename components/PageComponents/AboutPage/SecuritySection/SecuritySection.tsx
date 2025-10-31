import React from "react";
import styles from "./SecuritySection.module.css";
import { securityList } from "@/utils/data/dummyData";
import AnimatedInfoCard from "@/components/UI/AnimatedInfoCard/AnimatedInfoCard";

const SecuritySection = () => {
  return (
    <section className={styles.securitySection}>
      <h2>Security</h2>
      {securityList.map((s, i) => (
        <AnimatedInfoCard {...s} />
      ))}
    </section>
  );
};

export default SecuritySection;
