import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionStyle,
} from "framer-motion";
import { useRef } from "react";
import styles from "./JesLogoDetails.module.css";

interface CrossIconProps {
  color?: string;
  size?: number | string;
  className?: string;
  path1Style?: MotionStyle;
  path2Style?: MotionStyle;
  path3Style?: MotionStyle;
  path4Style?: MotionStyle;
}

const JesLogo: React.FC<CrossIconProps> = ({
  color = "#a91e2d",
  size = "20%", // Default to 100% for container filling
  className,
  path1Style,
  path2Style,
  path3Style,
  path4Style,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 1942.2 1913.1"
      width={size}
      height={size}
      style={{ overflow: "visible" }}
    >
      {/* Path 1 - From Top Left */}
      <motion.path
        fill={color}
        d="M883.8,875.2V201h100.9c100.9,0,198.2,33.7,275.6,95.2,77.1,61.4,129.3,146.7,147,241.2h176.9c-17.8-138.5-87.7-266-196.8-358.7-109.8-93.1-251.1-145.3-397.5-146.3h-282.4v842.9h176.2Z"
        style={path1Style}
      />

      {/* Path 2 - From Top Right */}
      <motion.path
        fill={color}
        d="M883.8,1051.4H209.6v-100.9c0-100.9,33.7-198.2,95.2-275.6,61.4-77.1,146.7-129.3,241.2-147v-176.9c-138.5,17.8-266,87.7-358.7,196.8-93.1,109.8-145.3,251.1-146.3,397.5v282.4h842.9v-176.2Z"
        style={path2Style}
      />

      {/* Path 3 - From Bottom Left */}
      <motion.path
        fill={color}
        d="M1059.9,1051.4v674.2h-100.9c-100.9,0-198.2-33.7-275.6-95.2-77.1-61.4-129.3-146.7-147-241.2h-176.9c17.8,138.5,87.7,266,196.8,358.7,109.8,93.1,251.1,145.3,397.5,146.3h282.4v-842.9h-176.2Z"
        style={path3Style}
      />

      {/* Path 4 - From Bottom Right */}
      <motion.path
        fill={color}
        d="M1059.9,875.2h674.2v100.9c0,100.9-33.7,198.2-95.2,275.6-61.4,77.1-146.7,129.3-241.2,147v176.9c138.5-17.8,266-87.7,358.7-196.8,93.1-109.8,145.3-251.1,146.3-397.5v-282.4h-842.9v176.2Z"
        style={path4Style}
      />
    </svg>
  );
};

export default function JesLogoDetails() {
  const ref = useRef<HTMLDivElement | null>(null);

  // Track scroll progress across the full height of the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const animationLimit = [0, 0.6];

  // Common animations for all paths
  const opacity = useTransform(scrollYProgress, animationLimit, [0, 1]);
  const blurPx = useTransform(scrollYProgress, animationLimit, [30, 0]);
  const rotate = useTransform(scrollYProgress, animationLimit, [90, 0]);
  const scale = useTransform(scrollYProgress, animationLimit, [0.5, 1]);

  // Smooth spring motion for common properties
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 25 });
  const smoothBlur = useSpring(blurPx, { stiffness: 100, damping: 18 });
  const smoothRotate = useSpring(rotate, { stiffness: 100, damping: 20 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 });

  // Individual path animations from different directions
  // Path 1: Top Left to Current Position
  const path1X = useTransform(scrollYProgress, animationLimit, [
    "180vw",
    "0vw",
  ]);
  const path1Y = useTransform(scrollYProgress, animationLimit, [
    "-40vh",
    "0vh",
  ]);
  const smoothPath1X = useSpring(path1X, { stiffness: 100, damping: 20 });
  const smoothPath1Y = useSpring(path1Y, { stiffness: 100, damping: 20 });

  // Path 2: Top Right to Current Position
  const path2X = useTransform(scrollYProgress, animationLimit, [
    "-140vw",
    "0vw",
  ]);
  const path2Y = useTransform(scrollYProgress, animationLimit, [
    "-80vh",
    "0vh",
  ]);
  const smoothPath2X = useSpring(path2X, { stiffness: 100, damping: 20 });
  const smoothPath2Y = useSpring(path2Y, { stiffness: 100, damping: 20 });

  // Path 3: Bottom Left to Current Position
  const path3X = useTransform(scrollYProgress, animationLimit, [
    "-140vw",
    "0vw",
  ]);
  const path3Y = useTransform(scrollYProgress, animationLimit, [
    "240vh",
    "0vh",
  ]);
  const smoothPath3X = useSpring(path3X, { stiffness: 100, damping: 20 });
  const smoothPath3Y = useSpring(path3Y, { stiffness: 100, damping: 20 });

  // Path 4: Bottom Right to Current Position
  const path4X = useTransform(scrollYProgress, animationLimit, [
    "140vw",
    "0vw",
  ]);
  const path4Y = useTransform(scrollYProgress, animationLimit, [
    "200vh",
    "0vh",
  ]);
  const smoothPath4X = useSpring(path4X, { stiffness: 100, damping: 20 });
  const smoothPath4Y = useSpring(path4Y, { stiffness: 100, damping: 20 });

  // Create motion blur filter
  const blurFilter = useTransform(smoothBlur, (b) => `blur(${b}px)`);

  return (
    <div className={styles.jesLogoDetailsContainer} ref={ref}>
      <motion.div
        className={styles.jesLogoContainer}
        style={{
          opacity: smoothOpacity,
          filter: blurFilter,
          // position: "fixed",
          // top: "50%",
          // left: "50%",
        }}
        // transformTemplate={(_, generated) =>
        //   `translate(-50%, -50%) ${generated}`
        // }
      >
        <div className={styles.jesLogoAboutContainer}>
          <h2>About Us</h2>
          {/* <img
            src="/img/logos/jes_after_logo.png"
            className={styles.logoCompleteImg}
          /> */}
          <p className={styles.jesLogoAboutDesc}>
            We have combined the precision and innovation of our U.S.-based
            engineering expertise with the deep, industry-specific experience of
            our 200+ professional engineers across India and Qatar. Our global
            team seamlessly manages your engineering and design workloads
            ensuring accuracy, efficiency, and scalability at every stage of the
            process. By entrusting us with your complex design and documentation
            needs, your organization gains the freedom to focus on strategy,
            growth, and innovation unlocking a new world of opportunities and
            technological possibilities.
          </p>
        </div>
        <JesLogo
          className={styles.jesLogo}
          color="#a91e2d"
          size="25%" // Now this will work - adjust percentage as needed
          path1Style={{
            x: smoothPath1X,
            y: smoothPath1Y,
            rotate: smoothRotate,
            scale: smoothScale,
          }}
          path2Style={{
            x: smoothPath2X,
            y: smoothPath2Y,
            rotate: smoothRotate,
            scale: smoothScale,
          }}
          path3Style={{
            x: smoothPath3X,
            y: smoothPath3Y,
            rotate: smoothRotate,
            scale: smoothScale,
          }}
          path4Style={{
            x: smoothPath4X,
            y: smoothPath4Y,
            rotate: smoothRotate,
            scale: smoothScale,
          }}
        />
      </motion.div>
    </div>
  );
}
