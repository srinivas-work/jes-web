import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import styles from "./ProductSelection.module.css";

interface Product {
  id: number;
  title: string;
  icon: string;
}

const products: Product[] = [
  { id: 1, title: "GRD (Grilles, Registers, & Diffusers)", icon: "🔲" },
  { id: 2, title: "Dampers", icon: "↔️" },
  { id: 3, title: "Silencers & Vibration", icon: "🔇" },
  { id: 4, title: "Fans & Terminals", icon: "⚙️" },
  { id: 5, title: "Vibration and seismic supports", icon: "📐" },
  { id: 6, title: "Fan Coils & VRV", icon: "❄️" },
  { id: 7, title: "Pumps & Hydronic Valves", icon: "💧" },
  { id: 8, title: "AHUs & Custom AHUs", icon: "⭕" },
];

const CARD_HEIGHT = 125;
const EXPANDED_OFFSET = 40;
const EXPANDED_SCALE = 1.02;

const ANIMATION_DURATION = 0.2;
const COLOR_DURATION = 0.05;
const STAGGER_DELAY = 0.01;

const CARD_COLORS = {
  normal: "#f5f5f5",
  expanded: "linear-gradient(135deg, #b91c47 0%, #8b1538 100%)",
};

const TEXT_COLORS = {
  normal: "#1a1a1a",
  expanded: "#ffffff",
};

const ICON_BG_COLORS = {
  normal: "rgba(0, 0, 0, 0.05)",
  expanded: "rgba(255, 255, 255, 0.15)",
};

export default function ProductSelection() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });

  const [animateCards, setAnimateCards] = useState(false);

  // Trigger animation when section enters view
  useEffect(() => {
    if (isInView) {
      setAnimateCards(true);
    } else {
      setAnimateCards(false);
    }
  }, [isInView]);

  const handleCardClick = (id: number) => {
    setExpandedId(id);

    if (sectionRef.current) {
      // Get the nearest scrollable parent
      const parent = sectionRef.current.offsetParent as HTMLElement | null;
      const scrollTop = parent
        ? sectionRef.current.offsetTop - parent.offsetTop
        : sectionRef.current.offsetTop;

      window.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });
    }
  };

  const getCardPosition = (index: number, id: number) => {
    const basePosition = index * CARD_HEIGHT;
    if (expandedId === null) return basePosition;

    const expandedIndex = products.findIndex((p) => p.id === expandedId);
    if (id === expandedId) return 0;
    if (index === 0 && expandedIndex !== 0) return expandedIndex * CARD_HEIGHT;
    if (index > 0) return basePosition + EXPANDED_OFFSET;

    return basePosition;
  };

  const getVisualOrder = (id: number) => {
    if (expandedId === null) {
      return products.findIndex((p) => p.id === id);
    }
    if (id === expandedId) return 0;

    const currentIndex = products.findIndex((p) => p.id === id);
    const expandedIndex = products.findIndex((p) => p.id === expandedId);

    if (currentIndex === 0) return expandedIndex;
    return currentIndex;
  };

  return (
    <div ref={sectionRef} className={styles.container}>
      <h2 className={styles.title}>Product Selection</h2>

      <div className={styles.grid}>
        {/* Left Column - Stacked Cards */}
        <div className={styles.leftColumn}>
          <div className={styles.cardsStack}>
            {products.map((product, index) => {
              const visualOrder = getVisualOrder(product.id);
              const isExpanded = expandedId === product.id;
              const position = getCardPosition(visualOrder, product.id);

              // Precompute animate values
              const zIndex = isExpanded ? 50 : products.length - visualOrder;
              const scale = isExpanded ? EXPANDED_SCALE : 1;
              const background = isExpanded
                ? CARD_COLORS.expanded
                : CARD_COLORS.normal;
              const opacity = 1; // stays 1
              const y = animateCards ? position : 50;

              return (
                <motion.div
                  key={product.id}
                  className={styles.card}
                  initial={{ opacity: 1, y: 50 }}
                  animate={{ y, zIndex, scale, background, opacity }}
                  transition={{
                    duration: isExpanded ? 0.1 : ANIMATION_DURATION,
                    delay: index * STAGGER_DELAY,
                    ease: "easeInOut",
                  }}
                  onClick={() => handleCardClick(product.id)}
                >
                  <div className={styles.cardContent}>
                    <motion.h3
                      className={styles.cardTitle}
                      animate={{
                        fontSize: isExpanded ? "1.7rem" : "1.2rem",
                        fontWeight: isExpanded ? "600" : "500",
                        color: isExpanded
                          ? TEXT_COLORS.expanded
                          : TEXT_COLORS.normal,
                      }}
                      transition={{
                        duration: COLOR_DURATION,
                        ease: "easeOut",
                        delay: isExpanded ? STAGGER_DELAY : 0,
                      }}
                    >
                      {product.title}
                    </motion.h3>
                    <motion.div
                      className={styles.iconPlaceholder}
                      animate={{
                        background: isExpanded
                          ? ICON_BG_COLORS.expanded
                          : ICON_BG_COLORS.normal,
                      }}
                      transition={{
                        duration: COLOR_DURATION,
                        ease: "easeOut",
                        delay: isExpanded ? STAGGER_DELAY * 1.2 : 0,
                      }}
                    >
                      <motion.span
                        className={styles.icon}
                        animate={{ opacity: isExpanded ? 0.9 : 0.7 }}
                        transition={{
                          duration: COLOR_DURATION,
                          ease: "easeOut",
                          delay: isExpanded ? STAGGER_DELAY * 1.4 : 0,
                        }}
                      >
                        {product.icon}
                      </motion.span>
                    </motion.div>
                  </div>

                  {isExpanded && (
                    <motion.button
                      className={styles.learnMore}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: STAGGER_DELAY * 2,
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        x: 4,
                        transition: { duration: 0.3, ease: "easeOut" },
                      }}
                    >
                      <svg
                        className={styles.arrowIcon}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 18L18 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 6H18V12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Learn more
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className={styles.rightColumn}>
          <div className={styles.imageGrid}>
            <div className={styles.imageCard}>
              <div className={styles.productImage}>
                <div className={styles.imagePlaceholder}>
                  <span>🔲</span>
                </div>
              </div>
            </div>
            <div className={styles.imageCard}>
              <div className={styles.productImage}>
                <div className={styles.imagePlaceholder}>
                  <span>🔲</span>
                </div>
              </div>
            </div>
            <div className={styles.imageCard}>
              <div className={styles.productImage}>
                <div className={styles.imagePlaceholder}>
                  <span>🔲</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.description}>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
