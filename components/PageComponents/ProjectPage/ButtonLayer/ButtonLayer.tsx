import { useState } from "react";
import styles from "./ButtonLayer.module.css";

interface ButtonLayerProps {
  options: string[];
}

export default function ButtonLayer({ options }: ButtonLayerProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.buttonLayer}>
      {options.map((option, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            selected === index ? styles.active : ""
          }`}
          onClick={() => setSelected(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
