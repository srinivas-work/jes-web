"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Solutions.module.css";
import { useLenis } from "@/utils/hooks/useLenis";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

type SolutionType = {
  id: number;
  title: string;
  description: string;
  services: string[];
  image: string;
};

const solutions: SolutionType[] = [
  {
    id: 1,
    title: "For Manufacturer Reps",
    description:
      "Transform your vision into reality with our comprehensive architectural BIM services. We create detailed 3D models that enable seamless coordination between all stakeholders.",
    services: [
      "Quantity Take-off",
      "Product Selections",
      "Quotes & Submittals",
      "Spec Review",
      "Component Modelling & Assemblies",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
  },
  {
    id: 2,
    title: "Structural Engineering",
    description:
      "Optimize structural systems with precision BIM modeling and analysis. Our team delivers accurate structural models that integrate seamlessly with architectural and MEP systems.",
    services: [
      "Structural BIM Modeling",
      "Rebar Detailing",
      "Connection Design",
      "Load Analysis Integration",
    ],
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
  },
  {
    id: 3,
    title: "MEP Engineering",
    description:
      "Streamline mechanical, electrical, and plumbing systems with intelligent BIM coordination. We ensure all building systems work harmoniously, identifying conflicts before construction begins.",
    services: [
      "MEP Coordination",
      "HVAC System Design",
      "Electrical Layout",
      "Plumbing & Fire Protection",
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
  },
  {
    id: 4,
    title: "Infrastructure & Civil",
    description:
      "Deliver large-scale infrastructure projects with advanced civil BIM solutions. From highways to bridges, our models provide comprehensive insights for better planning and design.",
    services: [
      "Road & Highway Design",
      "Bridge Engineering",
      "Site Development",
      "Grading & Drainage",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
  },
  {
    id: 5,
    title: "Facility Management",
    description:
      "Maximize operational efficiency with BIM-enabled facility management solutions. We create digital twins that provide real-time insights into building performance and maintenance.",
    services: [
      "Asset Information Modeling",
      "Maintenance Planning",
      "Space Management",
      "Energy Analysis",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  },
  {
    id: 6,
    title: "Construction Management",
    description:
      "Enhance project delivery with 4D and 5D BIM solutions. We provide construction sequencing, cost estimation, and progress tracking to keep your projects on time and within budget.",
    services: [
      "4D Scheduling",
      "5D Cost Estimation",
      "Progress Monitoring",
      "Site Logistics Planning",
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
  },
];

const SolutionCard: React.FC<{ solution: SolutionType; index: number }> = ({
  solution,
  index,
}) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.solutionCard} ${isEven ? styles.even : styles.odd}`}
      style={{ opacity, y }}
    >
      <div className={styles.cardContent}>
        <motion.div className={styles.imageWrapper} style={{ rotate }}>
          <div className={styles.imageContainer}>
            <motion.img
              src={solution.image}
              alt={solution.title}
              className={styles.image}
              style={{ y: imageY, scale: imageScale }}
            />
            <div className={styles.imageOverlay} />
          </div>
        </motion.div>

        <div className={styles.textContent}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className={styles.numberBadge}
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
              viewport={{ once: true }}
            >
              {String(index + 1).padStart(2, "0")}
            </motion.div>
            <h2 className={styles.title}>{solution.title}</h2>
            <p className={styles.description}>{solution.description}</p>

            <div className={styles.servicesList}>
              {solution.services.map((service, idx) => (
                <motion.div
                  key={idx}
                  className={styles.serviceItem}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + idx * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                >
                  <motion.svg
                    className={styles.checkIcon}
                    viewBox="0 0 20 20"
                    fill="none"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <path
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      fill="currentColor"
                    />
                  </motion.svg>
                  <span>{service}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className={styles.ctaButton}
              whileHover={{ x: 8 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Solution
              <svg className={styles.arrow} viewBox="0 0 20 20" fill="none">
                <path
                  d="M7 3l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Solutions = () => {
  useLenis();
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: containerProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.95]);

  // Floating background elements
  const float1Y = useTransform(containerProgress, [0, 1], [0, -400]);
  const float1Rotate = useTransform(containerProgress, [0, 1], [0, 120]);

  const float2Y = useTransform(containerProgress, [0, 1], [0, -600]);
  const float2Rotate = useTransform(containerProgress, [0, 1], [0, -90]);

  const float3Y = useTransform(containerProgress, [0, 1], [100, -300]);
  const float3Rotate = useTransform(containerProgress, [0, 1], [0, 180]);

  const float4Y = useTransform(containerProgress, [0, 1], [200, -500]);
  const float4Rotate = useTransform(containerProgress, [0, 1], [0, -120]);

  return (
    <div className={styles.container} ref={containerRef}>
      <Header />
      {/* Floating Background Elements */}
      <motion.div
        className={styles.floatingBg1}
        style={{ y: float1Y, rotate: float1Rotate }}
      >
        <img src="/img/jes_curve.png" alt="" />
      </motion.div>

      <motion.div
        className={styles.floatingBg2}
        style={{ y: float2Y, rotate: float2Rotate }}
      >
        <img src="/img/jes_curve_detailed.png" alt="" />
      </motion.div>

      <motion.div
        className={styles.floatingBg3}
        style={{ y: float3Y, rotate: float3Rotate }}
      >
        <img src="/img/jes_curve.png" alt="" />
      </motion.div>

      <motion.div
        className={styles.floatingBg4}
        style={{ y: float4Y, rotate: float4Rotate }}
      >
        <img src="/img/jes_curve_detailed.png" alt="" />
      </motion.div>

      <motion.section
        ref={heroRef}
        className={styles.hero}
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
      >
        <img
          src={
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80"
          }
          alt="JES BG"
          className={styles.solutionBgImage}
        />
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Engineering Solutions
          </motion.div>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Precision-Driven BIM Services
          </motion.h1>
          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Empowering every discipline with intelligent modeling, seamless
            coordination, and innovative solutions that transform the way you
            build.
          </motion.p>
        </motion.div>
      </motion.section>

      <section className={styles.solutionsSection}>
        {solutions.map((solution, index) => (
          <SolutionCard key={solution.id} solution={solution} index={index} />
        ))}
      </section>

      <motion.section
        className={styles.cta}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <h2>Ready to Elevate Your Projects?</h2>
          <p>
            Let us discuss how our BIM solutions can transform your engineering
            workflow
          </p>
          <motion.button
            className={styles.primaryButton}
            whileHover={{
              y: -4,
              boxShadow: "0 8px 24px rgba(169, 30, 45, 0.35)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default Solutions;

// "use client";

// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import styles from "./Solutions.module.css";
// import { useLenis } from "@/utils/hooks/useLenis";

// type SolutionType = {
//   id: number;
//   title: string;
//   description: string;
//   services: string[];
//   image: string;
//   color: string;
// };

// const solutions: SolutionType[] = [
//   {
//     id: 1,
//     title: "Architectural Design",
//     description:
//       "Transform your vision into reality with our comprehensive architectural BIM services. We create detailed 3D models that enable seamless coordination between all stakeholders, ensuring design intent is maintained throughout the project lifecycle.",
//     services: [
//       "3D Modeling & Visualization",
//       "Clash Detection & Resolution",
//       "Design Development Support",
//       "As-Built Documentation",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
//     color: "#2563eb",
//   },
//   {
//     id: 2,
//     title: "Structural Engineering",
//     description:
//       "Optimize structural systems with precision BIM modeling and analysis. Our team delivers accurate structural models that integrate seamlessly with architectural and MEP systems, reducing conflicts and construction delays.",
//     services: [
//       "Structural BIM Modeling",
//       "Rebar Detailing",
//       "Connection Design",
//       "Load Analysis Integration",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
//     color: "#dc2626",
//   },
//   {
//     id: 3,
//     title: "MEP Engineering",
//     description:
//       "Streamline mechanical, electrical, and plumbing systems with intelligent BIM coordination. We ensure all building systems work harmoniously, identifying conflicts before construction begins and optimizing installation sequences.",
//     services: [
//       "MEP Coordination",
//       "HVAC System Design",
//       "Electrical Layout",
//       "Plumbing & Fire Protection",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
//     color: "#059669",
//   },
//   {
//     id: 4,
//     title: "Infrastructure & Civil",
//     description:
//       "Deliver large-scale infrastructure projects with advanced civil BIM solutions. From highways to bridges, our models provide comprehensive insights for better planning, design, and construction management.",
//     services: [
//       "Road & Highway Design",
//       "Bridge Engineering",
//       "Site Development",
//       "Grading & Drainage",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1596637144845-689284b6aa14?w=800&q=80",
//     color: "#7c3aed",
//   },
//   {
//     id: 5,
//     title: "Facility Management",
//     description:
//       "Maximize operational efficiency with BIM-enabled facility management solutions. We create digital twins that provide real-time insights into building performance, maintenance schedules, and asset management.",
//     services: [
//       "Asset Information Modeling",
//       "Maintenance Planning",
//       "Space Management",
//       "Energy Analysis",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
//     color: "#ea580c",
//   },
//   {
//     id: 6,
//     title: "Construction Management",
//     description:
//       "Enhance project delivery with 4D and 5D BIM solutions. We provide construction sequencing, cost estimation, and progress tracking to keep your projects on time and within budget.",
//     services: [
//       "4D Scheduling",
//       "5D Cost Estimation",
//       "Progress Monitoring",
//       "Site Logistics Planning",
//     ],
//     image:
//       "https://images.unsplash.com/photo-1590496793907-4bebe2850a7e?w=800&q=80",
//     color: "#0891b2",
//   },
// ];

// const SolutionCard: React.FC<{ solution: SolutionType; index: number }> = ({
//   solution,
//   index,
// }) => {
//   const cardRef = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: cardRef,
//     offset: ["start end", "end start"],
//   });

//   const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
//   const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
//   const scale = useTransform(
//     scrollYProgress,
//     [0, 0.3, 0.7, 1],
//     [0.8, 1, 1, 0.8]
//   );

//   const isEven = index % 2 === 0;

//   return (
//     <motion.div
//       ref={cardRef}
//       className={`${styles.solutionCard} ${isEven ? styles.even : styles.odd}`}
//       style={{ opacity, scale }}
//     >
//       <div className={styles.cardContent}>
//         <motion.div className={styles.imageWrapper} style={{ y: imageY }}>
//           <img
//             src={solution.image}
//             alt={solution.title}
//             className={styles.image}
//           />
//           <div
//             className={styles.imageOverlay}
//             style={{
//               background: `linear-gradient(135deg, ${solution.color}dd, ${solution.color}aa)`,
//             }}
//           />
//         </motion.div>

//         <div className={styles.textContent}>
//           <motion.div
//             initial={{ opacity: 0, x: isEven ? -50 : 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             viewport={{ once: true }}
//           >
//             <div
//               className={styles.numberBadge}
//               style={{ backgroundColor: solution.color }}
//             >
//               {String(index + 1).padStart(2, "0")}
//             </div>
//             <h2 className={styles.title}>{solution.title}</h2>
//             <p className={styles.description}>{solution.description}</p>

//             <div className={styles.servicesList}>
//               {solution.services.map((service, idx) => (
//                 <motion.div
//                   key={idx}
//                   className={styles.serviceItem}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
//                   viewport={{ once: true }}
//                 >
//                   <div
//                     className={styles.serviceDot}
//                     style={{ backgroundColor: solution.color }}
//                   />
//                   <span>{service}</span>
//                 </motion.div>
//               ))}
//             </div>

//             <motion.button
//               className={styles.ctaButton}
//               style={{ backgroundColor: solution.color }}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Learn More
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const Solutions = () => {
//   useLenis();

//   const heroRef = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"],
//   });

//   const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

//   return (
//     <div className={styles.container}>
//       <motion.section
//         ref={heroRef}
//         className={styles.hero}
//         style={{ y: heroY, opacity: heroOpacity }}
//       >
//         <motion.h1
//           className={styles.heroTitle}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Engineering Excellence
//         </motion.h1>
//         <motion.p
//           className={styles.heroSubtitle}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//         >
//           Comprehensive BIM solutions tailored for every discipline
//         </motion.p>
//       </motion.section>

//       <section className={styles.solutionsSection}>
//         {solutions.map((solution, index) => (
//           <SolutionCard key={solution.id} solution={solution} index={index} />
//         ))}
//       </section>

//       <motion.section
//         className={styles.cta}
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         viewport={{ once: true }}
//       >
//         <h2>Ready to Transform Your Projects?</h2>
//         <p>
//           Let's discuss how our BIM solutions can elevate your engineering
//           practice
//         </p>
//         <motion.button
//           className={styles.primaryButton}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//         >
//           Contact Us Today
//         </motion.button>
//       </motion.section>
//     </div>
//   );
// };

// export default Solutions;
