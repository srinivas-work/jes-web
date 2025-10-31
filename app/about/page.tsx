"use client";

import AboutAccordion from "@/components/PageComponents/AboutPage/AboutAccordion/AboutAccordion";
import CircularTimeline from "@/components/PageComponents/AboutPage/CircularTimeline/CircularTimeline";
import OurClientsCarousel from "@/components/PageComponents/AboutPage/OurClientsCarousel/OurClientsCarousel";
import TeamCardStack from "@/components/PageComponents/AboutPage/TeamCardStack/TeamCardStack";
import { useLenis } from "@/utils/hooks/useLenis";
import Image from "next/image";
import styles from "./About.module.css";
import SecuritySection from "@/components/PageComponents/AboutPage/SecuritySection/SecuritySection";

const About = () => {
  useLenis();

  return (
    <div className={styles.aboutPage}>
      <div className={styles.bgImageContainerOne}>
        <Image
          className={styles.bgImageOne}
          src={"/img/jes_curve_detailed.png"}
          alt="JES Engineering"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>
      {/* <div className={styles.bgImageContainerTwo}>
        <Image
          className={styles.bgImageTwo}
          src={"/img/jes_curve_detailed.png"}
          alt="JES Engineering"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div> */}
      <AboutAccordion />
      <SecuritySection />
      {/* <TeamCardStack /> */}
      <CircularTimeline />
      <OurClientsCarousel />
    </div>
  );
};

export default About;
