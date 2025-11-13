import AnimatedInfoCard from "@/components/UI/AnimatedInfoCard/AnimatedInfoCard";
import { securityList } from "@/utils/data/dummyData";
import styles from "./SecuritySection.module.css";

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
