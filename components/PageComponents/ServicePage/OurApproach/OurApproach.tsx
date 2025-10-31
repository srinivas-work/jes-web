import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./OurApproach.module.css";
import { useRef } from "react";
import Image from "next/image";

const approaches = [
  {
    title: "Expertise",
    subtitle:
      "Our team comprises seasoned professionals with a deep understanding of BIM technology and its application in diverse construction projects.",
  },
  {
    title: "Innovation",
    subtitle:
      "We stay updated with the latest BIM tools and methodologies, ensuring that your projects benefit from cutting-edge solutions.",
  },
  {
    title: "Efficiency",
    subtitle:
      "Our commitment to efficiency and accuracy saves time and resources, optimizing project schedules and budgets.",
  },
  {
    title: "Customized Solutions",
    subtitle:
      "We tailor our services to suit your project's unique requirements, ensuring maximum value and results.",
  },
];

const OurApproach = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Animate opacity and blur for each layer
  const opacity1 = useTransform(scrollYProgress, [0, 0.25], [0.2, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.5], [0.2, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.75], [0.2, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.75, 0.85], [0.2, 1]);

  const blur1 = useTransform(scrollYProgress, [0, 0.25], ["8px", "0px"]);
  const blur2 = useTransform(scrollYProgress, [0.25, 0.5], ["8px", "0px"]);
  const blur3 = useTransform(scrollYProgress, [0.5, 0.75], ["8px", "0px"]);
  const blur4 = useTransform(scrollYProgress, [0.75, 0.85], ["8px", "0px"]);

  return (
    <div ref={ref} className={styles.approachSection}>
      <div className={styles.approachDetailsContainer}>
        <h2 className={styles.title}>Why Choose JES</h2>
        <img
          className={styles.approachSectionBg}
          src="/img/bg_pattern.svg"
          alt="JES"
        />
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
        <div className={styles.approachCircleContainer}>
          {/* Text overlay */}
          <div className={styles.approachItemsContainer}>
            {approaches.map((approach, index) => (
              <motion.div
                className={styles.approachItem}
                key={index}
                style={{
                  opacity:
                    index === 0
                      ? opacity1
                      : index === 1
                      ? opacity2
                      : index === 2
                      ? opacity3
                      : opacity4,
                  filter:
                    index === 0
                      ? blur1
                      : index === 1
                      ? blur2
                      : index === 2
                      ? blur3
                      : blur4,
                }}
              >
                <h3>{approach.title}</h3>
                <p>{approach.subtitle}</p>
              </motion.div>
            ))}
          </div>

          {/* SVG Background */}
          <svg
            viewBox="0 0 2000 2000"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.approachSvg}
          >
            <defs>
              <style>{`.st0 { fill: #a91e2d; transition: opacity 0.5s ease; }`}</style>
            </defs>

            <motion.path
              className="st0"
              style={{ opacity: opacity1, filter: blur1 }}
              d="M1000,10.8c-359.9,0-674.9,192.2-848,479.6h1695.9C1674.9,203.1,1359.9,10.8,1000,10.8Z"
            />
            <motion.path
              className="st0"
              style={{ opacity: opacity2, filter: blur2 }}
              d="M11,985h1978.1c-2.5-168.4-47.1-326.6-123.7-464.6H134.7C58.1,658.4,13.5,816.6,11,985Z"
            />
            <motion.path
              className="st0"
              style={{ opacity: opacity3, filter: blur3 }}
              d="M134.7,1479.6h1730.6c76.6-138,121.2-296.2,123.7-464.6H11c2.5,168.4,47.1,326.6,123.7,464.6Z"
            />
            <motion.path
              className="st0"
              style={{ opacity: opacity4, filter: blur4 }}
              d="M1000,1989.2c359.9,0,674.9-192.2,848-479.6H152c173.1,287.4,488.1,479.6,848,479.6Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
export default OurApproach;
// return (
//   <div className={styles.ourApproachContainer}>
//     <h2>Our Approach</h2>
//     <div className={styles.approachItemsContainer}>
//       {approaches.map((approach, index) => {
//         return (
//           <div className={styles.approachItem} key={index}>
//             <h3>{approach.title}</h3>
//             <p>{approach.subtitle}</p>
//           </div>
//         );
//       })}
//     </div>
//   </div>
// );
