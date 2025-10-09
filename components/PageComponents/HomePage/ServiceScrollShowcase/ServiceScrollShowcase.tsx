// ServiceScrollShowcase.tsx
import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./ServiceScrollShowcase.module.css";
import Image from "next/image";

type Section = {
  title: string;
  image: string;
  description: string;
};

const sections: Section[] = [
  {
    title: "Engineering Take-offs",
    image: "/img/engg.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was",
  },
  {
    title: "Manufacturing Drawings",
    image: "/img/manufacturing.png",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },
  {
    title: "Specification Review",
    image: "/img/specs.png",
    description:
      "It has survived not only five centuries but also the leap into electronic typesetting.",
  },
  {
    title: "Digital Selections and Submittals",
    image: "/img/digital.png",
    description:
      "Remaining essentially unchanged, it was popularised with desktop publishing.",
  },
  {
    title: "Complex Submittals",
    image: "/img/complex.png",
    description:
      "This is an additional section to test dynamic behavior of scroll trigger.",
  },
  {
    title: "BIM Modeling",
    image: "/img/bim.png",
    description:
      "Dynamic scroll section for Building Information Modeling showcases flexible content.",
  },
  {
    title: "AR/VR Modeling & Visualization",
    image: "/img/arvr.png",
    description:
      "An immersive digital twin experience enabled by cutting-edge visualization.",
  },
  {
    title: "JES Triage Agent",
    image: "/img/triage.png",
    description:
      "Automating triage decisions through intelligent analysis and visualization.",
  },
];

export default function ServiceScrollShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting) {
            setPrevIndex(activeIndex); // store previous
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [activeIndex]);

  const direction = activeIndex > prevIndex ? 1 : -1;

  const handleClick = (i: number) => {
    const target = refs.current[i];
    if (!target) return;

    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY;
    const distance = end - start;
    const duration = 600; // milliseconds
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, start + distance * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className={styles.wrapper}>
      {/* Left sidebar */}
      <div className={styles.sidebar}>
        {sections.map((sec, i) => (
          <div
            key={i}
            className={`${styles.menuItem} ${
              activeIndex === i ? styles.active : ""
            }`}
            onClick={() => handleClick(i)}
          >
            {sec.title}
            {/* <AnimatePresence mode="popLayout">
              {activeIndex === i && (
                <motion.span
                  className={styles.seeker}
                  key={i}
                  initial={{
                    opacity: 0,
                    //visibility: "hidden",
                    y: -20 * direction,
                  }}
                  animate={{
                    opacity: 1,
                    //visibility: "visible",
                    y: -20,
                  }}
                  exit={{
                    opacity: 0,
                    //visibility: "hidden",
                    y: -20 * direction,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              )}
            </AnimatePresence> */}
            <span
              className={`${styles.seeker} ${
                activeIndex === i ? styles.active : ""
              }`}
            />
          </div>
        ))}
      </div>

      {/* Right content */}
      <div className={styles.contentArea}>
        <div className={styles.stickyContent}>
          <motion.div
            initial={{ opacity: 0, x: 150 }}
            whileInView={{ opacity: 0.15, x: 0 }}
            viewport={{ once: false, amount: 0.2 }} // animate once when 20% visible
            transition={{ duration: 1, ease: "easeOut" }}
            className={styles.bgImageContainer}
          >
            <Image
              className={styles.bgImage}
              src={"/img/jes_curve.png"}
              alt="JES Engineering"
              sizes="100vw"
              width={0}
              height={0}
            />
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className={styles.imageContainer}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <img
                src={`/img/services/service-${activeIndex + 1}.jpg`}
                alt={sections[activeIndex].title}
                className={styles.image}
              />
              <p className={styles.description}>
                {sections[activeIndex].description}
              </p>
              <button className={styles.button}>View Details</button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll triggers */}
        <div className={styles.scrollSections}>
          {sections.map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={styles.trigger}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
