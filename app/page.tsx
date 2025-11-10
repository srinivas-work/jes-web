"use client";

import FAQ from "@/components/FAQ/FAQ";
import JesLogoDetails from "@/components/JesLogoMove/JesLogoDetails/JesLogoDetails";
import IndustryHighlights from "@/components/PageComponents/HomePage/IndustryHighlights/IndustryHighlights";
import ServiceScrollShowcase from "@/components/PageComponents/HomePage/ServiceScrollShowcase/ServiceScrollShowcase";
import StatsBar from "@/components/PageComponents/HomePage/StatsBar/StatsBar";
import TestimonialCarouselReel from "@/components/PageComponents/HomePage/TestimonialCarouselReel/TestimonialCarouselReel";
import CloudField from "@/components/ThreeD/CloudField";
import GrowthPath3D from "@/components/ThreeD/GrowthPath3D/GrowthPath3D";
import GrowthCubes3D from "@/components/ThreeD/PortalCards/GrowthCubes3D";
import ServiceScrollStackPhone from "@/components/UI/ServiceScrollStackPhone/ServiceScrollStackPhone";
import { faq, testimonials } from "@/utils/data/dummyData";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { useLenis } from "@/utils/hooks/useLenis";
import { Text, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import styles from "./page.module.css";
import BruceSpotlight from "@/components/PageComponents/AboutPage/AboutAccordion/BruceSpotlight/BruceSpotlight";
import WhyChooseUs from "@/components/PageComponents/AboutPage/AboutAccordion/WhyChooseUs/WhyChooseUs";
import ProcessDetails from "@/components/PageComponents/HomePage/ProcessDetails/ProcessDetails";
import Image from "next/image";
import MissionVision from "@/components/PageComponents/AboutPage/AboutAccordion/MissionVision/MissionVision";

function Building() {
  const tex = useTexture("/img/modern-building.png");

  // const { position, rotation } = useControls("Building", {
  //   position: {
  //     value: [0, -1.7, 0],
  //     step: 0.1,
  //   },
  //   rotation: {
  //     value: [0, 0, 0],
  //     step: 0.1,
  //   },
  // });

  return (
    <mesh position={[0, -1.7, 0]}>
      <planeGeometry args={[6.5, 6.5]} />
      <meshBasicMaterial map={tex} transparent side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Home() {
  useLenis();

  const isPhoneScreen = useIsPhoneScreen();

  //return <MissionVision />;

  return (
    <div>
      {/* <div className={styles.buildingImgContainer}>
        <img src={"/img/modern-building.png"} alt="JES Building" />
      </div> */}
      {/* <h1
        style={{
          fontWeight: 300,
          fontSize: "10rem",
          letterSpacing: "5rem",
          color: "#a91e29",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,0)",
          zIndex: 1,
        }}
      >
        SCALE
      </h1> */}
      <Canvas
        className={styles.canvas}
        style={{ width: "100vw", height: "100vh" }}
        //frameloop="demand"
        //camera={{ fov: 30, near: 1, far: 10000, position: [0, 0, 6000] }}
        //camera={{ fov: 30, near: 1, far: 3000, position: [0, 0, 6000] }}
        // style={{ background: "linear-gradient(#1e4877, #4584b4)" }}
        //style={{ background: "linear-gradient(#ffffff, #b0cbe9)" }}
      >
        <Suspense fallback={null}>
          <Text
            position={[0, 2.5, -1]}
            fontSize={0.5}
            color="#a91e29"
            anchorX="center"
            anchorY="middle"
            maxWidth={500}
            letterSpacing={0.2}
            font="/fonts/PlusJakartaSans-Regular.ttf"
          >
            We help you
          </Text>
          <Text
            position={[0, 1.1, -1]}
            fontSize={1.7}
            color="#a91e29"
            anchorX="center"
            anchorY="middle"
            maxWidth={500}
            letterSpacing={1.1}
            font="/fonts/PlusJakartaSans-Light.ttf"
          >
            SCALE
          </Text>
          <Building />
          <CloudField />
        </Suspense>
      </Canvas>
      <StatsBar />
      {!isPhoneScreen && <ServiceScrollShowcase />}
      {isPhoneScreen && <ServiceScrollStackPhone />}
      {/* <AboutDetails /> */}
      <JesLogoDetails />
      {/* <GrowthCubes3D /> */}
      <GrowthPath3D />
      {/* <ProcessDetails /> */}
      <IndustryHighlights />
      <div
        style={{
          margin: "8rem auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4rem",
        }}
      >
        <h2>Frequently Asked Questions</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {!!faq &&
            faq.map((item, i) => {
              return <FAQ data={item} key={i} />;
            })}
        </div>
      </div>
      <TestimonialCarouselReel cardSpacing={420} testimonials={testimonials} />
    </div>
  );
}

//  return (
//     <mesh position={[0, -150, 1000]}>

//       <planeGeometry args={[300, 420]} />
//       <meshBasicMaterial map={tex} transparent side={THREE.DoubleSide} />
//     </mesh>
//   );
