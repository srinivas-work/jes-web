"use client";

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProductSelection from "@/components/PageComponents/ServicePage/ProductSelection/ProductSelection";
import ServiceSteps from "@/components/PageComponents/ServicePage/ServiceSteps/ServiceSteps";
import JesLogoMove from "@/components/TriangleMove/JesLogoMove";
import VideoPlayer from "@/components/UI/VideoPlayer/VideoPlayer";
import { useLenis } from "@/utils/hooks/useLenis";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import styles from "./Services.module.css";
import OurApproach from "@/components/PageComponents/ServicePage/OurApproach/OurApproach";

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

  // return (
  //   <svg
  //     id="Layer_1"
  //     xmlns="http://www.w3.org/2000/svg"
  //     version="1.1"
  //     viewBox="0 0 1942.2 1913.1"
  //   >
  //     <path
  //       className="st0"
  //       style={{ fill: "#a91e2d" }}
  //       d="M883.8,875.2V201h100.9c100.9,0,198.2,33.7,275.6,95.2,77.1,61.4,129.3,146.7,147,241.2h176.9c-17.8-138.5-87.7-266-196.8-358.7-109.8-93.1-251.1-145.3-397.5-146.3h-282.4v842.9h176.2Z"
  //     />
  //     <path
  //       className="st0"
  //       style={{ fill: "#a91e2d" }}
  //       d="M883.8,1051.4H209.6v-100.9c0-100.9,33.7-198.2,95.2-275.6,61.4-77.1,146.7-129.3,241.2-147v-176.9c-138.5,17.8-266,87.7-358.7,196.8-93.1,109.8-145.3,251.1-146.3,397.5v282.4h842.9v-176.2Z"
  //     />
  //     <path
  //       className="st0"
  //       style={{ fill: "#a91e2d" }}
  //       d="M1059.9,1051.4v674.2h-100.9c-100.9,0-198.2-33.7-275.6-95.2-77.1-61.4-129.3-146.7-147-241.2h-176.9c17.8,138.5,87.7,266,196.8,358.7,109.8,93.1,251.1,145.3,397.5,146.3h282.4v-842.9h-176.2Z"
  //     />
  //     <path
  //       className="st0"
  //       style={{ fill: "#a91e2d" }}
  //       d="M1059.9,875.2h674.2v100.9c0,100.9-33.7,198.2-95.2,275.6-61.4,77.1-146.7,129.3-241.2,147v176.9c138.5-17.8,266-87.7,358.7-196.8,93.1-109.8,145.3-251.1,146.3-397.5v-282.4h-842.9v176.2Z"
  //     />
  //   </svg>
  // );

  //return <JesLogoMove />;

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
      <Header />
      <h2>Comprehensive KPO Solutions for Your Success</h2>
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
      <Footer />
    </div>
  );
};

export default Services;
