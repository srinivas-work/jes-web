import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./CircularTimeline.module.css";
import Image from "next/image";

interface Section {
  number: string;
  title: string;
  desc: string;
}

interface TextBlockProps {
  index: number;
  total: number;
  section: Section;
  scrollYProgress: MotionValue<number>;
}

interface CircleNumberProps {
  index: number;
  total: number;
  section: Section;
  scrollYProgress: MotionValue<number>;
}

const sections: Section[] = [
  {
    number: "2021",
    title: "A Seed of Thought",
    desc: "Q4 2022 - The idea for Darkocean was conceived with a clear vision - to move beyond traditional survey methods by enabling smarter data analysis, real-time decision-making, and automation.",
  },
  {
    number: "2022",
    title: "Vision Taking Shape",
    desc: "Q1 2023: Darkocean FZCO (The parent company) was officially registered and established. Q2 to Q3: The core founding team with a strong background in offshore survey and management was brought together.",
  },
  {
    number: "2023",
    title: "Building the Momentum",
    desc: "Q1 2024: Collaborations: Geostar Surveys - India, GulfLabs - Qatar Q1 2024: Establish Darkocean Geostar Surveys & Consultancy LLC in UAE.",
  },
  {
    number: "2024",
    title: "Crafting The Future",
    desc: "Q1 2025: Exploring new regional markets, expanding into subsea asset inspection and ROV services. Q1 2025: Launching of our Satellite Derived Bathymetry service.",
  },
  {
    number: "2025",
    title: "Vision Taking Shape",
    desc: "Q2 2025: Collaborated with Helms Geomarine to develop the Geotechnical division. Looking Ahead: Planning strategic acquisition and further investment in DP vessels and advanced survey tech.",
  },
];

// Circle number component with active state
const CircleNumber: React.FC<CircleNumberProps> = ({
  index,
  total,
  section,
  scrollYProgress,
}) => {
  const start = index / total;
  const end = (index + 1) / total;

  // Circle number opacity - only active when corresponding text block is active
  const opacity = useTransform(
    scrollYProgress,
    [start - 0.1, start, end - 0.1, end],
    [0.15, 1, 1, 0.15] // Active state has opacity 1, inactive has 0.15
  );

  return (
    <motion.div
      className={styles.circleNumber}
      style={{
        transform: `rotate(-${(index / total) * 360}deg)`,
        transformOrigin: "center 21rem",
        opacity,
      }}
    >
      {section.number}
    </motion.div>
  );
};

// Text block component
const TextBlock: React.FC<TextBlockProps> = ({
  index,
  total,
  section,
  scrollYProgress,
}) => {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [start - 0.1, start, end - 0.1, end],
    [0, 1, 1, index === sections.length - 1 ? 0.1 : 0]
  );

  const y = useTransform(
    scrollYProgress,
    [start - 0.1, start, end - 0.1, end],
    [50, 0, 0, -50]
  );

  return (
    <motion.div className={styles.textBlock} style={{ opacity, y }}>
      <h2 className={styles.number}>{section.number}</h2>
      <h1 className={styles.title}>{section.title}</h1>
      <p className={styles.desc}>{section.desc}</p>
    </motion.div>
  );
};

export default function CircularTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Rotate full circle across scroll
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.stickyWrapper}>
        <h2 className={styles.journeyHeading}>Our Journey</h2>
        <div className={styles.bgImageContainerOne}>
          <Image
            className={styles.bgImageOne}
            src={"/img/jes_curve.png"}
            alt="JES Engineering"
            sizes="100vw"
            width={0}
            height={0}
          />
        </div>
        {/* Rotating circle */}
        <motion.div className={styles.circle} style={{ rotate: rotation }}>
          {sections.map((section, index) => (
            <CircleNumber
              key={index}
              index={index}
              total={sections.length}
              section={section}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        {/* Sequential text blocks (crossfade) */}
        {sections.map((section, index) => (
          <TextBlock
            key={index}
            index={index}
            total={sections.length}
            section={section}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}
