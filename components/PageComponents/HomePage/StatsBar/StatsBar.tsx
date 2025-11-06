import {
  motion,
  useMotionValue,
  animate,
  AnimationPlaybackControls,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./StatsBar.module.css";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";

type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  {
    value: 20,
    suffix: "Locations",
    label: "JES currently serving customers in over 20 states and provinces.",
  },
  {
    value: 8,
    suffix: "Years",
    label:
      "Built on 8+ years of expertise, we’ve forged expertise and a strong foundation.",
  },
  {
    value: 200,
    suffix: "Strength",
    label:
      "Our Team includes over 200+ skilled professionals in different fields.",
  },
  {
    value: 7,
    suffix: "Services",
    label: "World class Engineering and CAD services you can count on!",
  },
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
    <motion.span className={styles.digitContainer} ref={ref}>
      <span className={styles.digits}>
        {value < 10 && 0}
        {display}+
      </span>
      {suffix}
    </motion.span>
  );
}

export default function StatsBar() {
  const isPhoneScreen = useIsPhoneScreen();

  return (
    <section className={styles.statsSection}>
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          className={styles.statBox}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ margin: "-50px" }}
        >
          <div className={styles.statValue}>
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
          </div>
          {!isPhoneScreen && <p className={styles.statLabel}>{stat.label}</p>}
        </motion.div>
      ))}
    </section>
  );
}
