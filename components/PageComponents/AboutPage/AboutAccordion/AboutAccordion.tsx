import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./AboutAccordion.module.css";

const aboutUsList = [
  {
    heading: "Who are we?",
    subheading: "",
    description:
      "Delivering comprehensive MEP building services to propel the growth of your company with a steadfast commitment to quality, ensuring higher efficiency, sustainability, and seamless integration with your projects.",
  },
  {
    heading: "Why choose us?",
    subheading: "",
    description:
      "Establish a groundbreaking paradigm in the MEP industry with Jersey Engineering, empowering you to achieve your best. Our services offer a more effective way to run your business, allowing you the time to concentrate on what only you can do much better and at ease serving your customers, managing your employees, and nurturing the overall well-being of your enterprise.",
  },
  {
    heading: "Our Mission",
    subheading: "",
    description:
      "Our mission is to catalyze the expansion of global companies by providing access to exceptional back-office engineering and business support services. We specialize in delivering cost-effective solutions, streamlining operational processes, and fostering seamless collaboration. Through outsourcing, we empower organizations to concentrate on core competencies, achieve sustainable growth, and navigate the complexities of the modern business landscape with efficiency and innovation.",
  },
  {
    heading: "Our Vision",
    subheading: "",
    description:
      "Our Vision is to become the most valued and trusted partner of our Clients and Partners by; “Freeing you to be your best!",
  },
  {
    heading: "Our Values",
    subheading: "",
    description:
      "Our Value is to become the most valued and trusted partner of our Clients and Partners by; “Freeing you to be your best!",
  },
];

const AboutAccordion: React.FC<{ className?: string }> = ({ className }) => {
  const [activeSectionId, setActiveSectionId] = useState<null | number>(null);
  const isPhoneScreen = useIsPhoneScreen();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 👇 Track scroll progress relative to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 👇 Update active section automatically based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const totalSections = aboutUsList.length;
    const sectionIndex = Math.floor(latest * totalSections);

    // prevent unnecessary re-renders & preserve click functionality
    setActiveSectionId((prev) => {
      if (prev !== sectionIndex) {
        return sectionIndex;
      }
      return prev;
    });
  });

  const getDescription = (
    title: string,
    description: string,
    sectionId: number
  ) => {
    if (activeSectionId !== null && sectionId === activeSectionId) {
      return (
        <div
          className={styles["about-services-section-description-container"]}
          style={getDescriptionStyle(sectionId)}
        >
          <img
            className={
              styles["about-services-section-description-container-bg"]
            }
            src="/img/bg_pattern.svg"
            alt="JES"
          />
          <div className={styles["about-services-section-circle-container"]}>
            {Array.from({ length: aboutUsList.length }).map((_, index) => (
              <div
                key={index}
                className={`${styles["about-services-section-circle"]} ${
                  index === activeSectionId || index < activeSectionId
                    ? ""
                    : styles.outline
                }`}
              />
            ))}
          </div>
          <div className={styles["about-services-section-description"]}>
            {sectionId === 0 && (
              <div className={styles["founder-images-container"]}>
                {Array.from({ length: 2 }).map((_, index) => {
                  const name = index === 0 ? "John Doe" : "Foe Snow";
                  return (
                    <div
                      className={styles["founder-image-item-container"]}
                      key={index}
                    >
                      <div className={styles["founder-image-holder"]}>
                        <Image
                          src={`/img/founder-${index + 1}.jpg`}
                          alt={name}
                          fill
                        />
                      </div>
                      <p>{name}</p>
                    </div>
                  );
                })}
              </div>
            )}
            <p style={{ color: "var(--primary-dark)" }}>{description}</p>
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const getDescriptionStyle = (sectionId: number) => {
    if (activeSectionId !== null && sectionId === activeSectionId) {
      return { padding: isPhoneScreen ? "12rem" : "5rem" };
    } else {
      return {};
    }
  };

  const getSectionStyle = (sectionId: number, zIndex: number) => {
    if (activeSectionId !== null && sectionId === activeSectionId) {
      return {
        color: "white",
        backgroundColor: "var(--primary-red)",
        flex: 1,
        zIndex,
      };
    } else if (activeSectionId === null) {
      return {
        width: "100%",
        zIndex,
        flex: 1,
      };
    } else {
      return {
        zIndex,
        flex: 0,
      };
    }
  };

  const getSectionTitleClass = () => {
    if (activeSectionId === null) {
      return `${styles["about-services-section-title"]}`;
    } else {
      return `${styles["about-services-section-title"]} ${styles["about-services-section-title-active"]}`;
    }
  };

  const sectionClickHandler = (sectionId: number) => {
    setActiveSectionId((currentId) => {
      if (currentId !== null && currentId === sectionId) {
        return null;
      }
      return sectionId;
    });
  };

  return (
    <div className={styles.aboutUsAccordionContainer} ref={containerRef}>
      <section
        aria-label="about-us-section"
        className={`${styles["about-services-section-container"]} ${className}`}
        id="about-us-section"
      >
        {aboutUsList.map((aboutUsItem, index) => (
          <section
            key={index}
            style={getSectionStyle(index, aboutUsList.length - 1 - index)}
            onClick={() => sectionClickHandler(index)}
          >
            <h2 className={getSectionTitleClass()}>{aboutUsItem.heading}</h2>
            {getDescription(
              "We are Lorem Ipsum",
              aboutUsItem.description,
              index
            )}
          </section>
        ))}
      </section>
    </div>
  );
};

export default AboutAccordion;
