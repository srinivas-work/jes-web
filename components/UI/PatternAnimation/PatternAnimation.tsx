import React, { useRef } from "react";
import styles from "./PatternAnimation.module.css";
import {
  motion,
  MotionStyle,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

interface LogoCurveProps {
  size?: number | string;
  className?: string;
  pathStyle?: MotionStyle;
}

const LogoCurve: React.FC<LogoCurveProps> = ({
  size,
  className,
  pathStyle,
}) => {
  return (
    <svg
      className={className}
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 1473.704 2008.406"
    >
      <defs>
        <style>
          {`.cls-1 {
        fill: #a91e2d;
      }`}
        </style>
      </defs>

      <motion.path
        style={pathStyle}
        className="cls-1"
        d="M466.614,1604.072v-231.741c.298-229.928,93.661-452.481,264.032-628.74,170.371-176.269,406.752-295.033,667.909-335.54l72.065-7.736V0l-72.065,4.203c-383.263,40.398-736.394,200.204-993.785,449.647C147.476,703.282,3.568,1025.314,0,1359.902v644.301h1470.62v-400.131H466.614Z"
      />
    </svg>
  );
};

const PatternAnimation: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothness = { stiffness: 100, damping: 25 };

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const smoothRotate1 = useSpring(rotate1, smoothness);
  const smoothRotate2 = useSpring(rotate2, smoothness);

  return (
    <div
      className={`${styles.matrixContainer} ${className || ""}`}
      {...props}
      ref={containerRef}
    >
      {Array.from({ length: 7 }).map((_, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {Array.from({ length: 6 }).map((_, colIndex) => (
            <LogoCurve
              key={`${rowIndex}-${colIndex}`}
              className={styles.logoCurve}
              pathStyle={{
                rotate: colIndex % 2 === 0 ? smoothRotate2 : smoothRotate1,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PatternAnimation;
