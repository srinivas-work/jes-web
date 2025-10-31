import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  ContactShadows,
  useTexture,
} from "@react-three/drei";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";

type ModelProps = {
  openProgress: number;
  hinge: number;
  [key: string]: any;
};

function Model({ openProgress, hinge, ...props }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("/models/mac-draco.glb") as any;
  const [hovered, setHovered] = useState(false);
  const imageTexture = useTexture(
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  );

  imageTexture.flipY = false;
  imageTexture.needsUpdate = true;

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    const open = openProgress < 0.1;
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
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      dispose={null}
    >
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
          {/* 🖥 Replace the screen material with the Unsplash image */}
          <mesh geometry={nodes["Cube008_2"].geometry}>
            <meshBasicMaterial map={imageTexture} toneMapped={false} />
          </mesh>
        </group>
      </group>

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

export default function ModelViewer() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Framer motion scroll progress (0 → 1 as the section enters/leaves view)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], // start opening as it comes into view
  });

  // Smoothen the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  // Motion transforms derived from scroll progress
  const background = useTransform(
    smoothProgress,
    [0, 1],
    ["#f0f0f0", "#d25578"]
  );
  const lightColor = useTransform(
    smoothProgress,
    [0, 1],
    ["#f0f0f0", "#d25578"]
  );
  const titleOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [1, 0.5, 0.2, 0]
  );
  const titleY = useTransform(
    smoothProgress,
    [0, 1],
    ["translate3d(-50%, -100px, 0)", "translate3d(-50%, 50px, 0)"]
  );
  const hingeValue = useTransform(smoothProgress, [0, 0.5], [-0.425, 1.575]);

  // Sync hinge and light color to real numbers/values for R3F
  const [hinge, setHinge] = useState(-0.425);
  const [lightColorValue, setLightColorValue] = useState("#f0f0f0");

  useEffect(() => {
    const unsub1 = hingeValue.on("change", setHinge);
    const unsub2 = lightColor.on("change", setLightColorValue);
    return () => {
      unsub1();
      unsub2();
    };
  }, [hingeValue, lightColor]);

  return (
    <motion.section
      ref={containerRef}
      style={{
        //background,
        width: "100%",
        height: "150vh", // extra height for visible scroll motion
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* <motion.h1
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: titleY,
          opacity: titleOpacity,
          color: "#111",
          fontSize: "2rem",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        Scroll to open
      </motion.h1> */}

      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
        }}
      >
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, -30], fov: 35 }}>
          <pointLight
            position={[10, 10, 10]}
            intensity={1.5}
            color={lightColorValue}
          />
          <Suspense fallback={null}>
            <group rotation={[0, Math.PI, 0]}>
              <Model openProgress={smoothProgress.get()} hinge={hinge} />
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
      </div>
    </motion.section>
  );
}
