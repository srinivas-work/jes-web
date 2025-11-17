import useIsPhoneScreen from "@/utils/hooks/useIsPhoneScreen";
import { ServiceItemType } from "@/utils/types";
import {
  ContactShadows,
  Environment,
  Html,
  Preload,
  Text,
  useGLTF,
  useProgress,
  useTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./LaptopViewer.module.css";

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
  const { nodes } = useGLTF("/models/mac-draco.glb") as any;
  const imageTexture = useTexture(imgLink);

  const isPhoneScreen = useIsPhoneScreen();

  imageTexture.flipY = false;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const open = openProgress < 0.1;

    // existing floating motion
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

  // Custom materials
  const aluminiumMat = new THREE.MeshStandardMaterial({
    color: "#b0b0b0",
    metalness: 0.9,
    roughness: 0.25,
    envMapIntensity: 1.2,
    side: THREE.DoubleSide,
  });

  const trackPadMat = new THREE.MeshStandardMaterial({
    color: "#969696",
    metalness: 0.9,
    roughness: 0.25,
    envMapIntensity: 1.2,
    side: THREE.DoubleSide,
  });

  const matteMat = new THREE.MeshStandardMaterial({
    color: "#272727",
    metalness: 0.9,
    roughness: 0.25,
    side: THREE.DoubleSide,
  });

  const keyMat = new THREE.MeshStandardMaterial({
    color: "#111",
    metalness: 0.9,
    roughness: 0.2,
    side: THREE.DoubleSide,
  });

  return (
    <group ref={group} scale={isPhoneScreen ? 0.8 : 1.2} dispose={null}>
      <group rotation-x={hinge} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={aluminiumMat} geometry={nodes["Cube008"].geometry} />
          <mesh material={matteMat} geometry={nodes["Cube008_1"].geometry} />

          {/* Screen mesh with hover + scale */}
          <mesh geometry={nodes["Cube008_2"].geometry}>
            <meshBasicMaterial map={imageTexture} toneMapped={false} />
          </mesh>
        </group>
      </group>

      <mesh
        material={keyMat}
        geometry={nodes.keyboard.geometry}
        position={[1.79, 0, 3.45]}
      />

      <group position={[0, -0.1, 3.39]}>
        <mesh material={aluminiumMat} geometry={nodes["Cube002"].geometry} />
        <mesh material={trackPadMat} geometry={nodes["Cube002_1"].geometry} />
      </group>

      <mesh
        material={keyMat}
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
  textShadowColor,
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
  textShadowColor: string;
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
        font="/fonts/PlusJakartaSans-Medium.ttf"
      >
        {text1}
      </Text>
      <Text
        position={[text1X + 0.03, text1Y - 0.03, textZ - 0.01]} // slight offset
        fontSize={2 * textScale}
        color={textShadowColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/PlusJakartaSans-Medium.ttf"
      >
        {text1}
      </Text>
      <Text
        position={[text2X, text2Y, -textZ]}
        fontSize={1.6 * textScale}
        color={textColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/PlusJakartaSans-Medium.ttf"
      >
        {text2}
      </Text>
      <Text
        position={[text2X, text2Y - 0.03, -textZ - 0.01]}
        fontSize={1.6 * textScale}
        color={textShadowColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/PlusJakartaSans-Medium.ttf"
      >
        {text2}
      </Text>
      <Model openProgress={openProgress} hinge={hinge} imgLink={imgTexture} />
      {/* <directionalLight intensity={2} /> */}
      <pointLight position={[10, 10, 10]} intensity={1.5} />
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
  const isPhoneScreen = useIsPhoneScreen();

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

  const hingeValuePhone = useTransform(
    smoothProgress,
    [0, 0.2],
    [-0.425, 1.575]
  );
  const textPhone1X = useTransform(smoothProgress, [0, 1], [0, 0]);
  const textPhone1Y = useTransform(smoothProgress, [0, 1], [5.2, 1]);
  const textPhone2X = useTransform(smoothProgress, [0, 1], [0, 0]);
  const textPhone2Y = useTransform(smoothProgress, [0, 1], [-5, -0.6]);
  const textPhoneZ = useTransform(smoothProgress, [0, 1], [4, 0]);
  const textPhoneScale = useTransform(smoothProgress, [0, 1], [0.6, 0.55]);

  const textColor = useTransform(
    smoothProgress,
    [0, 1],
    ["#a91e2d", "#202020"]
  );
  const textShadowColor = useTransform(
    smoothProgress,
    [0, 1],
    ["#434343", "#f3f3f3"]
  );

  const background = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "linear-gradient(180deg, #ffc9ceff 0%, #ffffff 100%)", // Start: red → white gradient
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
  const [tColor, setTColor] = useState("#a91e2d");
  const [tShadowColor, setTShadowColor] = useState("#434343");

  // Subscribe to transform updates

  useEffect(() => {
    const u9 = textColor.on("change", setTColor);
    const u10 = textShadowColor.on("change", setTShadowColor);

    return () => {
      u9();
      u10();
    };
  }, [hingeValue, smoothProgress, textColor, textShadowColor]);

  useEffect(() => {
    if (isPhoneScreen) return;

    const u1 = hingeValue.on("change", setHinge);
    const u2 = smoothProgress.on("change", setOpenProgress);
    const u3 = text1X.on("change", setT1X);
    const u4 = text1Y.on("change", setT1Y);
    const u5 = text2X.on("change", setT2X);
    const u6 = text2Y.on("change", setT2Y);
    const u7 = textZ.on("change", setTZ);
    const u8 = textScale.on("change", setTScale);

    return () => {
      u1();
      u2();
      u3();
      u4();
      u5();
      u6();
      u7();
      u8();
    };
  }, [isPhoneScreen, text1X, text1Y, text2X, text2Y, textZ, textScale]);

  useEffect(() => {
    if (!isPhoneScreen) return;

    const u1 = hingeValuePhone.on("change", setHinge);
    const u2 = smoothProgress.on("change", setOpenProgress);
    const u3 = textPhone1X.on("change", setT1X);
    const u4 = textPhone1Y.on("change", setT1Y);
    const u5 = textPhone2X.on("change", setT2X);
    const u6 = textPhone2Y.on("change", setT2Y);
    const u7 = textPhoneZ.on("change", setTZ);
    const u8 = textPhoneScale.on("change", setTScale);

    return () => {
      u1();
      u2();
      u3();
      u4();
      u5();
      u6();
      u7();
      u8();
    };
  }, [
    isPhoneScreen,
    textPhone1X,
    textPhone1Y,
    textPhone2X,
    textPhone2Y,
    textPhoneZ,
    textPhoneScale,
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

  useEffect(() => {
    if (isPhoneScreen) {
      setT1X(0);
      setT1Y(5.2);
      setT2X(0);
      setTScale(0.6);
    }
  }, [isPhoneScreen]);

  return (
    <motion.section
      className={styles.laptopViewerSection}
      ref={containerRef}
      style={{ background }}
    >
      <div
        style={{
          position: isPhoneScreen ? "static" : "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
        }}
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
              textShadowColor={tShadowColor}
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
        {/* {getDescription()} */}
      </div>
    </motion.section>
  );
}
