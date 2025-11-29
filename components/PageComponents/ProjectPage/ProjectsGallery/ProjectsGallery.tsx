import { projectList } from "@/utils/data/dummyData";
import { useState } from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import styles from "./ProjectsGallery.module.css";

interface ProjectCardProps {
  imageUrl: string;
  title: string;
  author: string;
  borderRadius?: string;
  overlayColor?: string;
  isBlurred?: boolean;
  onHover?: (hovered: boolean) => void;
}

export const projectCardDetails = [
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    overlayColor: "rgba(100, 30, 50, 0.4)",
    borderRadius: "4rem 0 0 0",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&q=80",
    overlayColor: "rgba(120, 140, 150, 0.3)",
    borderRadius: "0 4rem 0 0",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    overlayColor: "rgba(130, 110, 150, 0.35)",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800&q=80",
    overlayColor: "rgba(40, 40, 40, 0.4)",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80",
    overlayColor: "rgba(60, 90, 120, 0.35)",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80",
    overlayColor: "rgba(140, 150, 155, 0.3)",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80",
    overlayColor: "rgba(130, 80, 120, 0.4)",
    borderRadius: "0 0 0 4rem",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    overlayColor: "rgba(100, 120, 130, 0.35)",
    borderRadius: "0 0 4rem 0",
  },
];

export const projectCardDetailsHorizontal = [
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    overlayColor: "rgba(100, 30, 50, 0.4)",
    borderRadius: "4rem 0 0 4rem",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&q=80",
    overlayColor: "rgba(120, 140, 150, 0.3)",
    borderRadius: "0 0 0 0",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    overlayColor: "rgba(130, 110, 150, 0.35)",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800&q=80",
    overlayColor: "rgba(40, 40, 40, 0.4)",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=800&q=80",
    overlayColor: "rgba(60, 90, 120, 0.35)",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&q=80",
    overlayColor: "rgba(140, 150, 155, 0.3)",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80",
    overlayColor: "rgba(130, 80, 120, 0.4)",
    borderRadius: "0 0 0 0",
  },
  {
    title: "LOD 100 - Conceptual Design",
    author: "JOHN MARKS",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    overlayColor: "rgba(100, 120, 130, 0.35)",
    borderRadius: "0 4rem 4rem 0",
  },
];

export default function ProjectsGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className={styles.gridContainer}>
      {/* {projectCardDetails.map((card, i) => (
        <ProjectCard
          key={i}
          imageUrl={card.imageUrl}
          title={card.title}
          author={card.author}
          borderRadius={card.borderRadius}
          overlayColor={card.overlayColor}
          isBlurred={hoveredIndex !== null && hoveredIndex !== i}
          onHover={(hovered) => setHoveredIndex(hovered ? i : null)}
        />
      ))} */}
      {projectList.map((projectItem, index) => (
        <ProjectCard
          key={index}
          index={index}
          projectItem={projectItem}
          isBlurred={hoveredIndex !== null && hoveredIndex !== index}
          onHover={(hovered) => setHoveredIndex(hovered ? index : null)}
        />
      ))}
    </main>
  );
}
