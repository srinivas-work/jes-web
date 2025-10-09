import {
  motion,
  useMotionValue,
  animate,
  AnimationPlaybackControls,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./StatsBar.module.css";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  {
    value: 82,
    suffix: "%",
    label: "of members say they gained clarity within the",
  },
  { value: 93, suffix: "%", label: "report feeling more accountable" },
  { value: 6, label: "6-person circles. The sweet spot for focused" },
  { value: 1200, suffix: "+", label: "hours of mastermind sessions hosted" },
  { value: 75, suffix: "%", label: "return for a second cycle" },
];

function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { margin: "-50px" }); // triggers on enter/exit
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let controls: AnimationPlaybackControls | undefined;

    if (isInView) {
      controls = animate(count, value, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (latest) => setDisplay(Math.floor(latest)),
      });
    } else {
      count.set(0);
      setDisplay(0);
    }

    return () => controls?.stop();
  }, [isInView, value, count]);

  return (
    <motion.span ref={ref}>
      {display}
      {suffix}
    </motion.span>
  );
}

export default function StatsBar() {
  return (
    <div className={styles.container}>
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className={styles.statBox}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ margin: "-50px" }}
        >
          <div className={styles.value}>
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          </div>
          <p className={styles.label}>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
