import Carousel from "@/components/UI/Carousel/Carousel";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./KeyDeliverables.module.css";

interface KeyDeliverablesType {
  id: number;
  title: string;
  icon: string;
  desc: string[];
}

const keyDeliverables: KeyDeliverablesType[] = [
  {
    id: 1,
    title: "Rapid MEP Quantity Takeoff",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/bmi_73aa8947cb.svg",
    desc: [
      "Get precise counts fast so your team can price and plan with confidence and spend more time in front of customers.",
      "What you get: Clean, auditable quantities for HVAC, plumbing, and electrical equipment",
      "Turnaround: 12-72 hours for most scopes",
      "Why it matters: Fewer misses, tighter bids, less rework",
    ],
  },
  {
    id: 2,
    title: "Spec Review + Equipment Selections",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/application_4aa981e844.svg",
    desc: [
      "De-risk choices before they hit the field.",
      "What you get: Spec compliance check, side-by-side AI assisted comparison options, and recommended selections",
      "Focus: Performance, availability, cost, and lifecycle",
      "Why it matters: Fewer RFIs, faster approvals, smother procurement",
    ],
  },
  {
    id: 3,
    title: "BIM/Revit Modelling + XR Visualization",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/contract_ac062687fa.svg",
    desc: [
      "Build it right, before you build it.",
      "What you get: Revit families and coordinated BIM models with clash-aware layout",
      "Extras: AR/VR animations and interactive walkthroughs for stakeholder buy-in",
      "Why it matters: Fewer field changes, clearer coordination, stronger client trust",
    ],
  },
  {
    id: 4,
    title: "Submittals Package (Ready to Approve)",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/bmi_73aa8947cb.svg",
    desc: [
      "Approval-ready documents that move projects, not paperwork",
      "What you get: Complete submittal sets with cut sheets, schedules, markups and traceability",
      "Standard: Organized to division and CSI requirements",
      "Why it matters: Faster approvals and fewer back-and-forth cycles",
    ],
  },
];

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

const KeyDeliverables = () => {
  const [expandedId, setExpandedId] = useState<number>(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setAnimateCards(isInView);
  }, [isInView]);

  const handleCardClick = (id: number) => setExpandedId(id);

  return (
    <div ref={sectionRef} className={styles.container}>
      <h2 className={styles.title}>Key Deliverables</h2>

      <div className={styles.grid}>
        {/* Left Column - Stacked Cards */}
        <div className={styles.leftColumn}>
          <div className={styles.cardsStack}>
            {keyDeliverables.map((product, index) => {
              const isExpanded = expandedId === product.id;

              return (
                <motion.div
                  key={product.id}
                  className={styles.card}
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
                      {/* Smooth invert transition */}
                      <motion.img
                        src={product.icon}
                        alt={product.title}
                        className={styles.iconImage}
                        animate={{
                          opacity: isExpanded ? 1 : 0.8,
                          filter: isExpanded
                            ? "invert(0) grayscale(0%)"
                            : "invert(1) grayscale(100%)",
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>

                    <motion.h3
                      className={styles.cardTitle}
                      animate={{
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
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className={styles.rightColumn}>
          <div className={styles.imageGrid}>
            <Carousel
              selectedId={expandedId}
              onCarouselChange={(carouselId) => {
                setExpandedId(carouselId + 1);
              }}
            />
          </div>

          <div className={styles.description}>
            <p>{keyDeliverables[expandedId - 1].desc[0]}</p>
            <ul>
              {keyDeliverables[expandedId - 1].desc.map((desItem, i) => {
                if (i === 0) return undefined;
                return <li key={i}>{desItem}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyDeliverables;

// const products: Product[] = [
//   {
//     id: 1,
//     title: "Thermal Load Calculation",
//     icon: "🔲",
//     desc: "We specialize in delivering comprehensive KPO services tailored specifically for accurate and detailed thermal load calculations. Our expertise lies in providing precise assessments crucial for efficient HVAC system design and optimization.",
//   },
//   {
//     id: 2,
//     title: "Ductwork E.S.P calculation",
//     icon: "↔️",
//     desc: "We specialize in delivering comprehensive solutions for Air Conditioning (AC) ductwork, including accurate External Static Pressure (ESP) calculations. Understanding the significance of ESP in HVAC systems, we offer detailed services tailored to ensure optimal performance and efficiency.",
//   },
//   {
//     id: 3,
//     title: "Pump Head Calculation",
//     icon: "🔇",
//     desc: "We specialize in providing Knowledge Process Outsourcing (KPO) services focused on precise and comprehensive pump head calculation solutions. Our expertise lies in offering accurate and tailored calculations crucial for efficient pump system design and operation.",
//   },
//   {
//     id: 4,
//     title: "Tools Used",
//     icon: "⚙️",
//     desc: "The tools we use for our services",
//   },
// ];
