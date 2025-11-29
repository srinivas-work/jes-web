import React, { HTMLAttributes, useRef, useState } from "react";
import styles from "./MissionVision.module.css";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";

const MissionVision: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  const isPhoneScreen = useIsPhoneScreen();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const cards = [
    {
      title: "Our Vision",
      desc: "Our Vision is to become the most valued and trusted partner of our Clients and Partners by; “Freeing you to be your best!”",
    },
    {
      title: "Our Mission",
      desc: "Our mission is to catalyze the expansion of global companies by providing access to exceptional back-office engineering and business support services. We specialize in delivering cost-effective solutions, streamlining operational processes, and fostering seamless collaboration. Through outsourcing, we empower organizations to concentrate on core competencies, achieve sustainable growth, and navigate the complexities of the modern business landscape with efficiency and innovation.",
    },
  ];

  return (
    <div
      className={`${styles.missionVisionSection} ${props.className ?? ""}`}
      {...props}
    >
      <img className={styles.missionVisionImg} src={"/img/missionVision.png"} />

      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Empowering progress through innovation
          </h2>
          <p>
            Establish a groundbreaking paradigm in the MEP industry with Jersey
            Engineering, empowering you to achieve your best. Our services offer
            a more effective way to run your business, allowing you the time to
            concentrate on what only you can do much better and at ease serving
            your customers, managing your employees, and nurturing the overall
            well-being of your enterprise.
          </p>
        </div>

        <div className={styles.cards}>
          {cards.map((card, i) => {
            const isOpen = openIndex === i;

            const setRef = (el: HTMLDivElement | null): void => {
              contentRefs.current[i] = el;
            };

            return (
              <div
                key={i}
                className={`${styles.card} ${
                  isPhoneScreen ? styles.accordionCard : ""
                }`}
              >
                {/* CLICKABLE HEADER */}
                <h3
                  className={styles.accordionHeader}
                  onClick={() => isPhoneScreen && toggleAccordion(i)}
                >
                  {card.title}

                  {isPhoneScreen && (
                    <span className={styles.accordionArrow}>
                      {isOpen ? "−" : "+"}
                    </span>
                  )}
                </h3>

                {/* CONTENT WITH SMOOTH HEIGHT */}
                <div
                  ref={setRef}
                  className={styles.accordionContent}
                  style={
                    isPhoneScreen
                      ? {
                          maxHeight: isOpen
                            ? (contentRefs.current[i]?.scrollHeight ?? 0) + "px"
                            : "0px",
                          opacity: isOpen ? 1 : 0,
                        }
                      : {}
                  }
                >
                  <p>{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
