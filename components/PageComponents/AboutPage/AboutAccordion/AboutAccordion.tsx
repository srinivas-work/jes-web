import { aboutUsAccordionList } from "@/utils/data/dummyData";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./AboutAccordion.module.css";
import BruceSpotlight from "./BruceSpotlight/BruceSpotlight";
import MissionVision from "./MissionVision/MissionVision";
import CommonDataShowcase from "./WhyChooseUs/CommonDataShowcase";

const AboutAccordion: React.FC<{ className?: string }> = ({ className }) => {
  const [activeSectionId, setActiveSectionId] = useState<null | number>(null);
  const isPhoneScreen = useIsPhoneScreen();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // 👇 Track scroll progress relative to the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 👇 Update active section automatically based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isScrolling) return; // Don't update during programmatic scroll

    const totalSections = aboutUsAccordionList.length;

    // --- START: adjusted mapping to avoid hitting last index early ---
    // Use a 0..1 mapping to (totalSections - 1) so the last section only
    // activates when scroll progress is near the container end.
    const adjusted = Math.min(Math.max(latest, 0), 1);
    const sectionIndex = Math.round(adjusted * (totalSections - 1));
    // --- END: adjusted mapping ---

    setActiveSectionId((prev) => {
      if (prev !== sectionIndex) {
        return sectionIndex;
      }
      return prev;
    });
  });

  // 👇 NEW: Scroll to section when activeSectionId changes via click
  useEffect(() => {
    if (activeSectionId === null || !containerRef.current) return;

    const scrollToSection = () => {
      setIsScrolling(true);

      const container = containerRef.current;
      if (!container) return;

      const totalSections = aboutUsAccordionList.length;
      const sectionHeight = container.scrollHeight / totalSections;
      const targetScroll = sectionHeight * activeSectionId;

      // Smooth scroll to the target position
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });

      // Reset scrolling flag after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Match this with your scroll duration
    };

    scrollToSection();
  }, [activeSectionId]);

  const getSectionItem = (sectionId: number, description: string) => {
    switch (sectionId) {
      case 0:
        return <BruceSpotlight />;
      case 1:
        return <CommonDataShowcase pageType="whyChoose" />;
      case 2:
        return <MissionVision />;
      case aboutUsAccordionList.length - 1:
        return <CommonDataShowcase pageType="ourValues" />;
      default:
        return <p>{description}</p>;
    }
  };

  const getDescription = (description: string, sectionId: number) => {
    // Active Section Item
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

          {sectionId === 0 && (
            <img src={"/img/highBuilding.jpg"} className={styles.accordionBg} />
          )}

          {sectionId === 1 && (
            <img
              src={
                "https://jerseyeng.com/_next/image?url=%2Fimages%2Fabout%2Faboutservice-banner.png&w=3840&q=90"
              }
              style={{ opacity: 0.5 }}
              className={styles.accordionBg}
            />
          )}

          {sectionId === 2 && (
            <img
              src={
                "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
              }
              className={styles.accordionBg}
            />
          )}

          {sectionId === 3 && (
            <img
              src={
                "https://images.unsplash.com/photo-1537291730574-76479f3da033?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
              }
              className={styles.accordionBg}
            />
          )}

          <div className={styles["about-services-section-description"]}>
            {getSectionItem(sectionId, description)}
          </div>
        </div>
      );
    } else {
      return <></>;
    }
  };

  const getDescriptionStyle = (sectionId: number) => {
    const backgroundColor =
      sectionId % 2 == 0 ? "var(--primary-dark)" : "var(--primary-red)";

    if (activeSectionId !== null && sectionId === activeSectionId) {
      return {
        padding: isPhoneScreen ? "12rem" : "5rem",
        backgroundColor,
        color: "white",
      };
    } else {
      return {};
    }
  };

  const getSectionStyle = (sectionId: number, zIndex: number) => {
    if (activeSectionId !== null && sectionId === activeSectionId) {
      return {
        width: "100%",
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
        {aboutUsAccordionList.map((aboutUsItem, index) => (
          <section
            key={index}
            style={getSectionStyle(
              index,
              aboutUsAccordionList.length - 1 - index
            )}
            onClick={() => sectionClickHandler(index)}
          >
            <h2 className={getSectionTitleClass()}>{aboutUsItem.heading}</h2>
            {getDescription(aboutUsItem.description, index)}
          </section>
        ))}
      </section>
    </div>
  );
};

export default AboutAccordion;
