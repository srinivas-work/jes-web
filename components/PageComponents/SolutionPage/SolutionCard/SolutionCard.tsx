// import { SolutionType } from "@/utils/types";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";
// import styles from "./SolutionCard.module.css";

// const SolutionCard: React.FC<{ solution: SolutionType; index: number }> = ({
//   solution,
//   index,
// }) => {
//   const cardRef = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: cardRef,
//     offset: ["start end", "end start"],
//   });

//   const imageY = useTransform(scrollYProgress, [0, 1], [180, -180]);
//   const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
//   const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
//   const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -50]);
//   const rotate = useTransform(scrollYProgress, [0, 1], [2, -2]);

//   const isEven = index % 2 === 0;

//   return (
//     <motion.div
//       ref={cardRef}
//       className={`${styles.solutionCard} ${isEven ? styles.even : styles.odd}`}
//       style={{ opacity, y }}
//     >
//       <div className={styles.cardContent}>
//         <motion.div className={styles.imageWrapper} style={{ rotate }}>
//           <div className={styles.imageContainer}>
//             <motion.img
//               src={solution.image}
//               alt={solution.title}
//               className={styles.image}
//               style={{ y: imageY, scale: imageScale }}
//             />
//             <div className={styles.imageOverlay} />
//           </div>
//         </motion.div>

//         <div className={styles.textContent}>
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//             viewport={{ once: true, margin: "-100px" }}
//           >
//             <motion.div
//               className={styles.numberBadge}
//               initial={{ scale: 0, rotate: -180 }}
//               whileInView={{ scale: 1, rotate: 0 }}
//               transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
//               viewport={{ once: true }}
//             >
//               {String(index + 1).padStart(2, "0")}
//             </motion.div>
//             <h2 className={styles.title}>{solution.title}</h2>
//             <p className={styles.description}>{solution.description}</p>

//             <div className={styles.servicesList}>
//               {solution.services.map((service, idx) => (
//                 <motion.div
//                   key={idx}
//                   className={styles.serviceItem}
//                   initial={{ opacity: 0, x: -30 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   transition={{
//                     duration: 0.6,
//                     delay: 0.2 + idx * 0.1,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                   viewport={{ once: true }}
//                 >
//                   <motion.svg
//                     className={styles.checkIcon}
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     initial={{ scale: 0 }}
//                     whileInView={{ scale: 1 }}
//                     transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
//                     viewport={{ once: true }}
//                   >
//                     <path
//                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       fill="currentColor"
//                     />
//                   </motion.svg>
//                   <span>{service}</span>
//                 </motion.div>
//               ))}
//             </div>

//             <motion.button
//               className={styles.ctaButton}
//               whileHover={{ x: 8 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               Explore Solution
//               <svg className={styles.arrow} viewBox="0 0 20 20" fill="none">
//                 <path
//                   d="M7 3l7 7-7 7"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </motion.button>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default SolutionCard;
