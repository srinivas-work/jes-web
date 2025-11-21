"use client";

import { SolutionCard } from "@/app/solutions/page";
import FlipBookViewer from "@/components/FlipBookViewer/FlipBookViewer";
import FAQSection from "@/components/PageComponents/HomePage/FAQSection/FAQSection";
import KeyDeliverables from "@/components/PageComponents/ServicePage/KeyDeliverables/KeyDeliverables";
import ServiceSteps from "@/components/PageComponents/ServicePage/ServiceSteps/ServiceSteps";
import LaptopViewer from "@/components/ThreeD/LaptopViewer/LaptopViewer";
import { serviceSections } from "@/utils/data/dummyData";
import { splitText } from "@/utils/helperFunctions";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { useLenis } from "@/utils/hooks/useLenis";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./ServiceItem.module.css";
import ReadyScale from "@/components/ReadyScale/ReadyScale";

//

const ServiceItem = () => {
  useLenis();

  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [isDocClicked, setIsDocClicked] = useState(false);

  const selectedService = serviceSections[Number(id)];

  const isPhoneScreen = useIsPhoneScreen();

  const { text1: headingPart1, text2: headingPart2 } = splitText(
    selectedService.title
  );

  return (
    <div className={styles.servicePage}>
      {!isPhoneScreen && (
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
      )}
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
      <KeyDeliverables />
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
              width: isPhoneScreen ? "90%" : "80%",
              display: "flex",
              gap: isPhoneScreen ? "1rem" : "var(--spacing)",
              justifyContent: "center",
            }}
          >
            {selectedService.toolsUsed.map((t, i) => (
              <div
                key={i}
                style={{
                  maxWidth: "15rem",
                  backgroundColor: "#efeeee",
                  padding: isPhoneScreen ? "0.7rem" : "1rem 2rem",
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
          {selectedService.extraDetails?.map((solution, index) => {
            let url =
              Number(id) === 0 && !solution.caseStudy
                ? "https://jesi.jerseyeng.com/"
                : "";

            return (
              <SolutionCard
                key={index}
                solution={solution}
                index={index}
                hideId
                destinationUrl={url}
              />
            );
          })}
        </section>
      )}
      <FAQSection />
      {/* <OurApproach /> */}

      <ReadyScale
        desc={`Let us discuss how our ${selectedService.title} Solutions can
            transform your engineering workflow`}
      />
      <FlipBookViewer
        isClicked={isDocClicked}
        onClose={() => setIsDocClicked(false)}
        pdfUrl={selectedService.pdfLink}
      />
      <button
        className={styles.brochureBtn}
        onClick={() => setIsDocClicked(true)}
      >
        <img src="/icons/doc.svg" />
        View Brochure
      </button>
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
