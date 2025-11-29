"use client";

import ProjectsGallery from "@/components/PageComponents/ProjectPage/ProjectsGallery/ProjectsGallery";
import { useLenis } from "@/utils/hooks/useLenis";
import styles from "./Projects.module.css";

const Projects = () => {
  useLenis();
  return (
    <div className={styles.projectPage}>
      <div className={styles.bgImageContainerOne}>
        <img
          className={styles.bgImageOne}
          src={"/img/jes_curve_detailed.png"}
          alt="JES Engineering"
          sizes="100vw"
        />
      </div>

      <h2>Our Client Projects</h2>
      {/* <ButtonLayer options={["All", "MEP", "AR/VR"]} /> */}
      <ProjectsGallery />
    </div>
  );
};

export default Projects;
