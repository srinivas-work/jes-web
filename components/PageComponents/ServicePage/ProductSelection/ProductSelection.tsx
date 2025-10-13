import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import styles from "./ProductSelection.module.css";
import Carousel from "@/components/UI/Carousel/Carousel";
import VerticalCarousel from "@/components/UI/VerticalCarousel/VerticalCarousel";
import DoubleCarousel from "@/components/UI/DoubleCarousel/DoubleCarousel";

interface Product {
  id: number;
  title: string;
  icon: string;
}

const products: Product[] = [
  { id: 1, title: "Customized Reports & Documentation", icon: "🔲" },
  { id: 2, title: "Consultancy and Project Support", icon: "↔️" },
  { id: 3, title: "Quality Assurance & Compliance", icon: "🔇" },
  { id: 4, title: "Domain Specific Services", icon: "⚙️" },
  { id: 5, title: "Software Aided Services", icon: "📐" },
];

// Controllable spacing variables
const CARD_HEIGHT = 125;
const CARD_SPACING = 15; // Control the vertical space between cards
const STACK_OFFSET = 10; // Control the horizontal stacking offset
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
  };

  // Calculate stacked positions
  const getCardPosition = (index: number, id: number) => {
    const basePosition = index * STACK_OFFSET;
    if (expandedId === null) return basePosition;

    const expandedIndex = products.findIndex((p) => p.id === expandedId);
    if (id === expandedId) return basePosition; // Expanded card stays in its stack position

    return basePosition;
  };

  const getCardTopPosition = (index: number) => {
    return index * (CARD_HEIGHT + CARD_SPACING);
  };

  // Calculate total container height based on card count and spacing
  const getTotalContainerHeight = () => {
    return (
      products.length * (CARD_HEIGHT + CARD_SPACING) +
      products.length * STACK_OFFSET
    );
  };

  return (
    <div ref={sectionRef} className={styles.container}>
      <h2 className={styles.title}>Key Deliverables</h2>

      <div className={styles.grid}>
        {/* Left Column - Stacked Cards */}
        <div className={styles.leftColumn}>
          <div
            className={styles.cardsStack}
            //style={{ minHeight: `${getTotalContainerHeight()}px` }}
          >
            {products.map((product, index) => {
              const isExpanded = expandedId === product.id;
              const stackPosition = getCardPosition(index, product.id);
              const topPosition = getCardTopPosition(index);

              return (
                <motion.div
                  key={product.id}
                  className={styles.card}
                  style={{
                    // position: "absolute",
                    // top: topPosition,
                    // left: 0,
                    zIndex: isExpanded ? 50 : products.length - index,
                    // height: `fit-content`,
                  }}
                  initial={{ opacity: 1, y: 50 }}
                  animate={{
                    y: animateCards ? 0 : 50,
                    background: isExpanded
                      ? CARD_COLORS.expanded
                      : CARD_COLORS.normal,
                    scale: isExpanded ? 1.02 : 1,
                  }}
                  transition={{
                    duration: ANIMATION_DURATION,
                    delay: index * STAGGER_DELAY,
                    ease: "easeInOut",
                  }}
                  onClick={() => handleCardClick(product.id)}
                >
                  <div className={styles.cardContent}>
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
                      }}
                    >
                      <motion.span
                        className={styles.icon}
                        animate={{ opacity: isExpanded ? 0.9 : 0.7 }}
                        transition={{
                          duration: COLOR_DURATION,
                          ease: "easeOut",
                        }}
                      >
                        {product.icon}
                      </motion.span>
                    </motion.div>
                    <motion.h3
                      className={styles.cardTitle}
                      animate={{
                        //fontSize: isExpanded ? "1.7rem" : "1.2rem",
                        fontWeight: isExpanded ? "600" : "500",
                        color: isExpanded
                          ? TEXT_COLORS.expanded
                          : TEXT_COLORS.normal,
                      }}
                      transition={{
                        duration: COLOR_DURATION,
                        ease: "easeOut",
                      }}
                    >
                      {product.title}
                    </motion.h3>
                  </div>

                  {/* {isExpanded && (
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
                  )} */}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className={styles.rightColumn}>
          <div className={styles.imageGrid}>
            <Carousel />
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
