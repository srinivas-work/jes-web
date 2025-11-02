"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { Suspense, useRef } from "react";
import {
  ContactShadows,
  Environment,
  Html,
  Text,
  useProgress,
} from "@react-three/drei";
import { portalCardList } from "@/utils/data/dummyData";
import PortalCard from "../../PortalCard/PortalCard";
import styles from "./PortalCards.module.css";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        style={{
          color: "#fff",
          fontFamily: "Inter, sans-serif",
          textAlign: "center",
          fontSize: "1rem",
          background: "rgba(0,0,0,0.4)",
          padding: "10px 16px",
          borderRadius: "8px",
        }}
      >
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function Cube({
  color,
  position,
  index,
  progress,
}: {
  color: string;
  position: [number, number, number];
  index: number;
  progress: any;
}) {
  const mesh = useRef<THREE.Mesh>(null!);

  const visible = useTransform(
    progress,
    [0.33 * index, 0.33 * (index + 1)],
    [0, 1]
  );

  useFrame((state) => {
    const v = visible.get();
    mesh.current.scale.y = THREE.MathUtils.lerp(
      mesh.current.scale.y,
      v + 0.05,
      0.1
    );
    mesh.current.scale.z = THREE.MathUtils.lerp(
      mesh.current.scale.z,
      v + 0.1,
      0.1
    );
    mesh.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.05;
  });

  return (
    <mesh ref={mesh} position={position} castShadow receiveShadow>
      <boxGeometry args={[1, 0.35, 1]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.25}
        metalness={0.4}
        clearcoat={1}
        clearcoatRoughness={0.15}
      />
      <Text
        position={[0, 0.18, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.5}
        color="#d2d2d2"
        anchorX="center"
        anchorY="middle"
        font="/fonts/PlusJakartaSans-SemiBold.ttf"
        fillOpacity={0.3}
      >
        0{index + 1}
      </Text>
    </mesh>
  );
}

function CubeStack({ progress }: { progress: any }) {
  const group = useRef<THREE.Group>(null!);
  const yMove = useTransform(progress, [0, 1], [0, 1]);

  useFrame(() => {
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      yMove.get(),
      0.1
    );
  });

  const cubes = [
    { color: "#f26b7d", pos: [0, -1.2, 0], scale: 1.5 },
    { color: "#d33e4f", pos: [0, -0.65, 0], scale: 1.0 },
    { color: "#a91e2d", pos: [0, 0.1, 0], scale: 0.5 },
  ];

  return (
    <group ref={group}>
      {cubes.map((c, i) => (
        <group key={i} scale={[c.scale, c.scale, c.scale]}>
          <Cube
            color={c.color}
            position={c.pos as [number, number, number]}
            index={i}
            progress={progress}
          />
        </group>
      ))}
    </group>
  );
}

export default function GrowthCubes3D() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  console.log("Growth Cube");

  return (
    <motion.section ref={ref} className={styles.portalCardSection}>
      <div
        style={{
          position: "sticky",
          top: 0,
        }}
      >
        <div className={styles.cardsContainer}>
          {portalCardList.map((p, i) => (
            <PortalCard
              key={i}
              portalCardItem={p}
              index={i}
              scrollProgress={scrollYProgress}
              className={styles.portalCard}
              visibleAt={0.25 * i}
            />
          ))}
        </div>

        <Canvas
          shadows
          camera={{ position: [2.5, 2.5, 5], fov: 35 }}
          dpr={[1, 2]}
          style={{
            width: "100%",
            height: "100vh",
            WebkitMaskImage:
              "linear-gradient(to bottom, white 0%, white 95%, transparent 100%)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskImage:
              "linear-gradient(to bottom, white 0%, white 95%, transparent 100%)",
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
          }}
        >
          <Suspense fallback={<Loader />}>
            {/* LIGHTS */}
            <ambientLight intensity={0.7} />

            {/* Directional Light casting wide shadow coverage */}
            <directionalLight
              position={[4, 6, 3]}
              intensity={1.4}
              castShadow
              shadow-mapSize-width={256}
              shadow-mapSize-height={256}
              shadow-camera-left={-1}
              shadow-camera-right={5}
              shadow-camera-top={5}
              shadow-camera-bottom={-3}
              shadow-camera-near={2}
              shadow-camera-far={12}
              shadow-bias={-0.0003}
            />

            <Environment preset="forest" />

            {/* OBJECTS */}
            <CubeStack progress={scrollYProgress} />

            {/* CONTACT SHADOWS */}
            <ContactShadows
              position={[0, -1.8, 0]}
              scale={15}
              blur={2.5}
              opacity={0.5}
              far={6}
            />
          </Suspense>
        </Canvas>
      </div>
    </motion.section>
  );
}
