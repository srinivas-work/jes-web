import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./CircularTimeline.module.css";

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
    title: "Idea Conceived & First Client Secured",
    desc: "We introduced the concept of outsourced take-offs and began meeting with industry reps. By the end of the year, we secured our first client—marking the start of our journey.",
  },
  {
    number: "2022",
    title: "Early Growth & Tech Adoption",
    desc: "Our client base grew, and we strengthened our capabilities by integrating PlanSwift into our workflow for faster, more accurate take-offs.",
  },
  {
    number: "2023",
    title: "Major Expansion & New Verticals",
    desc: "We scaled to 20 + clients and expanded into new verticals, including BIM and AR/VR modeling, establishing a multi-disciplinary engineering support offering.",
  },
  {
    number: "2024",
    title: "National Reach & Contractor Partnerships",
    desc: "We expanded our footprint to reps across 20+ states and began delivering services directly to contractors, strengthening our end-to-end project involvement.",
  },
  {
    number: "2025",
    title: "AI-Driven Innovation & Faster Turnaround",
    desc: "We began developing AI tools designed to streamline client workflows, automate repetitive tasks, and significantly improve turnaround times across all service lines",
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
  const isPhoneScreen = useIsPhoneScreen();
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
        {!isPhoneScreen && (
          <div className={styles.bgImageContainerOne}>
            <img
              className={styles.bgImageOne}
              src={"/img/jes_curve.png"}
              alt="JES Engineering"
            />
          </div>
        )}
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
