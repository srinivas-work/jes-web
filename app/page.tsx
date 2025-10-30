"use client";

import FAQ from "@/components/FAQ/FAQ";
import JesLogoDetails from "@/components/JesLogoMove/JesLogoDetails/JesLogoDetails";
import IndustryHighlights from "@/components/PageComponents/HomePage/IndustryHighlights/IndustryHighlights";
import ProcessDetails from "@/components/PageComponents/HomePage/ProcessDetails/ProcessDetails";
import ServiceScrollShowcase from "@/components/PageComponents/HomePage/ServiceScrollShowcase/ServiceScrollShowcase";
import StatsBar from "@/components/PageComponents/HomePage/StatsBar/StatsBar";
import TestimonialCarouselReel from "@/components/PageComponents/HomePage/TestimonialCarouselReel/TestimonialCarouselReel";
import CloudField from "@/components/ThreeD/CloudField";
import { faq, testimonials } from "@/utils/data/dummyData";
import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { useLenis } from "@/utils/hooks/useLenis";
import { Text, useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import styles from "./page.module.css";
import ServiceScrollStackPhone from "@/components/UI/ServiceScrollStackPhone/ServiceScrollStackPhone";

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

  return (
    <div>
      {/* <Image
        src={"/img/modern-building.png"}
        alt="JES Building"
        width={750}
        height={1050}
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%,0)",
          zIndex: 500,
        }}
      /> */}
      {/* <h1
        style={{
          fontWeight: 300,
          fontSize: "10rem",
          letterSpacing: "5rem",
          color: "#a91e29",
          position: "fixed",
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
      <ProcessDetails />
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
