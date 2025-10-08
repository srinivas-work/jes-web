import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh } from "three";

interface CloudClusterData {
  position: [number, number, number];
  scale: number;
  speed: number;
  density: number;
}

interface CloudParticleData {
  position: [number, number, number];
  scale: number;
  opacity: number;
}

export function AdvancedCloudScene() {
  const cloudsRef = useRef<Group>(null);

  const cloudClusters = useMemo<CloudClusterData[]>(() => {
    const clusters: CloudClusterData[] = [];
    const clusterCount = 50;

    for (let i = 0; i < clusterCount; i++) {
      clusters.push({
        position: [
          (Math.random() - 0.5) * 300,
          (Math.random() - 0.5) * 80,
          Math.random() * -200 - 50,
        ],
        scale: Math.random() * 2 + 1,
        speed: Math.random() * 0.3 + 0.1,
        density: Math.floor(Math.random() * 5) + 3,
      });
    }
    return clusters;
  }, []);

  useFrame((state, delta) => {
    if (!cloudsRef.current) return;

    // Move camera forward
    state.camera.position.z += delta * 15;

    // Gentle camera sway
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 2;
    state.camera.position.y = Math.sin(state.clock.elapsedTime * 0.1) * 1;

    // Reset camera position
    if (state.camera.position.z > 100) {
      state.camera.position.z = -150;
    }

    // Animate cloud clusters
    cloudsRef.current.children.forEach((cluster, index) => {
      const cloudData = cloudClusters[index];
      cluster.position.z += delta * cloudData.speed;

      if (cluster.position.z > 80) {
        cluster.position.z = -150;
        cluster.position.x = (Math.random() - 0.5) * 300;
        cluster.position.y = (Math.random() - 0.5) * 80;
      }
    });
  });

  return (
    <>
      <color attach="background" args={["#4584b4"]} />
      <fog attach="fog" args={["#4584b4", 30, 200]} />

      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
      />

      <group ref={cloudsRef}>
        {cloudClusters.map((cluster, index) => (
          <CloudCluster key={index} {...cluster} />
        ))}
      </group>
    </>
  );
}

interface CloudClusterProps {
  position: [number, number, number];
  scale: number;
  density: number;
}

function CloudCluster({ position, scale, density }: CloudClusterProps) {
  const clusterRef = useRef<Group>(null);

  const cloudParticles = useMemo<CloudParticleData[]>(() => {
    const particles: CloudParticleData[] = [];
    for (let i = 0; i < density; i++) {
      particles.push({
        position: [
          (Math.random() - 0.5) * scale * 3,
          (Math.random() - 0.5) * scale * 2,
          (Math.random() - 0.5) * scale * 3,
        ],
        scale: Math.random() * scale + 0.5,
        opacity: Math.random() * 0.4 + 0.3,
      });
    }
    return particles;
  }, [density, scale]);

  return (
    <group ref={clusterRef} position={position}>
      {cloudParticles.map((particle, index) => (
        <CloudParticle key={index} {...particle} />
      ))}
    </group>
  );
}

interface CloudParticleProps {
  position: [number, number, number];
  scale: number;
  opacity: number;
}

function CloudParticle({ position, scale, opacity }: CloudParticleProps) {
  const meshRef = useRef<Mesh>(null);

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[scale, 12, 12]} />
      <meshLambertMaterial
        color="#ffffff"
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}
