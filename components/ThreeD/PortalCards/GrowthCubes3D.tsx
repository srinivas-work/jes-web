"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Environment, Text } from "@react-three/drei";
import { portalCardList } from "@/utils/data/dummyData";
import PortalCard from "../../PortalCard/PortalCard";
import styles from "./PortalCards.module.css";

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

  // Scroll range for this cube’s appearance
  const visible = useTransform(
    progress,
    [0.33 * index, 0.33 * (index + 1)],
    [0, 1]
  );

  useFrame((state) => {
    const v = visible.get();
    // Scale grows from 0 (invisible) to 1 (full size)
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

    // Slight floating / breathing motion
    mesh.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.5 + index) * 0.05;
  });

  return (
    <mesh ref={mesh} position={position}>
      {/* Cube */}
      <boxGeometry args={[1, 0.35, 1]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.15}
        metalness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />

      {/* Text on top surface */}
      <Text
        position={[0, 0.18, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.5}
        color="#d2d2d2ff"
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

  // Move the whole stack slightly upward as you scroll
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
              //invisibleAt={0.25 * (i + 1)}
            />
          ))}
        </div>
        <Canvas
          camera={{ position: [2.5, 2.5, 5], fov: 35 }}
          style={{
            width: "100%",
            height: "100vh",
          }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={0.2} />
          <Environment preset="forest" />
          <CubeStack progress={scrollYProgress} />
        </Canvas>
      </div>
    </motion.section>
  );
}
