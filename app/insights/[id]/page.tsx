"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./InsightDetails.module.css";
import Image from "next/image";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { insightsData } from "../page";
import { useLenis } from "@/utils/hooks/useLenis";

export default function InsightDetails() {
  useLenis();

  const params = useParams();
  const router = useRouter();
  const { id } = params;

  // ---------- HOOKS MUST COME FIRST ----------
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Parallax motions with rotation & scale
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 120]);

  const curve1Y = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const curve1Rotate = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const curve1Scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  const curve2Y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const curve2Rotate = useTransform(scrollYProgress, [0, 1], [-10, 15]);
  const curve2Scale = useTransform(scrollYProgress, [0, 1], [0.5, 0.8]);

  // Smooth springs
  const smoothHeroY = useSpring(heroY, { stiffness: 80, damping: 25 });
  const smoothCurve1Y = useSpring(curve1Y, { stiffness: 80, damping: 25 });
  const smoothCurve1Rotate = useSpring(curve1Rotate, {
    stiffness: 80,
    damping: 25,
  });
  const smoothCurve1Scale = useSpring(curve1Scale, {
    stiffness: 80,
    damping: 25,
  });

  const smoothCurve2Y = useSpring(curve2Y, { stiffness: 80, damping: 25 });
  const smoothCurve2Rotate = useSpring(curve2Rotate, {
    stiffness: 80,
    damping: 25,
  });
  const smoothCurve2Scale = useSpring(curve2Scale, {
    stiffness: 80,
    damping: 25,
  });

  // ---------- MEMO DATA ----------
  const insight = useMemo(
    () => insightsData.find((item) => item.id === Number(id)),
    [id]
  );

  // ---------- EARLY RETURN ----------
  if (!insight) {
    return (
      <div className={styles.notFound}>
        <p>Insight not found.</p>
        <button onClick={() => router.push("/insights")}>Go Back</button>
      </div>
    );
  }

  // ---------- RENDER ----------
  return (
    <div ref={ref} className={styles.detailsWrapper}>
      <Header />

      {/* Floating Curves with rotation & scale */}
      <motion.div
        className={styles.floatingCurve1}
        style={{
          y: smoothCurve1Y,
          rotate: smoothCurve1Rotate,
          scale: smoothCurve1Scale,
        }}
        aria-hidden
      >
        <Image
          src="/img/jes_curve.png"
          alt=""
          width={600}
          height={600}
          style={{ objectFit: "contain" }}
        />
      </motion.div>

      <motion.div
        className={styles.floatingCurve2}
        style={{
          y: smoothCurve2Y,
          rotate: smoothCurve2Rotate,
          scale: smoothCurve2Scale,
        }}
        aria-hidden
      >
        <Image
          src="/img/jes_curve_detailed.png"
          alt=""
          width={700}
          height={700}
          style={{ objectFit: "contain" }}
        />
      </motion.div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <motion.div
          className={styles.heroImageContainer}
          style={{ y: smoothHeroY }}
        >
          <Image
            src={insight.image}
            alt={insight.title}
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </motion.div>

        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>{insight.title}</h1>
          <div className={styles.meta}>
            <span>{insight.category}</span> • <span>{insight.date}</span> •{" "}
            <span>{insight.readTime}</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.contentWrapper}>
          <p>
            {insight.excerpt} Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed egestas, magna vel efficitur egestas, tellus arcu
            imperdiet lorem, eget dapibus velit lacus in neque. Integer
            vestibulum elit vel ligula luctus malesuada. Phasellus fringilla
            sapien sit amet risus ultrices consequat. Etiam id sodales sem.
          </p>
          <p>
            Vivamus feugiat augue ut nunc volutpat, ac sodales lectus aliquet.
            Sed in tristique lorem. Fusce ac placerat purus. Nullam viverra
            finibus metus in blandit. Suspendisse potenti. Quisque dignissim,
            lorem sit amet vehicula gravida, urna justo vehicula ex, sed mattis
            purus est ut nisl.
          </p>
          <p>
            Morbi non justo eget nibh volutpat dignissim. Integer vel justo
            ipsum. Aliquam erat volutpat. Suspendisse consequat suscipit sem,
            eget eleifend ligula malesuada in. Mauris vel eros non mi viverra
            suscipit in ac sapien.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
