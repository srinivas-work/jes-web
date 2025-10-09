"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ButtonLayer from "@/components/PageComponents/ProjectPage/ButtonLayer/ButtonLayer";
import LODGallery from "@/components/PageComponents/ProjectPage/LODGallery/LODGallery";
import { useLenis } from "@/utils/hooks/useLenis";
import Image from "next/image";
import styles from "./Projects.module.css";

const Projects = () => {
  useLenis();
  return (
    <div className={styles.projectPage}>
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

      <h2>Our Client Projects</h2>
      <ButtonLayer options={["All", "MEP", "AR/VR"]} />
      <LODGallery />
      <Footer className={styles.Footer} />
    </div>
  );
};

export default Projects;
