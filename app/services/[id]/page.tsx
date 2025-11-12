"use client";

import { SolutionCard } from "@/app/solutions/page";
import FAQSection from "@/components/PageComponents/HomePage/FAQSection/FAQSection";
import ProductSelection from "@/components/PageComponents/ServicePage/ProductSelection/ProductSelection";
import ServiceSteps from "@/components/PageComponents/ServicePage/ServiceSteps/ServiceSteps";
import LaptopViewer from "@/components/ThreeD/LaptopViewer/LaptopViewer";
import { serviceSections } from "@/utils/data/dummyData";
import { splitText } from "@/utils/helperFunctions";
import { useLenis } from "@/utils/hooks/useLenis";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import styles from "./ServiceItem.module.css";

//

const ServiceItem = () => {
  useLenis();

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const selectedService = serviceSections[Number(id)];

  const { text1: headingPart1, text2: headingPart2 } = splitText(
    selectedService.title
  );

  return (
    <div className={styles.servicePage}>
      <div className={styles.bgImageContainerOne}>
        <Image
          className={styles.bgImageOne}
          src={"/img/jes_curve.png"}
          alt="JES Engineering"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>
      <div className={styles.bgImageContainerTwo}>
        <Image
          className={styles.bgImageTwo}
          src={"/img/jes_curve_detailed.png"}
          alt="JES Engineering"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>
      {/* <h2 className={styles.videoTitle}>{selectedService.title}</h2> */}
      <LaptopViewer
        text1={headingPart1}
        text2={headingPart2}
        imgLink={selectedService.image}
        selectedService={selectedService}
      />
      {/* <VideoSection id={Number(id)} /> */}
      {selectedService.subServices && (
        <ServiceSteps subServiceItem={selectedService.subServices} />
      )}
      <ProductSelection />
      {selectedService.toolsUsed && (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3rem",
            marginTop: "-2rem",
            marginBottom: "4rem",
          }}
        >
          <h2>Tools Used</h2>
          <div
            style={{
              width: "80%",
              display: "flex",
              gap: "var(--spacing)",
              justifyContent: "center",
            }}
          >
            {selectedService.toolsUsed.map((t, i) => (
              <div
                key={i}
                style={{
                  maxWidth: "15rem",
                  backgroundColor: "#efeeee",
                  padding: "1rem 2rem",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "2rem",
                }}
              >
                <img src={t} style={{ width: "100%", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedService.extraDetails && (
        <section className={styles.extrasSection}>
          {selectedService.extraDetails?.map((solution, index) => (
            <SolutionCard
              key={index}
              solution={solution}
              index={index}
              hideId
              destinationUrl={
                Number(id) === 0 ? "https://jesi.jerseyeng.com/" : ""
              }
            />
          ))}
        </section>
      )}
      <FAQSection />
      {/* <OurApproach /> */}
      <motion.section
        className={styles.serviceCtaSection}
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
          <h2>Ready to Scale Your Business?</h2>
          <p>
            Let us discuss how our {selectedService.title} Solutions can
            transform your engineering workflow
          </p>
          <motion.button
            className={styles.primaryButton}
            whileHover={{
              y: -4,
              boxShadow: "0 8px 24px rgba(169, 30, 45, 0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push("/contact")}
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default ServiceItem;

//const VideoSection: React.FC<{ id: number }> = ({ id }) => {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"],
//   });

//   // As user scrolls, video squishes and moves upward
//   const scaleY = useTransform(scrollYProgress, [0, 0.6], [1, 0.8]);
//   // const translateY = useTransform(scrollYProgress, [0.4, 1], [0, -150]);
//   const translateY = useTransform(scrollYProgress, [0, 0.6], [0, -150]);

//   // Text fades and moves upward smoothly
//   // const textOpacity = useTransform(scrollYProgress, [0.25, 0.7], [0, 1]);
//   // const textY = useTransform(scrollYProgress, [0.3, 0.8], [50, -280]);
//   const textY = useTransform(scrollYProgress, [0, 0.6], [50, -280]);
//   const textScaleY = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

//   const getDescription = () => {
//     if (Array.isArray(serviceSections[id].description)) {
//       return (
//         <>
//           {serviceSections[id].description.map((item, index) => (
//             <p key={index}>{item}</p>
//           ))}
//         </>
//       );
//     }

//     return <p>{serviceSections[id].description}</p>;
//   };

//   return (
//     <div ref={containerRef} className={styles.outerContainer}>
//       <div className={styles.stickyContainer}>
//         <motion.div
//           style={{
//             scaleY,
//             y: translateY,
//             transformOrigin: "top",
//           }}
//           transition={{ type: "spring", stiffness: 80, damping: 20 }}
//         >
//           <VideoPlayer />
//         </motion.div>

//         <motion.div
//           className={styles.serviceDetails}
//           style={{
//             //opacity: textOpacity,
//             y: textY,
//             scaleY: textScaleY,
//             transformOrigin: "top",
//           }}
//         >
//           {getDescription()}
//         </motion.div>
//       </div>
//     </div>
//   );
// };
