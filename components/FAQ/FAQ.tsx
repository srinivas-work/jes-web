import React, { useEffect, useRef, useState } from "react";
import styles from "./FAQ.module.css";

export interface FAQData {
  question: string;
  answer: string;
}

interface FAQProps {
  data: FAQData;
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
  const [show, setShow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      el.style.maxHeight = show ? `${el.scrollHeight}px` : "0px";
    }
    console.log("hh");
  }, [show]);

  return (
    <div className={styles.faqItem}>
      <div
        className={`${styles.questionSection} ${show ? styles.active : ""}`}
        onClick={() => setShow((prev) => !prev)}
      >
        <div className={styles.questionAlign}>
          <h4 className={styles.question}>{data.question}</h4>
          <img
            src={"/icons/cross.svg"}
            alt="Toggle"
            className={`${styles.icon} ${show ? "" : styles.rotate}`}
          />
        </div>
        <div ref={contentRef} className={styles.answer}>
          <p>{data.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
