import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MotionValue, useScroll, useTransform, motion } from "framer-motion";
import { useControls } from "leva";
import { Environment, Text3D } from "@react-three/drei";

const Bar = ({
  position,
  height,
  color,
  progress,
  index,
}: {
  position: [number, number, number];
  height: number;
  color: string;
  progress: MotionValue<number>;
  index: number;
}) => {
  const mesh = useRef<THREE.Mesh>(null!);

  // Scroll-driven scaling animation
  const yScale = useTransform(
    progress,
    [0.1 * index, 0.1 * (index + 1)],
    [-0.5, height]
  );
  const opacity = useTransform(
    progress,
    [0.1 * index, 0.1 * (index + 1)],
    [0, 1]
  );

  useFrame(() => {
    if (mesh.current) {
      const scaleY = yScale.get();
      mesh.current.scale.y = scaleY;
      mesh.current.material.opacity = opacity.get();
      mesh.current.position.y = scaleY / 2; // grows upward from base
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <Text3D
        font="/fonts/PlusJakartaSans-SemiBold.json" // Must be JSON, not .ttf
        size={0.6}
        height={0.1} // this adds the 3D depth
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={5}
        position={[-0.5, 0.1, 0]}
      >
        {`0${index + 1}`}
        <meshStandardMaterial color="#a91e29" metalness={0.3} roughness={0.2} />
      </Text3D>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        roughness={0.15}
        metalness={0.8}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
};

const Bars = ({ progress }: { progress: MotionValue<number> }) => {
  // Leva controls with array constraints
  const { groupPosition, groupRotation, groupScale } = useControls(
    "Bars Group",
    {
      groupPosition: {
        value: [1.5, 0, 6],
        step: 0.1,
      },
      groupRotation: {
        value: [0, 1.2, 0],
        step: 0.1,
      },
      groupScale: {
        value: 0.6,
        step: 0.01,
      },
    }
  );

  const colors = ["#E8919A", "#DB5C6A", "#A91E2D"];
  const heights = [2, 3, 4];

  return (
    <group rotation={groupRotation} position={groupPosition} scale={groupScale}>
      {colors.map((color, i) => (
        <Bar
          key={i}
          color={color}
          height={heights[i]}
          position={[i * 1.3, 0, 0]}
          progress={progress}
          index={i}
        />
      ))}
    </group>
  );
};

export default function BarsScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <motion.div ref={ref} style={{ height: "400vh" }}>
      <Canvas
        camera={{ position: [6, 4, 10], fov: 40 }}
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          background: "#d9d9d9",
        }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <Environment preset="apartment" />
        <Bars progress={scrollYProgress} />
      </Canvas>
    </motion.div>
  );
}

//"apartment" | "city" | "dawn" | "forest" | "lobby" | "night" | "park" | "studio" | "sunset" | "warehouse" |

//apartment, city, forest, pak(matte),
