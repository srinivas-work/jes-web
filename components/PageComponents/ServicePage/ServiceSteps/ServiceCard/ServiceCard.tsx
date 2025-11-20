import { toRoman } from "@/utils/helperFunctions";
import styles from "./ServiceCard.module.css";
import { GenericType } from "@/utils/types";
import { motion } from "framer-motion";

const ServiceCard: React.FC<{ cardItem: GenericType; cardIndex: number }> = ({
  cardItem,
  cardIndex,
}) => {
  return (
    <motion.div className={styles.card}>
      {/* <div className={styles.cardLabel}>Part {toRoman(cardIndex + 1)}</div> */}
      <div className={styles.cardNumber}>0{cardIndex + 1}</div>
      <div className={styles.cardTitle}>{cardItem.title}</div>
      <ul className={styles.cardContent}>
        {Array.isArray(cardItem.desc) &&
          cardItem.desc.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </motion.div>
  );
};

export default ServiceCard;
