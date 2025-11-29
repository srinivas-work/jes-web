import { TestimonialCardProps } from "@/utils/types";
import { Star } from "lucide-react";
import React from "react";
import styles from "./TestimonialCard.module.css";

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  rating = 5,
  desc,
  name,
  title,
  image,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.stars}>
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className={styles.star} />
        ))}
      </div>

      <p className={styles.desc}>"{desc}"</p>

      <div className={styles.author}>
        <div>
          <h4 className={styles.name}>{name}</h4>
          <p className={styles.title}>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
