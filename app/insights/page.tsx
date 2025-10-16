"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import styles from "./Insights.module.css";
import { useLenis } from "@/utils/hooks/useLenis";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

interface Insight {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
}

export const insightsData: Insight[] = [
  {
    id: 1,
    title: "The Future of Digital Transformation",
    excerpt:
      "Exploring how emerging technologies are reshaping business landscapes and creating new opportunities for innovation.",
    category: "Technology",
    date: "Oct 8, 2025",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Design Thinking in Modern Product Development",
    excerpt:
      "Understanding the principles of user-centered design and how they drive successful product innovation.",
    category: "Design",
    date: "Oct 5, 2025",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Sustainable Business Practices for 2025",
    excerpt:
      "Implementing eco-friendly strategies that benefit both the environment and your bottom line.",
    category: "Sustainability",
    date: "Oct 2, 2025",
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&q=80",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "AI Integration in Customer Experience",
    excerpt:
      "Leveraging artificial intelligence to create personalized and engaging customer journeys.",
    category: "AI & ML",
    date: "Sep 28, 2025",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Building High-Performance Teams",
    excerpt:
      "Strategies for fostering collaboration, innovation, and excellence in remote and hybrid work environments.",
    category: "Leadership",
    date: "Sep 25, 2025",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Data-Driven Decision Making",
    excerpt:
      "Harnessing the power of analytics to make informed strategic choices that drive growth.",
    category: "Analytics",
    date: "Sep 22, 2025",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    readTime: "6 min read",
  },
];

export default function Insights() {
  useLenis();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(insightsData.map((i) => i.category)))],
    []
  );

  const filteredInsights = useMemo(() => {
    if (selectedCategory === "All") return insightsData;
    return insightsData.filter((i) => i.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className={styles.pageWrapper} ref={containerRef}>
      <Header />

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
          {filteredInsights.map((insight, index) => (
            <InsightCard key={insight.id} insight={insight} index={index} />
          ))}
        </section>
      </div>

      <Footer />
    </div>
  );
}

function InsightCard({ insight, index }: { insight: Insight; index: number }) {
  const router = useRouter(); // ✅ Next.js router for navigation
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 });

  const handleClick = () => {
    router.push(`/insights/${insight.id}`);
  };

  return (
    <motion.article
      ref={cardRef}
      className={styles.insightCard}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick} // ✅ Click navigates to detail page
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

        <p className={styles.cardExcerpt}>{insight.excerpt}</p>

        <motion.div
          className={styles.readMore}
          animate={{ x: isHovered ? 6 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span>Read Article</span>
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
