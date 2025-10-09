"use client";

import Header from "@/components/Header/Header";
import AboutAccordion from "@/components/PageComponents/AboutPage/AboutAccordion/AboutAccordion";
import TeamCardStack from "@/components/PageComponents/AboutPage/TeamCardStack/TeamCardStack";
import { useLenis } from "@/utils/hooks/useLenis";
import React from "react";
import styles from "./About.module.css";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import OurClientsCarousel from "@/components/PageComponents/AboutPage/OurClientsCarousel/OurClientsCarousel";

const About = () => {
  useLenis();

  return (
    <div className={styles.aboutPage}>
      <Header />
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
      <TeamCardStack />
      <OurClientsCarousel />
      <Footer className={styles.Footer} />
    </div>
  );
};

export default About;
