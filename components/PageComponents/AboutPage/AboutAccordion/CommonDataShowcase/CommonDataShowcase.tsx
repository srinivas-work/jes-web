import React, { HTMLAttributes, useRef, useState } from "react";
import styles from "./CommonDataShowcase.module.css";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";

// ---------------- DATA ---------------- //

const whyChoose = {
  title: "Why choose JES?",
  desc: "Establish a groundbreaking paradigm in the MEP industry with Jersey Engineering, empowering you to achieve your best. Our services offer a more effective way to run your business, allowing you the time to concentrate on what only you can do much better and at ease serving your customers, managing your employees, and nurturing the overall well-being of your enterprise.",
  subData: [
    {
      img: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/partner_e4c52b7cdc.svg",
      title: "Your partner",
      desc: "We possess the experience, expertise, and a diverse range of offerings to stand as your dependable, long-term engineering partner. Your search for reliability ends here, as we are committed to serving you with dedication and quality excellence.",
    },
    {
      img: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/strategy_1910a02192.svg",
      title: "Our strategy",
      desc: "We possess the experience, expertise, and a diverse range of offerings to stand as your dependable, long-term engineering partner. Your search for reliability ends here, as we are committed to serving you with dedication and quality excellence.",
    },
    {
      img: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/unit_a5187e266a.svg",
      title: "Customer Centricity",
      desc: "Customer needs are paramount, and we build dedicated teams to ensure that they are met on every project.",
    },
  ],
};

const ourValues = {
  title: "Our Values",
  desc: "Committed to excellence, our global engineering firm shoulders the responsibility of handling all your time-consuming back-office work, ensuring both quality and security. This not only allows you to grow your business but also contributes to shaping sustainable environments, embodying innovation, and exceeding expectations in every building endeavor, all the while prioritizing the highest standards of quality and security.",
  subData: [
    {
      img: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/centricity_d30dfb5c28.svg",
      title: "Committed to Excellence",
      desc: "Our commitment is unwavering, as we consistently deliver high-quality MEP (Mechanical, Electrical, Plumbing) engineering solutions with integrity, innovation, and an unyielding focus on enhancing quality for lasting success.",
    },
    {
      img: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/confidentiality_64687f9686.svg",
      title: "Confidentiality",
      desc: "Safeguarding your trust and project details with a firm commitment, we ensure the utmost privacy, security, and cybersecurity.",
    },
    {
      img: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/improvement_13c92f88b3.svg",
      title: "Continuous Improvement",
      desc: "Relentlessly refining our processes and expertise, we work towards continuous growth to deliver engineering excellence.",
    },
  ],
};

// ---------------- COMPONENT ---------------- //

const CommonDataShowcase: React.FC<
  HTMLAttributes<HTMLDivElement> & { pageType: "whyChoose" | "ourValues" }
> = ({ pageType, ...props }) => {
  const isPhoneScreen = useIsPhoneScreen();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedData = pageType === "whyChoose" ? whyChoose : ourValues;

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={`${styles.aboutService} ${props.className}`} {...props}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{selectedData.title}</h2>
          <p className={styles.description}>{selectedData.desc}</p>
        </div>

        <div className={styles.cards}>
          {selectedData.subData.map((item, i) => {
            const isOpen = openIndex === i;

            // FIXED TYPESCRIPT REF CALLBACK
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
                {/* HEADER */}
                <div
                  className={styles.accordionHeader}
                  onClick={() => isPhoneScreen && toggleAccordion(i)}
                >
                  <div className={styles.icon}>
                    <img
                      src={item.img}
                      alt={item.title}
                      style={
                        pageType === "ourValues"
                          ? { filter: "brightness(0) invert(1)" }
                          : {}
                      }
                    />
                  </div>

                  <h3>{item.title}</h3>

                  {isPhoneScreen && (
                    <span className={styles.accordionArrow}>
                      {isOpen ? "−" : "+"}
                    </span>
                  )}
                </div>

                {/* CONTENT */}
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
                  <p>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommonDataShowcase;
