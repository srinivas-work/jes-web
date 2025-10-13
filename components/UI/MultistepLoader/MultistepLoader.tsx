// "use client";

// import { AnimatePresence, motion } from "motion/react";
// import { useEffect, useState } from "react";
// import styles from "./MultiStepLoader.module.css";
// import clsx from "clsx";
// import { twMerge } from "tailwind-merge";

// function cn(...inputs: any[]) {
//   return twMerge(clsx(inputs));
// }

// const CheckIcon = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     strokeWidth={1.5}
//     stroke="currentColor"
//     className={cn(styles.icon, className)}
//   >
//     <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//   </svg>
// );

// const CheckFilled = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     className={cn(styles.icon, className)}
//   >
//     <path
//       fillRule="evenodd"
//       d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// type LoadingState = { text: string };

// const LoaderCore = ({
//   loadingStates,
//   value = 0,
// }: {
//   loadingStates: LoadingState[];
//   value?: number;
// }) => {
//   return (
//     <div className={styles.loaderCore}>
//       {loadingStates.map((loadingState, index) => {
//         const distance = Math.abs(index - value);
//         const opacity = Math.max(1 - distance * 0.2, 0);

//         return (
//           <motion.div
//             key={index}
//             className={styles.stepRow}
//             initial={{ opacity: 0, y: -(value * 40) }}
//             animate={{ opacity, y: -(value * 40) }}
//             transition={{ duration: 0.5 }}
//           >
//             <div className={styles.iconWrapper}>
//               {index > value && <CheckIcon className={styles.iconInactive} />}
//               {index <= value && (
//                 <CheckFilled
//                   className={cn(
//                     styles.iconActive,
//                     value === index && styles.iconCurrent
//                   )}
//                 />
//               )}
//             </div>
//             <span
//               className={cn(
//                 styles.text,
//                 value === index && styles.textCurrent
//               )}
//             >
//               {loadingState.text}
//             </span>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// export const MultiStepLoader = ({
//   loadingStates,
//   loading,
//   duration = 2000,
//   loop = true,
// }: {
//   loadingStates: LoadingState[];
//   loading?: boolean;
//   duration?: number;
//   loop?: boolean;
// }) => {
//   const [currentState, setCurrentState] = useState(0);

//   useEffect(() => {
//     if (!loading) {
//       setCurrentState(0);
//       return;
//     }

//     const timeout = setTimeout(() => {
//       setCurrentState((prev) =>
//         loop
//           ? prev === loadingStates.length - 1
//             ? 0
//             : prev + 1
//           : Math.min(prev + 1, loadingStates.length - 1)
//       );
//     }, duration);

//     return () => clearTimeout(timeout);
//   }, [currentState, loading, loop, loadingStates.length, duration]);

//   return (
//     <AnimatePresence mode="wait">
//       {loading && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className={styles.overlay}
//         >
//           <div className={styles.loaderContainer}>
//             <LoaderCore value={currentState} loadingStates={loadingStates} />
//           </div>
//           <div className={styles.gradientOverlay} />
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };
