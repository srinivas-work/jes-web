import Carousel from "@/components/UI/Carousel/Carousel";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./ProductSelection.module.css";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  title: string;
  icon: string;
  desc: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "AHU, chilled water pumps",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/bmi_73aa8947cb.svg",
    desc: "We specialize in delivering comprehensive KPO services tailored specifically for accurate and detailed thermal load calculations. Our expertise lies in providing precise assessments crucial for efficient HVAC system design and optimization.",
  },
  {
    id: 2,
    title: "GRD, VAV boxes and terminal units Dampers & Louvers",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/application_4aa981e844.svg",
    desc: "We specialize in delivering comprehensive solutions for Air Conditioning (AC) ductwork, including accurate External Static Pressure (ESP) calculations. Understanding the significance of ESP in HVAC systems, we offer detailed services tailored to ensure optimal performance and efficiency.",
  },
  {
    id: 3,
    title: "Valves, heat-exchangers, separators",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/contract_ac062687fa.svg",
    desc: "We specialize in providing Knowledge Process Outsourcing (KPO) services focused on precise and comprehensive pump head calculation solutions. Our expertise lies in offering accurate and tailored calculations crucial for efficient pump system design and operation.",
  },
  {
    id: 4,
    title: "VRV & VRF, piping packages",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/bmi_73aa8947cb.svg",
    desc: "The tools we use for our services",
  },
  {
    id: 5,
    title: "Noise control, vibration & seismic",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/application_4aa981e844.svg",
    desc: "We specialize in providing Knowledge Process Outsourcing (KPO) services focused on precise and comprehensive pump head calculation solutions. Our expertise lies in offering accurate and tailored calculations crucial for efficient pump system design and operation.",
  },
];

const whyQTO: Product[] = [
  {
    id: 1,
    title: "Engineering-Backed Accuracy",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/bmi_73aa8947cb.svg",
    desc: "As an engineering firm, we don't just measure; we understand the why behind the designs, leading to more intelligent and accurate takeoffs.",
  },
  {
    id: 2,
    title: "Advanced Technology",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/application_4aa981e844.svg",
    desc: "We invest in the latest digital takeoff software to deliver speed and precision that manual methods can't match.",
  },
  {
    id: 3,
    title: "Speed & Scalability",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/contract_ac062687fa.svg",
    desc: "Need a takeoff in 24 hours? We have the team and technology to meet tight deadlines without compromising quality.",
  },
  {
    id: 4,
    title: "Cost-Effective Solution",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/bmi_73aa8947cb.svg",
    desc: "Avoid the overhead of a full-time, in-house estimator. Our services provide top-tier expertise on a project-by-project basis.",
  },
  {
    id: 5,
    title: "Collaborative Partnership",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/application_4aa981e844.svg",
    desc: "We see ourselves as an extension of your team, dedicated to your success. We're always available to clarify our reports and discuss the project.",
  },
];

const productsBIM: Product[] = [
  {
    id: 1,
    title: "LOD 100 - Conceptual Design",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/bmi_73aa8947cb.svg",
    desc: "LOD 100 represents the most basic level of BIM modeling. It includes conceptual information, basic geometry, and overall project massing.",
  },
  {
    id: 2,
    title: "LOD 200 - Schematic Design",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/application_4aa981e844.svg",
    desc: "LOD 200 involves more developed elements than LOD 100. It includes approximate sizes, shapes, and locations of building elements.",
  },
  {
    id: 3,
    title: "LOD 300 - Detailed Design",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/contract_ac062687fa.svg",
    desc: "LOD 300 provides a more detailed representation of building elements. It includes accurate geometry, sizes, shapes, quantities, and relationships between components.",
  },
  {
    id: 4,
    title: "LOD 400 - Fabrication and Assembly",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/bmi_73aa8947cb.svg",
    desc: "LOD 400 is highly detailed and suitable for fabrication and assembly purposes. It includes precise geometry, specific product information, and assembly details.",
  },
  {
    id: 5,
    title: "LOD 500 - As-Built Model",
    icon: "https://cdn-jersey-bucket.s3.us-west-2.amazonaws.com/application_4aa981e844.svg",
    desc: "LOD 500 represents the highest level of detail, capturing actual installed elements and accurate as-built conditions. It includes precise geometry, product data, and operational information.",
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

const ProductSelection: React.FC<{ heading?: string }> = ({
  heading = "Key Deliverables",
}) => {
  const [expandedId, setExpandedId] = useState<number>(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });
  const [animateCards, setAnimateCards] = useState(false);

  const params = useParams();
  const { id } = params;

  let productList = products;

  if (Number(id) === 0) {
    productList = whyQTO;
  } else if (Number(id) === 3) {
    productList = productsBIM;
  }

  useEffect(() => {
    setAnimateCards(isInView);
  }, [isInView]);

  const handleCardClick = (id: number) => setExpandedId(id);

  return (
    <div ref={sectionRef} className={styles.container}>
      <h2 className={styles.title}>{heading}</h2>

      <div className={styles.grid}>
        {/* Left Column - Stacked Cards */}
        <div className={styles.leftColumn}>
          <div className={styles.cardsStack}>
            {productList.map((product, index) => {
              const isExpanded = expandedId === product.id;

              return (
                <motion.div
                  key={product.id}
                  className={styles.card}
                  style={{
                    zIndex: isExpanded ? 50 : products.length - index,
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
            <p>{productList[expandedId - 1].desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;

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
