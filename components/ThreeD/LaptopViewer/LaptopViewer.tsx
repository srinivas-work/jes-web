import * as THREE from "three";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Environment,
  useGLTF,
  ContactShadows,
  useTexture,
  Html,
  useProgress,
  Preload,
  Text,
  Sky,
} from "@react-three/drei";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import styles from "./LaptopViewer.module.css";
import { ServiceItemType } from "@/utils/types";

type ModelProps = {
  openProgress: number;
  hinge: number;
  imgLink: string;
};

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
          padding: 12,
          background: "rgba(0,0,0,0.5)",
          borderRadius: 8,
        }}
      >
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function Model({ openProgress, hinge, imgLink }: ModelProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("/models/mac-draco.glb") as any;
  const [hovered, setHovered] = useState(false);
  const imageTexture = useTexture(imgLink);

  imageTexture.flipY = false;

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
      scale={1.2}
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
          {/* ✅ Use loaded texture */}
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

function Scene({
  text1,
  text2,
  hinge,
  openProgress,
  mouseRef,
  text1X,
  text1Y,
  text2X,
  text2Y,
  textZ,
  textScale,
  textColor,
  imgTexture,
}: {
  text1: string;
  text2: string;
  hinge: number;
  openProgress: number;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  text1X: number;
  text1Y: number;
  text2X: number;
  text2Y: number;
  textZ: number;
  textScale: number;
  textColor: string;
  imgTexture: string;
}) {
  const mainGroup = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!mainGroup.current) return;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const targetRotX = my * 0.18;
    const targetRotY = mx * 0.35;
    mainGroup.current.rotation.x = THREE.MathUtils.lerp(
      mainGroup.current.rotation.x,
      targetRotX,
      0.06
    );
    mainGroup.current.rotation.y = THREE.MathUtils.lerp(
      mainGroup.current.rotation.y,
      targetRotY + Math.PI,
      0.06
    );
    mainGroup.current.rotation.z = THREE.MathUtils.lerp(
      mainGroup.current.rotation.z,
      mx * 0.03,
      0.06
    );
  });

  return (
    <group ref={mainGroup} rotation={[0, Math.PI, 0]}>
      <Text
        position={[text1X, text1Y, textZ]}
        fontSize={2 * textScale}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/PlusJakartaSans-Regular.ttf"
      >
        {text1}
      </Text>

      <Text
        position={[text2X, text2Y, -textZ]}
        fontSize={1.6 * textScale}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/PlusJakartaSans-Regular.ttf"
      >
        {text2}
      </Text>

      <Model openProgress={openProgress} hinge={hinge} imgLink={imgTexture} />
      <Environment preset="city" />
    </group>
  );
}

export default function LaptopViewer({
  text1 = "Innovation in Motion",
  text2 = "Powered by Creativity",
  imgLink,
  selectedService,
}: {
  text1?: string;
  text2?: string;
  imgLink: string;
  selectedService: ServiceItemType;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  // Transforms
  const hingeValue = useTransform(smoothProgress, [0, 0.5], [-0.425, 1.575]);
  const text1X = useTransform(smoothProgress, [0, 1], [-6, 0]);
  const text1Y = useTransform(smoothProgress, [0, 1], [3.2, 1]);
  const text2X = useTransform(smoothProgress, [0, 1], [5, 0]);
  const text2Y = useTransform(smoothProgress, [0, 1], [-2.5, -0.6]);
  const textZ = useTransform(smoothProgress, [0, 1], [4, 0]);
  const textScale = useTransform(smoothProgress, [0, 1], [1, 0.9]);
  const textColor = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["#ffffff", "#a91e2d", "#202020"]
  );
  const background = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "linear-gradient(180deg, #a91e2d 0%, #ffffff 100%)", // Start: red → white gradient
      "linear-gradient(180deg, #fefefe 0%, #ffffff 100%)", // Middle: almost white
      "linear-gradient(180deg, #f3f3f3 0%, #ffffff 0%)", // End: subtle grey fade
    ]
  );

  // States
  const [hinge, setHinge] = useState(-0.425);
  const [openProgress, setOpenProgress] = useState(0);
  const [t1X, setT1X] = useState(-6);
  const [t1Y, setT1Y] = useState(3.2);
  const [t2X, setT2X] = useState(8);
  const [t2Y, setT2Y] = useState(-4.5);
  const [tZ, setTZ] = useState(4);
  const [tScale, setTScale] = useState(1);
  const [tColor, setTColor] = useState("#ffffff");

  // Subscribe to transform updates
  useEffect(() => {
    const u1 = hingeValue.on("change", setHinge);
    const u2 = smoothProgress.on("change", setOpenProgress);
    const u3 = text1X.on("change", setT1X);
    const u4 = text1Y.on("change", setT1Y);
    const u5 = text2X.on("change", setT2X);
    const u6 = text2Y.on("change", setT2Y);
    const u7 = textZ.on("change", setTZ);
    const u8 = textScale.on("change", setTScale);
    const u9 = textColor.on("change", setTColor);
    return () => {
      u1();
      u2();
      u3();
      u4();
      u5();
      u6();
      u7();
      u8();
      u9();
    };
  }, [
    hingeValue,
    smoothProgress,
    text1X,
    text1Y,
    text2X,
    text2Y,
    textZ,
    textScale,
    textColor,
  ]);

  // Mouse movement tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current = { x, y };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const getDescription = () => {
    return (
      <>
        {Array.isArray(selectedService.description) ? (
          selectedService.description.map((item, index) => (
            <p key={index} className={styles.serviceDetails}>
              {item}
            </p>
          ))
        ) : (
          <p className={styles.serviceDetails}>{selectedService.description}</p>
        )}
      </>
    );
  };

  return (
    <motion.section
      className={styles.laptopViewerSection}
      ref={containerRef}
      style={{ background }}
    >
      <div
        style={{ position: "sticky", top: 0, height: "100vh", width: "100%" }}
      >
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, -30], fov: 35 }}>
          <Suspense fallback={<Loader />}>
            {/* <Sky /> */}
            <Scene
              text1={text1}
              text2={text2}
              hinge={hinge}
              openProgress={openProgress}
              mouseRef={mouse}
              text1X={t1X}
              text1Y={t1Y}
              text2X={t2X}
              text2Y={t2Y}
              textZ={tZ}
              textScale={tScale}
              textColor={tColor}
              imgTexture={imgLink}
            />
            <ContactShadows
              position={[0, -4.5, 0]}
              opacity={0.4}
              scale={20}
              blur={1.75}
              far={4.5}
            />
          </Suspense>
          <Preload all />
        </Canvas>
        {/* <div className={styles.serviceDetails}>{getDescription()}</div> */}
        {getDescription()}
      </div>
    </motion.section>
  );
}
