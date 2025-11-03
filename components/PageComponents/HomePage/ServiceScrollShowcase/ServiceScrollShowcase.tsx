import { serviceSections } from "@/utils/data/dummyData";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";
import styles from "./ServiceScrollShowcase.module.css";

const ServiceScrollShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 360]), {
    stiffness: 60,
    damping: 18,
  });

  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.1]), {
    stiffness: 70,
    damping: 22,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = refs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [activeIndex]);

  const handleClick = (i: number) => {
    const target = refs.current[i];
    if (!target) return;

    const start = window.scrollY;
    const end = target.getBoundingClientRect().top + window.scrollY;
    const distance = end - start;
    const duration = 600;
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

  const goTo = (route: string) => {
    router.push(route);
  };

  return (
    <div className={styles.serviceScrollWrapper} ref={sectionRef} id="services">
      <div className={styles.sidebar}>
        {serviceSections.map((sec, i) => (
          <div
            key={i}
            className={`${styles.menuItem} ${
              activeIndex === i ? styles.active : ""
            }`}
            onClick={() => handleClick(i)}
          >
            <p>{sec.title}</p>
            <span
              className={`${styles.seeker} ${
                activeIndex === i ? styles.active : ""
              }`}
            />
          </div>
        ))}
      </div>

      <div className={styles.contentArea}>
        <div className={styles.stickyContent}>
          {/* Parallax Background */}
          <motion.div
            className={styles.bgImageContainer}
            style={{ rotate, scale }}
            transition={{ duration: 1.2, ease: "easeOut" }}
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

          {/* Foreground Content with Two Overlapping Images */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className={styles.serviceImageContainer}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className={styles.imageStack}>
                <img
                  src={
                    serviceSections[activeIndex].img1 ??
                    serviceSections[activeIndex].image
                  } // You might want to use a different image here
                  alt={serviceSections[activeIndex].title}
                  className={`${styles.serviceImage} ${styles.imageFront}`}
                />
                <img
                  src={
                    serviceSections[activeIndex].img2 ??
                    serviceSections[activeIndex].image
                  }
                  alt={serviceSections[activeIndex].title}
                  className={`${styles.serviceImage} ${styles.imageBack}`}
                />
              </div>
              <p className={styles.description}>
                {Array.isArray(serviceSections[activeIndex].description)
                  ? serviceSections[activeIndex].description[0]
                  : serviceSections[activeIndex].description}
              </p>
              <button
                className={styles.button}
                onClick={() => goTo(`/services/${activeIndex}`)}
              >
                View Details
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll Triggers */}
        <div className={styles.scrollSections}>
          {serviceSections.map((_, i) => (
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
};

export default memo(ServiceScrollShowcase);
