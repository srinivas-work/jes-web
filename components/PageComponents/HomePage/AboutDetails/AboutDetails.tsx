import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import styles from "./AboutDetails.module.css";
import JesLogoMove from "@/components/JesLogoMove/JesLogoMove";

const AboutDetails = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.2", "end end"], // progress from top to bottom
  });

  // Clip-path for afterLogo reveal (top to bottom)
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  );

  // Blur effect for afterLogo (blurry to clear)
  const blur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(20px)", "blur(0px)"]
  );

  // Optional: Add opacity transition for smoother effect
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  return (
    <section className={styles.aboutDetailsSection}>
      {/* Sticky wrapper that pins content */}
      <div className={styles.stickyWrapper} ref={containerRef}>
        <div className={styles.aboutDetailsContainer}>
          <h2>About Us</h2>
          <div className={styles.aboutTextImgContainer}>
            <p className={styles.aboutDetailsDesc}>
              We have combined the precision and innovation of our U.S.-based
              engineering expertise with the deep, industry-specific experience
              of our 200+ professional engineers across India and Qatar. Our
              global team seamlessly manages your engineering and design
              workloads ensuring accuracy, efficiency, and scalability at every
              stage of the process. By entrusting us with your complex design
              and documentation needs, your organization gains the freedom to
              focus on strategy, growth, and innovation unlocking a new world of
              opportunities and technological possibilities.
            </p>

            <div className={styles.aboutDetailsDescImgContainer}>
              <Image
                className={styles.beforeLogo}
                alt="JES"
                src="/img/logos/jes_before_logo.png"
                sizes="100vw"
                width={0}
                height={0}
              />

              <motion.div
                className={styles.afterLogoWrapper}
                style={{
                  clipPath,
                  filter: blur,
                  opacity,
                }}
              >
                <Image
                  className={styles.afterLogo}
                  alt="JES"
                  src="/img/logos/jes_after_logo.png"
                  sizes="100vw"
                  width={0}
                  height={0}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDetails;
