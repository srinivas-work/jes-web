"use client";

import ButtonLayer from "@/components/PageComponents/ProjectPage/ButtonLayer/ButtonLayer";
import { useLenis } from "@/utils/hooks/useLenis";
import Image from "next/image";
import styles from "./Projects.module.css";
import ProjectsGallery from "@/components/PageComponents/ProjectPage/ProjectsGallery/ProjectsGallery";

const Projects = () => {
  useLenis();
  return (
    <div className={styles.projectPage}>
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
      {/* <ButtonLayer options={["All", "MEP", "AR/VR"]} /> */}
      <ProjectsGallery />
    </div>
  );
};

export default Projects;
