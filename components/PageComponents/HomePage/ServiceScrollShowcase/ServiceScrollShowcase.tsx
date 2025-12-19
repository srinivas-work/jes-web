"use client";

import { serviceSectionsObj } from "@/utils/data/dummyData";
import { ServiceId } from "@/utils/types";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRouter } from "next/navigation";
import { memo, useEffect, useRef, useState } from "react";
import styles from "./ServiceScrollShowcase.module.css";

const ServiceScrollShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Get service keys directly
  const serviceKeys = Object.keys(serviceSectionsObj);

  // Delayed initialization to avoid hydration errors
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Initialize scroll only when ready
  const { scrollYProgress } = useScroll(
    isReady && sectionRef.current
      ? {
          target: sectionRef,
          offset: ["start end", "end start"],
        }
      : undefined
  );

  // Always use the same spring config, just control the transform
  const rotate = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, isReady ? 360 : 0]),
    {
      stiffness: 60,
      damping: 18,
    }
  );

  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, isReady ? 1.1 : 1]),
    {
      stiffness: 70,
      damping: 22,
    }
  );

  useEffect(() => {
    if (!isReady || !refs.current.length) return;

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
  }, [isReady]);

  const handleClick = (i: number) => {
    if (!isReady) return;

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

  // Get active service data
  const activeService =
    serviceSectionsObj[serviceKeys[activeIndex] as ServiceId];

  // Static version for SSR and initial render
  if (!isReady) {
    return (
      <div className={styles.serviceScrollWrapper} id="services">
        <div className={styles.sidebar}>
          {serviceKeys.map((key, i) => (
            <div
              key={key}
              className={styles.menuItem}
              onClick={() => isReady && handleClick(i)}
            >
              <p>{serviceSectionsObj[key as ServiceId].title}</p>
              <span className={styles.seeker} />
            </div>
          ))}
        </div>
        <div className={styles.contentArea}>
          <div className={styles.stickyContent}>
            {/* Static background image */}
            <div className={styles.bgImageContainer}>
              <img
                className={styles.bgImage}
                src={"/img/jes_curve.png"}
                alt="JES Engineering"
              />
            </div>

            {/* Static service content */}
            {activeService && (
              <div className={styles.serviceImageContainer}>
                <div className={styles.imageStack}>
                  <img
                    src={activeService.img1 ?? activeService.image}
                    alt={activeService.title}
                    className={`${styles.serviceImage} ${styles.imageBack}`}
                  />
                  <img
                    src={activeService.img2 ?? activeService.image}
                    alt={activeService.title}
                    className={`${styles.serviceImage} ${styles.imageFront}`}
                  />
                </div>
                <p className={styles.description}>
                  {Array.isArray(activeService.description)
                    ? activeService.description[0]
                    : activeService.description}
                </p>
                <button
                  className={styles.button}
                  onClick={() => goTo(`/services/${serviceKeys[activeIndex]}`)}
                >
                  View Details
                </button>
              </div>
            )}
          </div>

          {/* Static scroll triggers */}
          <div className={styles.scrollSections}>
            {serviceKeys.map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  if (el && !refs.current[i]) {
                    refs.current[i] = el;
                  }
                }}
                className={styles.trigger}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Animated version for client-side
  return (
    <div className={styles.serviceScrollWrapper} ref={sectionRef} id="services">
      <div className={styles.sidebar}>
        {serviceKeys.map((key, i) => (
          <div
            key={key}
            className={`${styles.menuItem} ${
              activeIndex === i ? styles.active : ""
            }`}
            onClick={() => handleClick(i)}
          >
            <p>{serviceSectionsObj[key as ServiceId].title}</p>
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
            <img
              className={styles.bgImage}
              src={"/img/jes_curve.png"}
              alt="JES Engineering"
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
                  src={activeService.img1 ?? activeService.image}
                  alt={activeService.title}
                  className={`${styles.serviceImage} ${styles.imageBack}`}
                />
                <img
                  src={activeService.img2 ?? activeService.image}
                  alt={activeService.title}
                  className={`${styles.serviceImage} ${styles.imageFront}`}
                />
              </div>
              <p className={styles.description}>
                {Array.isArray(activeService.description)
                  ? activeService.description[0]
                  : activeService.description}
              </p>
              <button
                className={styles.button}
                onClick={() => goTo(`/services/${serviceKeys[activeIndex]}`)}
              >
                View Details
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll Triggers */}
        <div className={styles.scrollSections}>
          {serviceKeys.map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) refs.current[i] = el;
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
