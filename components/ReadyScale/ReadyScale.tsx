import { motion } from "framer-motion";
import styles from "./ReadyScale.module.css";
import { useRouter } from "next/navigation";

const ReadyScale: React.FC<{ title?: string; desc?: string }> = ({
  title = "Ready to Scale Your Business?",
  desc = "Let us discuss how our solutions can transform your engineering workflow.",
}) => {
  const router = useRouter();

  return (
    <motion.section
      className={styles.cta}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <h2>{title}</h2>
        <p>{desc}</p>
        <motion.button
          className={styles.primaryButton}
          whileHover={{
            y: -4,
            boxShadow: "0 8px 24px rgba(169, 30, 45, 0.35)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push("/contact")}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.section>
  );
};

export default ReadyScale;
