"use client";

import AboutAccordion from "@/components/PageComponents/AboutPage/AboutAccordion/AboutAccordion";
import AboutTopPhone from "@/components/PageComponents/AboutPage/AboutTopPhone/AboutTopPhone";
import CircularTimeline from "@/components/PageComponents/AboutPage/CircularTimeline/CircularTimeline";
import SecuritySection from "@/components/PageComponents/AboutPage/SecuritySection/SecuritySection";
import TeamCardStack from "@/components/PageComponents/AboutPage/TeamCardStack/TeamCardStack";
import FAQSection from "@/components/PageComponents/HomePage/FAQSection/FAQSection";
import ReadyScale from "@/components/ReadyScale/ReadyScale";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { useLenis } from "@/utils/hooks/useLenis";
import styles from "./About.module.css";

const About = () => {
  useLenis();

  const isPhoneScreen = useIsPhoneScreen();

  return (
    <div className={styles.aboutPage}>
      <div className={styles.bgImageContainerOne}>
        <img
          className={styles.bgImageOne}
          src={"/img/jes_curve_detailed.png"}
          alt="JES Engineering"
        />
      </div>

      {isPhoneScreen && <AboutTopPhone />}
      {!isPhoneScreen && <AboutAccordion />}

      <TeamCardStack />
      <CircularTimeline />
      <SecuritySection />
      <FAQSection />
      <ReadyScale />
      {/* <OurClientsCarousel /> */}
    </div>
  );
};

export default About;
