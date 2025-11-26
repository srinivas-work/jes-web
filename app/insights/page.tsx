"use client";

import FlipBookViewer from "@/components/FlipBookViewer/FlipBookViewer";
import UserValidatorForm from "@/components/UserValidatorForm/UserValidatorForm";
import { insightsData, whitePapers } from "@/utils/data/dummyData";
import { useLenis } from "@/utils/hooks/useLenis";
import { useUserValidatorStore } from "@/utils/store/useUserValidatorStore";
import { InsightItemType } from "@/utils/types";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Insights.module.css";

export default function Insights() {
  useLenis();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDocClicked, setIsDocClicked] = useState(false);
  const [cardPdfUrl, setCardPdfUrl] = useState<string | undefined>(undefined);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const {
    isOpen: isUserValidatorOpen,
    isValidated,
    openValidator,
  } = useUserValidatorStore();

  const curve1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const curve2Y = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const curve1Rotate = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const curve2Rotate = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroImageY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);

  const smoothCurve1Y = useSpring(curve1Y, { stiffness: 100, damping: 30 });
  const smoothCurve2Y = useSpring(curve2Y, { stiffness: 100, damping: 30 });
  const smoothHeroImageY = useSpring(heroImageY, {
    stiffness: 100,
    damping: 30,
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // const categories = useMemo(
  //   () => ["All", ...Array.from(new Set(insightsData.map((i) => i.category)))],
  //   []
  // );

  const categories = ["All", "LinkedIn", "Case Study", "White Papers"];

  const filteredInsights = useMemo(() => {
    if (selectedCategory === "All") return insightsData;
    return insightsData.filter((i) => i.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory === "White Papers") {
      openValidator();
    }
  }, [selectedCategory]);

  //Add the case study image

  //Opening White Papers only when user is validated
  //It should show the cards then ask for validation
  useEffect(() => {
    if (!isValidated && selectedCategory === "White Papers") {
      setSelectedCategory("All");
    }
    if (isValidated) {
      setSelectedCategory("White Papers");
    }
  }, [selectedCategory, isValidated, isUserValidatorOpen]);

  return (
    <div className={styles.pageWrapper} ref={containerRef}>
      {/* Floating Background Elements */}
      <motion.div
        className={styles.floatingCurve1}
        style={{ y: smoothCurve1Y, rotate: curve1Rotate }}
      >
        <img src="/img/jes_curve.png" alt="" />
      </motion.div>

      <motion.div
        className={styles.floatingCurve2}
        style={{ y: smoothCurve2Y, rotate: curve2Rotate }}
      >
        <img src="/img/jes_curve_detailed.png" alt="" />
      </motion.div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <motion.div
            className={styles.heroImageContainer}
            style={{ y: smoothHeroImageY }}
          >
            <div className={styles.heroImage}>
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80"
                alt="Hero background"
              />
            </div>
          </motion.div>
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <motion.div
            className={styles.heroLabel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Our Insights
          </motion.div>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Thoughts, Ideas
            <span className={styles.titleAccent}> & Insights</span>
          </motion.h1>
          <motion.p
            className={styles.heroDescription}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Exploring innovation, technology, and the future of business through
            expert perspectives and in-depth analysis.
          </motion.p>
        </div>
      </section>

      {/* Filter Menu */}
      <div className={styles.filterMenu}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`${styles.filterButton} ${
              selectedCategory === cat ? styles.activeFilter : ""
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Insights Grid */}
      <div className={styles.container}>
        <section className={styles.insightsGrid}>
          {selectedCategory === "White Papers" && isValidated ? (
            <>
              {whitePapers.map((whitePaperItem, index) => (
                <InsightCard
                  key={whitePaperItem.id}
                  insight={whitePaperItem}
                  index={index}
                  cardClickHandler={(clicked) => {
                    setIsDocClicked(clicked);
                    setCardPdfUrl(whitePaperItem.pdfUrl!);
                  }}
                />
              ))}
            </>
          ) : (
            <>
              {filteredInsights.map((insight, index) => (
                <InsightCard
                  key={insight.id}
                  insight={insight}
                  index={index}
                  cardClickHandler={(clicked) => setIsDocClicked(clicked)}
                />
              ))}
            </>
          )}
        </section>
      </div>
      <FlipBookViewer
        isClicked={isDocClicked}
        onClose={() => setIsDocClicked(false)}
        pdfUrl={cardPdfUrl}
      />
      <UserValidatorForm />
    </div>
  );
}

function InsightCard({
  insight,
  index,
  cardClickHandler,
}: {
  insight: InsightItemType;
  index: number;
  cardClickHandler: (clicked: boolean) => void;
}) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // const setSectionScrollYProgress = useScrollStore(
  //   (s) => s.setSectionScrollYProgress
  // );

  // // Register once
  // useEffect(() => {
  //   setSectionScrollYProgress(scrollYProgress);
  // }, [scrollYProgress, setSectionScrollYProgress]);

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 });

  const handleClick = () => {
    if (!insight.pdfUrl) {
      return router.push(`/insights/${insight.id}`);
    }

    //setIsDocClicked(true);
    cardClickHandler(true);
  };

  return (
    <motion.article
      ref={cardRef}
      className={styles.insightCard}
      initial={{ y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={styles.imageWrapper}>
        <motion.div className={styles.imageInner} style={{ y: smoothImageY }}>
          <motion.img
            src={insight.image}
            alt={insight.title}
            className={styles.insightImage}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </motion.div>
        <motion.div
          className={styles.imageOverlay}
          animate={{ opacity: isHovered ? 0.2 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardMeta}>
          <span className={styles.category}>{insight.category}</span>
          <span className={styles.metaDivider}>•</span>
          <span className={styles.date}>{insight.date}</span>
          <span className={styles.metaDivider}>•</span>
          <span className={styles.readTime}>{insight.readTime}</span>
        </div>

        <motion.h2
          className={styles.cardTitle}
          animate={{ color: isHovered ? "#a91e2d" : "#202020" }}
          transition={{ duration: 0.3 }}
        >
          {insight.title}
        </motion.h2>

        {insight.excerpt && (
          <p className={styles.cardExcerpt}>{insight.excerpt}</p>
        )}

        <motion.div
          className={styles.readMore}
          animate={{ x: isHovered ? 6 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span>{insight.pdfUrl ? "Read Document" : "Read Article"}</span>
          <motion.svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </div>
    </motion.article>
  );
}
