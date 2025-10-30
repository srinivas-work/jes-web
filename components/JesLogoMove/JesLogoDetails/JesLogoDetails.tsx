import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionStyle,
} from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./JesLogoDetails.module.css";

interface CrossIconProps {
  color?: string;
  size?: number | string;
  className?: string;
  path1Style?: MotionStyle;
  path2Style?: MotionStyle;
  path3Style?: MotionStyle;
  path4Style?: MotionStyle;
  logoStyle?: MotionStyle;
}

const JesLogo: React.FC<CrossIconProps> = ({
  size = "20rem", // Default to 100% for container filling
  className,
  path1Style,
  path2Style,
  path3Style,
  path4Style,
  logoStyle,
}) => {
  // // Normalize the size to valid CSS units
  // const normalizedSize =
  //   typeof size === "number"
  //     ? `${size}px`
  //     : /^\d+$/.test(size)
  //     ? `${size}px`
  //     : size;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 807.538 255.111"
      className={className}
      width={size}
      height={"fit-content"}
      preserveAspectRatio="xMidYMid meet"
      style={{
        display: "block", // avoids inline whitespace
        overflow: "visible",
      }}
    >
      <defs>
        <style>
          {`
        .cls-1,.cls-3 { fill: var(--primary-red); }
        .cls-2 { fill: var(--primary-dark); }
      `}
        </style>
      </defs>
      <motion.g style={logoStyle}>
        <g>
          <path d="M276.773,246.941c-1.188,0-2.292-.226-3.312-.675-1.019-.45-1.885-1.065-2.598-1.847s-1.24-1.682-1.58-2.7l2.548-1.07c.458,1.172,1.13,2.072,2.013,2.7.883.629,1.901.942,3.057.942.679,0,1.273-.105,1.783-.318.509-.212.904-.513,1.184-.904.281-.391.42-.84.42-1.35,0-.696-.195-1.248-.585-1.656-.392-.407-.968-.729-1.732-.968l-3.565-1.12c-1.427-.441-2.514-1.117-3.261-2.025s-1.121-1.975-1.121-3.197c0-1.069.263-2.008.79-2.814.525-.806,1.252-1.438,2.178-1.897.926-.458,1.982-.688,3.171-.688,1.138,0,2.174.199,3.108.599.934.399,1.735.946,2.406,1.643s1.159,1.503,1.465,2.42l-2.496,1.096c-.374-1.002-.955-1.774-1.745-2.318-.79-.543-1.702-.815-2.738-.815-.628,0-1.181.106-1.655.318-.476.213-.846.519-1.108.917-.263.399-.395.862-.395,1.389,0,.611.194,1.155.586,1.63.39.476.984.833,1.782,1.07l3.312,1.044c1.511.459,2.648,1.117,3.412,1.975.765.857,1.146,1.923,1.146,3.196,0,1.054-.275,1.987-.828,2.802-.551.815-1.311,1.457-2.279,1.924-.968.467-2.088.7-3.362.7Z" />
          <path d="M308.18,246.941c-1.342,0-2.586-.246-3.732-.738-1.146-.493-2.139-1.176-2.979-2.051s-1.499-1.906-1.974-3.095c-.477-1.188-.714-2.496-.714-3.923,0-1.409.233-2.713.7-3.91s1.125-2.232,1.975-3.107c.849-.875,1.842-1.554,2.98-2.038,1.137-.483,2.385-.726,3.744-.726,1.342,0,2.543.229,3.604.688,1.062.459,1.957,1.058,2.688,1.796s1.257,1.541,1.58,2.407l-2.7,1.273c-.407-1.019-1.058-1.847-1.948-2.483-.893-.637-1.967-.955-3.223-.955s-2.369.297-3.337.892-1.72,1.418-2.255,2.471c-.534,1.053-.802,2.284-.802,3.693s.268,2.645.802,3.706c.535,1.062,1.287,1.885,2.255,2.471s2.08.879,3.337.879,2.33-.314,3.223-.942c.891-.628,1.541-1.452,1.948-2.471l2.7,1.273c-.323.85-.85,1.647-1.58,2.395s-1.625,1.35-2.688,1.809c-1.061.458-2.262.688-3.604.688Z" />
          <path d="M330.188,246.636l6.674-18.977h3.719l6.674,18.977h-3.21l-1.451-4.254h-7.718l-1.479,4.254h-3.209ZM335.74,239.707h5.936l-3.362-9.934h.84l-3.413,9.934Z" />
          <path d="M362.231,246.636v-18.977h3.006v16.302h8.202v2.675h-11.208Z" />
          <path d="M388.696,246.636v-18.977h12.507v2.675h-9.501v5.45h8.992v2.675h-8.992v5.502h9.501v2.675h-12.507Z" />
          <path d="M437.475,246.636l-5.222-18.977h3.184l4.229,16.43h-.789l4.381-16.43h3.133l4.382,16.43h-.815l4.254-16.43h3.158l-5.196,18.977h-3.388l-4.406-16.175h.892l-4.433,16.175h-3.362Z" />
          <path d="M472.346,246.636v-18.977h3.006v18.977h-3.006Z" />
          <path d="M495.372,246.636v-16.302h-5.043v-2.675h12.991v2.675h-4.968v16.302h-2.98Z" />
          <path d="M518.297,246.636v-18.977h3.006v8.354h8.788v-8.354h2.98v18.977h-2.98v-7.947h-8.788v7.947h-3.006Z" />
          <path d="M558.951,246.941c-1.376,0-2.654-.246-3.834-.738-1.181-.493-2.216-1.181-3.107-2.063s-1.588-1.919-2.089-3.107-.751-2.488-.751-3.897.25-2.713.751-3.91,1.192-2.232,2.076-3.107c.883-.875,1.919-1.554,3.107-2.038,1.188-.483,2.471-.726,3.847-.726,1.392,0,2.679.242,3.858.726,1.181.484,2.217,1.168,3.107,2.051.892.883,1.584,1.919,2.076,3.107s.739,2.488.739,3.897-.251,2.709-.752,3.897-1.193,2.225-2.076,3.107-1.919,1.57-3.107,2.063c-1.188.492-2.471.738-3.846.738ZM558.951,244.19c.984,0,1.889-.179,2.713-.535.823-.356,1.541-.854,2.152-1.49s1.086-1.384,1.426-2.241.51-1.787.51-2.789-.17-1.928-.51-2.776c-.34-.85-.814-1.597-1.426-2.242-.611-.645-1.329-1.146-2.152-1.503-.824-.356-1.729-.534-2.713-.534s-1.89.178-2.713.534c-.824.357-1.541.858-2.152,1.503-.611.646-1.083,1.393-1.414,2.242-.331.849-.497,1.774-.497,2.776s.166,1.932.497,2.789.803,1.604,1.414,2.241,1.333,1.134,2.165,1.49,1.731.535,2.7.535Z" />
          <path d="M591.938,246.941c-1.41,0-2.662-.297-3.758-.892-1.095-.594-1.952-1.409-2.572-2.445-.62-1.035-.93-2.216-.93-3.541v-12.404h3.006v12.277c0,.832.182,1.571.548,2.216.364.646.865,1.146,1.503,1.503.637.356,1.371.535,2.203.535.849,0,1.592-.179,2.229-.535s1.138-.857,1.503-1.503c.365-.645.548-1.384.548-2.216v-12.277h2.98v12.404c0,1.325-.306,2.506-.917,3.541-.611,1.036-1.465,1.852-2.561,2.445-1.095.595-2.356.892-3.782.892Z" />
          <path d="M619.065,246.636v-16.302h-5.043v-2.675h12.991v2.675h-4.968v16.302h-2.98Z" />
          <path d="M659.183,246.636v-18.977h3.006v16.302h8.202v2.675h-11.208Z" />
          <path d="M685.649,246.636v-18.977h3.006v18.977h-3.006Z" />
          <path d="M705.313,246.636v-18.977h2.803l7.132,9.883h-1.401l7.005-9.883h2.803v18.977h-2.98v-15.437l1.12.306-7.157,9.781h-.306l-7.005-9.781.993-.306v15.437h-3.006Z" />
          <path d="M740.311,246.636v-18.977h3.006v18.977h-3.006Z" />
          <path d="M763.337,246.636v-16.302h-5.043v-2.675h12.991v2.675h-4.968v16.302h-2.98Z" />
          <path d="M792.91,246.941c-1.188,0-2.292-.226-3.312-.675-1.019-.45-1.885-1.065-2.598-1.847s-1.24-1.682-1.579-2.7l2.547-1.07c.459,1.172,1.129,2.072,2.013,2.7.883.629,1.901.942,3.057.942.679,0,1.273-.105,1.782-.318.51-.212.904-.513,1.185-.904.28-.391.421-.84.421-1.35,0-.696-.195-1.248-.586-1.656-.391-.407-.968-.729-1.732-.968l-3.566-1.12c-1.426-.441-2.513-1.117-3.26-2.025-.748-.908-1.121-1.975-1.121-3.197,0-1.069.263-2.008.79-2.814.525-.806,1.252-1.438,2.178-1.897.925-.458,1.982-.688,3.171-.688,1.138,0,2.174.199,3.107.599.935.399,1.736.946,2.407,1.643s1.159,1.503,1.465,2.42l-2.496,1.096c-.374-1.002-.955-1.774-1.745-2.318-.789-.543-1.702-.815-2.738-.815-.628,0-1.181.106-1.655.318-.476.213-.845.519-1.108.917-.264.399-.395.862-.395,1.389,0,.611.195,1.155.586,1.63.391.476.984.833,1.783,1.07l3.311,1.044c1.512.459,2.649,1.117,3.414,1.975.764.857,1.146,1.923,1.146,3.196,0,1.054-.275,1.987-.827,2.802-.553.815-1.312,1.457-2.28,1.924s-2.089.7-3.362.7Z" />
        </g>
        <g>
          <path d="M384.985,124.01V20.962h34.432v103.049c0,42.056-36.153,73.044-74.766,72.798-39.105-.246-69.355-24.84-76.487-62.715h34.677c3.689,18.199,21.151,30.742,41.81,30.742,22.872,0,40.334-18.2,40.334-40.826Z" />
          <path d="M800.782,145.162c0,28.529-27.789,51.647-73.78,51.647-46.241,0-82.148-22.627-84.603-56.567h35.907c3.686,16.478,23.118,27.054,48.201,27.054,23.368,0,39.843-9.838,39.843-23.118,0-41.072-121.741.738-121.741-77.963,0-30.25,31.971-48.942,74.275-48.942,44.76,0,76.241,21.397,78.947,52.631h-35.662c-2.951-13.28-21.152-24.102-43.285-24.102-24.103,0-39.843,9.1-39.843,21.397,0,38.121,121.741-1.722,121.741,77.963Z" />
          <g>
            <polygon
              className="cls-2"
              points="498.974 161.228 457.511 142.73 457.511 146.304 498.974 164.802 606.592 137.055 606.592 133.481 498.974 161.228"
            />
            <polygon
              className="cls-2"
              points="498.974 105.578 457.511 87.08 457.511 90.654 498.974 109.152 606.592 81.405 606.592 77.831 498.974 105.578"
            />
            <path
              className="cls-1"
              d="M457.511,70.15v-35.147l41.463,18.498,107.618-27.747v36.071l-107.618,27.747-41.463-19.423Z"
            />
            <path
              className="cls-2"
              d="M562.814,6.035l-105.303,28.969,41.214,18.753,107.867-28.002-43.778-19.72ZM465.606,35.484l97.189-26.883,37.039,16.465-100.582,25.548-33.646-15.13Z"
            />
            <path
              className="cls-1"
              d="M457.511,125.801v-35.147l41.463,18.498,107.618-27.747v36.071l-107.618,27.747-41.463-19.423Z"
            />
            <path
              className="cls-1"
              d="M457.511,181.451v-35.147l41.463,18.498,107.618-27.747v36.071l-107.618,27.747-41.463-19.423Z"
            />
          </g>
        </g>
      </motion.g>
      <g>
        <motion.path
          style={path1Style}
          className="cls-3"
          d="M113.341,116.704V30.687h12.871c12.871,0,25.288,4.306,35.168,12.146,9.834,7.841,16.496,18.717,18.763,30.772h22.569c-2.266-17.674-11.194-33.944-25.108-45.773-14.004-11.874-32.041-18.536-50.713-18.672h-36.03v107.545h22.479Z"
        />
        <motion.path
          style={path2Style}
          className="cls-3"
          d="M113.338,139.183H27.32v-12.871c0-12.871,4.306-25.288,12.146-35.168,7.841-9.834,18.717-16.496,30.772-18.763v-22.569c-17.674,2.266-33.944,11.194-45.773,25.108-11.874,14.004-18.536,32.041-18.672,50.713v36.03h107.545v-22.479Z"
        />
        <motion.path
          style={path3Style}
          className="cls-3"
          d="M135.812,139.183v86.018h-12.871c-12.871,0-25.288-4.306-35.168-12.146-9.834-7.841-16.496-18.717-18.763-30.772h-22.569c2.266,17.674,11.194,33.944,25.108,45.773,14.004,11.874,32.041,18.536,50.713,18.672h36.03v-107.545h-22.479Z"
        />
        <motion.path
          style={path4Style}
          className="cls-3"
          d="M135.812,116.704h86.018v12.871c0,12.871-4.306,25.288-12.146,35.168-7.841,9.834-18.717,16.496-30.772,18.763v22.569c17.674-2.266,33.944-11.194,45.773-25.108,11.874-14.004,18.536-32.041,18.672-50.713v-36.03h-107.545v22.479Z"
        />
      </g>
    </svg>
  );
};

export default function JesLogoDetails() {
  const ref = useRef<HTMLDivElement | null>(null);

  // Track scroll progress across the full height of the section
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ["start start", "end end"],
  // });

  const { scrollYProgress } = useScroll();

  // useEffect(() => {
  //   const unsubscribe = demo.onChange((progress) => {
  //     console.log("Scroll progress:", progress); // Log progress as it changes
  //   });

  //   // Cleanup when the component unmounts
  //   return () => unsubscribe();
  // }, [scrollYProgress]);

  const animationLimit = [0.3, 0.42];

  const smoothness = { stiffness: 100, damping: 25 };

  // Common animations for all paths
  const opacity = useTransform(scrollYProgress, animationLimit, [0, 1]);
  const blurPx = useTransform(scrollYProgress, animationLimit, [30, 0]);
  const rotate = useTransform(scrollYProgress, animationLimit, [90, 0]);
  const scale = useTransform(scrollYProgress, animationLimit, [5.5, 1]);

  // Smooth spring motion for common properties
  const smoothOpacity = useSpring(opacity, smoothness);
  const smoothBlur = useSpring(blurPx, smoothness);
  const smoothRotate = useSpring(rotate, smoothness);
  const smoothScale = useSpring(scale, smoothness);

  // Individual path animations from different directions
  // Path 1: Top Left to Current Position
  const path1X = useTransform(scrollYProgress, animationLimit, ["90vw", "0vw"]);
  const path1Y = useTransform(scrollYProgress, animationLimit, [
    "-40vh",
    "0vh",
  ]);
  const smoothPath1X = useSpring(path1X, smoothness);
  const smoothPath1Y = useSpring(path1Y, smoothness);

  // Path 2: Top Right to Current Position
  const path2X = useTransform(scrollYProgress, animationLimit, [
    "-60vw",
    "0vw",
  ]);
  const path2Y = useTransform(scrollYProgress, animationLimit, [
    "-120vh",
    "0vh",
  ]);
  const smoothPath2X = useSpring(path2X, smoothness);
  const smoothPath2Y = useSpring(path2Y, smoothness);

  // Path 3: Bottom Left to Current Position
  const path3X = useTransform(scrollYProgress, animationLimit, [
    "-60vw",
    "0vw",
  ]);
  const path3Y = useTransform(scrollYProgress, animationLimit, ["40vh", "0vh"]);
  const smoothPath3X = useSpring(path3X, smoothness);
  const smoothPath3Y = useSpring(path3Y, smoothness);

  // Path 4: Bottom Right to Current Position
  const path4X = useTransform(scrollYProgress, animationLimit, ["50vw", "0vw"]);
  const path4Y = useTransform(scrollYProgress, animationLimit, ["55vh", "0vh"]);
  const smoothPath4X = useSpring(path4X, smoothness);
  const smoothPath4Y = useSpring(path4Y, smoothness);

  //Logo Group
  const logoPathX = useTransform(
    scrollYProgress,
    [0.4, 0.42],
    ["300vw", "0vh"]
  );
  const smoothlogoPathX = useSpring(logoPathX, smoothness);

  // Create motion blur filter
  const blurFilter = useTransform(smoothBlur, (b) => `blur(${b}px)`);

  return (
    <div className={styles.jesLogoDetailsContainer} ref={ref}>
      <div className={styles.jesDetailsContainer}>
        <div className={styles.jesLogoAboutContainer}>
          <h2>About Us</h2>
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

        <motion.div
          className={styles.jesLogoContainer}
          style={{
            opacity: smoothOpacity,
            filter: blurFilter,
            transformOrigin: "center",
          }}
        >
          <JesLogo
            className={styles.jesLogo}
            size="35rem"
            logoStyle={{
              x: smoothlogoPathX,
            }}
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
    </div>
  );
}

// return (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     version="1.1"
//     viewBox="0 0 1942.2 1913.1"
//     width={size}
//     height={size}
//     style={{ overflow: "visible" }}
//   >
//     {/* Path 1 - From Top Left */}
//     <motion.path
//       fill={color}
//       style={path1Style}
//       d="M883.8,875.2V201h100.9c100.9,0,198.2,33.7,275.6,95.2,77.1,61.4,129.3,146.7,147,241.2h176.9c-17.8-138.5-87.7-266-196.8-358.7-109.8-93.1-251.1-145.3-397.5-146.3h-282.4v842.9h176.2Z"
//     />

//     {/* Path 2 - From Top Right */}
//     <motion.path
//       fill={color}
//       style={path2Style}
//       d="M883.8,1051.4H209.6v-100.9c0-100.9,33.7-198.2,95.2-275.6,61.4-77.1,146.7-129.3,241.2-147v-176.9c-138.5,17.8-266,87.7-358.7,196.8-93.1,109.8-145.3,251.1-146.3,397.5v282.4h842.9v-176.2Z"
//     />

//     {/* Path 3 - From Bottom Left */}
//     <motion.path
//       fill={color}
//       style={path3Style}
//       d="M1059.9,1051.4v674.2h-100.9c-100.9,0-198.2-33.7-275.6-95.2-77.1-61.4-129.3-146.7-147-241.2h-176.9c17.8,138.5,87.7,266,196.8,358.7,109.8,93.1,251.1,145.3,397.5,146.3h282.4v-842.9h-176.2Z"
//     />

//     {/* Path 4 - From Bottom Right */}
//     <motion.path
//       fill={color}
//       style={path4Style}
//       d="M1059.9,875.2h674.2v100.9c0,100.9-33.7,198.2-95.2,275.6-61.4,77.1-146.7,129.3-241.2,147v176.9c138.5-17.8,266-87.7,358.7-196.8,93.1-109.8,145.3-251.1,146.3-397.5v-282.4h-842.9v176.2Z"
//     />
//   </svg>
// );
