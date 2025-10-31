"use client";

import OurApproach from "@/components/PageComponents/ServicePage/OurApproach/OurApproach";
import ProductSelection from "@/components/PageComponents/ServicePage/ProductSelection/ProductSelection";
import ServiceSteps from "@/components/PageComponents/ServicePage/ServiceSteps/ServiceSteps";
import VideoPlayer from "@/components/UI/VideoPlayer/VideoPlayer";
import {
  energyModellingSolutions,
  serviceSections,
  solutions,
} from "@/utils/data/dummyData";
import { useLenis } from "@/utils/hooks/useLenis";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef } from "react";
import styles from "./ServiceItem.module.css";
import { SolutionCard } from "@/app/solutions/page";

const VideoSection: React.FC<{ id: number }> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // As user scrolls, video squishes and moves upward
  const scaleY = useTransform(scrollYProgress, [0, 0.6], [1, 0.8]);
  // const translateY = useTransform(scrollYProgress, [0.4, 1], [0, -150]);
  const translateY = useTransform(scrollYProgress, [0, 0.6], [0, -150]);

  // Text fades and moves upward smoothly
  // const textOpacity = useTransform(scrollYProgress, [0.25, 0.7], [0, 1]);
  // const textY = useTransform(scrollYProgress, [0.3, 0.8], [50, -280]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [50, -280]);
  const textScaleY = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  const getDescription = () => {
    if (Array.isArray(serviceSections[id].description)) {
      return (
        <>
          {serviceSections[id].description.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </>
      );
    }

    return <p>{serviceSections[id].description}</p>;
  };

  return (
    <div ref={containerRef} className={styles.outerContainer}>
      <div className={styles.stickyContainer}>
        <motion.div
          style={{
            scaleY,
            y: translateY,
            transformOrigin: "top",
          }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <VideoPlayer />
        </motion.div>

        <motion.div
          className={styles.serviceDetails}
          style={{
            //opacity: textOpacity,
            y: textY,
            scaleY: textScaleY,
            transformOrigin: "top",
          }}
        >
          {getDescription()}
        </motion.div>
      </div>
    </div>
  );
};

const ServiceItem = () => {
  useLenis();

  const params = useParams();
  const { id } = params;

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
      <h2 className={styles.videoTitle}>{serviceSections[Number(id)].title}</h2>
      <VideoSection id={Number(id)} />
      <ServiceSteps subServiceItem={serviceSections[Number(id)].subServices} />
      <ProductSelection />

      {id === "7" && (
        <section className={styles.solutionsSection}>
          {energyModellingSolutions.map((solution, index) => (
            <SolutionCard key={solution.id} solution={solution} index={index} />
          ))}
        </section>
      )}
      <OurApproach />
    </div>
  );
};

export default ServiceItem;
