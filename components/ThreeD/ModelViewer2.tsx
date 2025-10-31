"use client";

import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, ContactShadows } from "@react-three/drei";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

// -------------------------
// MacBook Model
// -------------------------
function Model({
  open,
  hinge,
  ...props
}: {
  open: boolean;
  hinge: number;
  [key: string]: any;
}) {
  const group = useRef<THREE.Group>(null!);
  const { nodes, materials } = useGLTF("/models/mac-draco.glb") as any;

  // Cursor change on hover
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  // Floating animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      open ? Math.cos(t / 10) / 10 + 0.25 : 0,
      0.1
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      open ? Math.sin(t / 10) / 4 : 0,
      0.1
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      open ? Math.sin(t / 10) / 10 : 0,
      0.1
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      open ? (-2 + Math.sin(t)) / 3 : -4.3,
      0.1
    );
  });

  return (
    <group
      ref={group}
      {...props}
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={() => setHovered(false)}
      dispose={null}
    >
      {/* Screen */}
      <group rotation-x={hinge} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            material={materials.aluminium}
            geometry={nodes["Cube008"].geometry}
          />
          <mesh
            material={materials["matte.001"]}
            geometry={nodes["Cube008_1"].geometry}
          />
          <mesh
            material={materials["screen.001"]}
            geometry={nodes["Cube008_2"].geometry}
          />
        </group>
      </group>

      {/* Keyboard + base */}
      <mesh
        material={materials.keys}
        geometry={nodes.keyboard.geometry}
        position={[1.79, 0, 3.45]}
      />
      <group position={[0, -0.1, 3.39]}>
        <mesh
          material={materials.aluminium}
          geometry={nodes["Cube002"].geometry}
        />
        <mesh
          material={materials.trackpad}
          geometry={nodes["Cube002_1"].geometry}
        />
      </group>
      <mesh
        material={materials.touchbar}
        geometry={nodes.touchbar.geometry}
        position={[0, -0.03, 1.2]}
      />
    </group>
  );
}

// -------------------------
// Model Viewer (main)
// -------------------------
export default function ModelViewer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 80%"],
  });

  // Motion value between 0 → 1 (closed → open)
  const hinge = useTransform(scrollYProgress, [0, 0.2], [1.575, -0.425]);
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["#f0f0f0", "#d25578"]
  );
  const lightColor = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["#ffffff", "#d25578"]
  );

  // Boolean flag for open state
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.1 && v < 0.9) setOpen(true);
    else setOpen(false);
  });

  return (
    <motion.main
      ref={ref}
      style={{
        background: bgColor,
        width: "100dvw",
        height: "100dvh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, -30], fov: 35 }}
        style={{ width: "100%", height: "100%" }}
      >
        <pointLight
          position={[10, 10, 10]}
          intensity={1.5}
          color={lightColor.get()}
        />
        <Suspense fallback={null}>
          <group rotation={[0, Math.PI, 0]}>
            <Model open={open} hinge={hinge.get()} />
          </group>
          <Environment preset="city" />
        </Suspense>
        <ContactShadows
          position={[0, -4.5, 0]}
          opacity={0.4}
          scale={20}
          blur={1.75}
          far={4.5}
        />
      </Canvas>

      <motion.h1
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "3rem",
          fontWeight: 600,
          color: "#111",
          opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]),
        }}
      >
        Scroll to open
      </motion.h1>
    </motion.main>
  );
}
