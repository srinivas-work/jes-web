"use client";
import PortalCard from "@/components/PortalCard/PortalCard";
import { portalCardList } from "@/utils/data/dummyData";
import { Environment, Text3D } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";
import styles from "./Jes3DSteps.module.css";

function StepCube({
  color,
  z,
  index,
  height,
  progress,
  cameraOffset = 0,
}: {
  color: string;
  z: number;
  index: number;
  height: number;
  progress: any;
  cameraOffset?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const textMaterialRef = useRef<THREE.MeshStandardMaterial>(null!);
  const cubeMaterialRef = useRef<THREE.MeshPhysicalMaterial>(null!);
  const t = useRef(0);
  const tmpPos = new THREE.Vector3();

  // each cube appears in its scroll slot (one by one)
  const visible = useTransform(
    progress,
    [0.25 * index, 0.25 * (index + 1)],
    [0.1, 1]
  );

  useFrame((state, delta) => {
    t.current += delta;

    const v = visible.get();

    // smooth scale in (scale goes from 0 -> 1)
    mesh.current.scale.y = THREE.MathUtils.lerp(mesh.current.scale.y, v, 0.12);
    mesh.current.scale.x = THREE.MathUtils.lerp(mesh.current.scale.x, 1, 0.12);
    mesh.current.scale.z = THREE.MathUtils.lerp(mesh.current.scale.z, 1, 0.12);

    // position Y so base touches the ground (height * currentScaleY / 2)
    mesh.current.position.y = (height * mesh.current.scale.y) / 2;

    // tiny breathing motion so it doesn't feel dead
    mesh.current.position.y += Math.sin(t.current * 1.8 + index) * 0.02;

    // ANIMATE OPACITY for both cube and text based on scale
    if (cubeMaterialRef.current) {
      cubeMaterialRef.current.opacity = THREE.MathUtils.lerp(
        cubeMaterialRef.current.opacity,
        v,
        0.12
      );
    }

    if (textMaterialRef.current) {
      textMaterialRef.current.opacity = THREE.MathUtils.lerp(
        textMaterialRef.current.opacity,
        v,
        0.12
      );
    }

    // compute distance to camera to simulate blur (bigger distance -> more roughness, less env reflection)
    mesh.current.getWorldPosition(tmpPos);
    const dist = tmpPos.distanceTo(state.camera.position) - cameraOffset;
    const clampDist = THREE.MathUtils.clamp((dist - 1) / 12, 0, 1);
    const minRough = 0.12;
    const maxRough = 0.7;
    const minEnv = 1.2;
    const maxEnv = 0.15;

    const mat = mesh.current.material as THREE.MeshPhysicalMaterial;
    mat.roughness = THREE.MathUtils.lerp(minRough, maxRough, clampDist);
    mat.envMapIntensity = THREE.MathUtils.lerp(minEnv, maxEnv, clampDist);

    // optionally reduce clearcoat a bit with distance
    mat.clearcoat = THREE.MathUtils.lerp(1, 0.4, clampDist);
  });

  return (
    <mesh ref={mesh} position={[0, height / 2, z]}>
      <Text3D
        font="/fonts/PlusJakartaSans-SemiBold.json"
        size={0.6}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={5}
        position={[-0.5, height - 0.35, 0]}
      >
        {`0${index + 1}`}
        <meshStandardMaterial
          ref={textMaterialRef}
          color="#d8d8d8"
          metalness={0.3}
          roughness={0.2}
          transparent={true}
          opacity={0} // Start with 0 opacity
        />
      </Text3D>

      <boxGeometry args={[1, height, 1]} />
      <meshPhysicalMaterial
        ref={cubeMaterialRef}
        color={color}
        roughness={0.12}
        metalness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.08}
        envMapIntensity={1.2}
        transparent={true} // Enable transparency
        opacity={0} // Start with 0 opacity
      />
    </mesh>
  );
}

function GrowthPath({ progress }: { progress: any }) {
  const group = useRef<THREE.Group>(null!);

  const zMove = useTransform(progress, [1, 0], [12, 1]);

  useFrame(() => {
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      zMove.get(),
      0.08
    );
  });

  const original = [
    { color: "#d92c41", height: 1.2 }, // step3 (lighter shade)
    { color: "#a91e2d", height: 1 }, // step 2 (original/base color)
    { color: "#7a1520", height: 0.8 }, // step 1 (darker shade)
  ];

  // reverse order so 4th becomes first (closest)
  const steps = original.slice().reverse();

  // more spacing between cubes along z
  const spacing = 4.0; // increase to space them out more
  const baseZ = 0; // position of first (closest) cube

  return (
    <group ref={group} position={[1.5, -0.5, 6]} rotation={[0, 0, 0]}>
      <mesh
        position={[0, -0.25, -((steps.length - 1) * spacing) / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2, spacing * steps.length + 2]} />
        <meshStandardMaterial color="#bfc7d5" roughness={0.8} metalness={0.2} />
      </mesh>

      {steps.map((s, i) => (
        <StepCube
          key={i}
          color={s.color}
          z={baseZ - i * spacing}
          index={i}
          height={s.height}
          progress={progress}
        />
      ))}
    </group>
  );
}

export default function Jes3DSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <motion.section ref={ref} className={styles.growthPathSection}>
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
              invisibleAt={
                i != portalCardList.length - 1 ? 0.25 * (i + 1) : undefined
              }
            />
          ))}
        </div>
        <Canvas
          camera={{ position: [3.5, 1.2, 5.5], fov: 45 }} // camera positioned to see "closest" item initially
          style={{
            width: "100%",
            height: "100vh",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
          }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <Environment preset="city" />
          <GrowthPath progress={scrollYProgress} />
        </Canvas>
      </div>
    </motion.section>
  );
}
