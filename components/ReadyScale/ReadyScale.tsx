import React from "react";
import { motion } from "framer-motion";
import styles from "./ReadyScale.module.css";
import { useRouter } from "next/navigation";

interface ReadyScaleProps {
  title?: string;
  desc?: string;
  buttonText?: string;
  imageUrl?: string;
}

const ReadyScale: React.FC<ReadyScaleProps> = ({
  title = "Ready to Scale Your Business?",
  desc = "Let us discuss how our solutions can transform your engineering workflow.",
  buttonText = "Get Started",
  imageUrl = "/img/eng_worker.png",
}) => {
  const router = useRouter();

  return (
    <motion.section
      className={styles.container}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <img
          className={styles.backgroundVector}
          alt="Vector"
          src="/img/jes_curve_white.svg"
        />
        <h2 className={styles.title}>{title}</h2>

        <p className={styles.subtitle}>{desc}</p>

        <motion.button
          className={styles.primaryButton}
          whileHover={{
            y: -4,
            boxShadow: "0 8px 24px rgba(169, 30, 45, 0.35)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/contact")}
        >
          {buttonText}
        </motion.button>
      </motion.div>

      <div className={styles.imageContainer}>
        <motion.img
          src={imageUrl}
          alt="Ready to Scale with JES"
          className={styles.image}
          initial={{ opacity: 0, y: 80, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: false, amount: 0.25 }}
        />
      </div>
    </motion.section>
  );
};

export default ReadyScale;
