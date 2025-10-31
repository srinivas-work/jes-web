import { ProjectItemType } from "@/utils/types";
import { useRouter } from "next/navigation";
import styles from "./ProjectCard.module.css";
import Image from "next/image";

const ProjectCard: React.FC<{
  projectItem: ProjectItemType;
  index: number;
  isBlurred: boolean;
  onHover: (hovered: boolean) => void;
}> = ({ projectItem, index, isBlurred, onHover }) => {
  const router = useRouter();

  const goToProjects = () => {
    router.push(`/projects/${index}`); // navigate to /projects
  };

  return (
    <div
      className={`${styles.cardWrapper} ${isBlurred ? styles.blurred : ""}`}
      //className={styles.cardWrapper}
      //style={{ borderRadius }}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      onClick={goToProjects}
    >
      <div className={styles.cardInner}>
        <div className={styles.imageContainer}>
          <Image
            src={projectItem.thumbnailLink ?? projectItem.imgLink}
            alt={projectItem.name}
            fill
            className={styles.cardImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div
            className={styles.overlay}
            style={{ background: "rgba(0,0,0,0.5)" }}
            //style={{ background: overlayColor }}
          ></div>
        </div>

        <div className={styles.textTop}>
          <h3>{projectItem.name}</h3>
        </div>
        <div className={styles.textSide}>{projectItem.location}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
