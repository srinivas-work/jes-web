"use client";

import OurApproach from "@/components/PageComponents/ServicePage/OurApproach/OurApproach";
import ProductSelection from "@/components/PageComponents/ServicePage/ProductSelection/ProductSelection";
import ServiceSteps from "@/components/PageComponents/ServicePage/ServiceSteps/ServiceSteps";
import VideoPlayer from "@/components/UI/VideoPlayer/VideoPlayer";
import { serviceSections } from "@/utils/data/dummyData";
import { useLenis } from "@/utils/hooks/useLenis";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef } from "react";
import styles from "./Services.module.css";

function VideoSection() {
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
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.7], [0, 1]);
  // const textY = useTransform(scrollYProgress, [0.3, 0.8], [50, -280]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [50, -280]);
  const textScaleY = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

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

        <motion.p
          className={styles.serviceDetails}
          style={{
            //opacity: textOpacity,
            y: textY,
            scaleY: textScaleY,
            transformOrigin: "top",
          }}
        >
          We’ve combined the precision, creativity, and innovation of our
          U.S.-based engineering expertise with the deep, industry-specific
          knowledge and technical excellence of our 200+ professional engineers
          across India and Qatar. This powerful synergy enables us to deliver
          high-performance design, documentation, and engineering solutions that
          meet global standards while remaining cost-efficient and agile. Our
          integrated global team works as an extension of your in-house
          resources — seamlessly managing your engineering and design workloads
          with unmatched accuracy, efficiency, and scalability. From concept
          development and detailed design to validation and documentation, we
          ensure every stage of your project is executed with meticulous
          attention to quality and technical excellence. By entrusting us with
          your most complex design and documentation needs, your organization
          gains more.
        </motion.p>
      </div>
    </div>
  );
}

const Services = () => {
  useLenis();

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
      <h2 className={styles.videoTitle}>{serviceSections[0].title}</h2>
      <VideoSection />
      {/* <VideoPlayer />
      <p className={styles.serviceDetails}>
        We’ve combined the precision, creativity, and innovation of our
        U.S.-based engineering expertise with the deep, industry-specific
        knowledge and technical excellence of our 200+ professional engineers
        across India and Qatar. This powerful synergy enables us to deliver
        high-performance design, documentation, and engineering solutions that
        meet global standards while remaining cost-efficient and agile.Our
        integrated global team works as an extension of your in-house resources
        — seamlessly managing your engineering and design workloads with
        unmatched accuracy, efficiency, and scalability. From concept
        development and detailed design to validation and documentation, we
        ensure every stage of your project is executed with meticulous attention
        to quality and technical excellence. By entrusting us with your most
        complex design and documentation needs, your organization gains more.
      </p> */}
      <ServiceSteps />
      <ProductSelection />
      <OurApproach />
    </div>
  );
};

export default Services;
