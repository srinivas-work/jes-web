import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";

export default function CloudField() {
  const group = useRef<THREE.Group>(null!);
  const horizontalGroup = useRef<THREE.Group>(null!);

  const texture = useTexture("/img/cloud10.png");
  const fog = new THREE.Fog(0x4584b4, -100, 3000);

  const verticalCloudsYPosition = -35;
  const horizontalCloudsYPosition = 100;
  const horizontalWidth = 4000;
  const verticalDepth = 8000;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      map: { value: texture },
      fogColor: { value: fog.color },
      fogNear: { value: fog.near },
      fogFar: { value: fog.far },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform vec3 fogColor;
      uniform float fogNear;
      uniform float fogFar;
      varying vec2 vUv;
      void main() {
        float depth = gl_FragCoord.z / gl_FragCoord.w;
        float fogFactor = smoothstep(fogNear, fogFar, depth);
        vec4 tex = texture2D(map, vUv);
        tex.a *= pow(gl_FragCoord.z, 20.0);
        gl_FragColor = mix(tex, vec4(fogColor, tex.a), fogFactor);
      }
    `,
    depthWrite: false,
    depthTest: false,
    transparent: true,
  });

  // Helper function to create merged geometry
  function makeCloudGeometry(
    count: number,
    yPos: number,
    rangeX: number,
    rangeZ: number,
    scaleMin: number,
    scaleMax: number
  ) {
    const geo = new THREE.BufferGeometry();
    const tempPlane = new THREE.PlaneGeometry(64, 64);
    const pos: number[] = [];
    const uv: number[] = [];
    const idxs: number[] = [];
    let indexOffset = 0;

    for (let i = 0; i < count; i++) {
      const x = Math.random() * rangeX - rangeX / 2;
      const y = yPos + Math.random() * 20;
      const z = Math.random() * rangeZ - rangeZ / 2;
      const rotation = Math.random() * Math.PI;
      const scale = Math.random() * (scaleMax - scaleMin) + scaleMin;

      const posAttr = tempPlane.attributes.position as THREE.BufferAttribute;
      const uvAttr = tempPlane.attributes.uv as THREE.BufferAttribute;
      const id = tempPlane.index!;

      for (let j = 0; j < posAttr.count; j++) {
        const vx = posAttr.getX(j) * scale;
        const vy = posAttr.getY(j) * scale;
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        const rx = vx * cos - vy * sin;
        const ry = vx * sin + vy * cos;

        pos.push(rx + x, ry + y, z);
        uv.push(uvAttr.getX(j), uvAttr.getY(j));
      }

      for (let j = 0; j < id.count; j++) idxs.push(id.getX(j) + indexOffset);
      indexOffset += posAttr.count;
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
    geo.setIndex(idxs);
    return geo;
  }

  const verticalGeometry = makeCloudGeometry(
    8000,
    verticalCloudsYPosition,
    1000,
    verticalDepth,
    0.5,
    2
  );
  const horizontalGeometry = makeCloudGeometry(
    3000,
    horizontalCloudsYPosition,
    horizontalWidth,
    400,
    0.7,
    1.5
  );

  const target = useRef({ x: 0, y: 0 });
  const motion = useRef({ z: 0, x: 0 });
  const lerpFactor = 0.05;

  useFrame(({ mouse, clock }) => {
    const elapsed = clock.getElapsedTime();

    // Vertical movement: move along Z axis infinitely
    motion.current.z += 20 * 0.04; // speed factor
    if (motion.current.z > verticalDepth) motion.current.z -= verticalDepth;

    // Horizontal movement: move along X axis infinitely
    motion.current.x += 10 * 0.03; // slower side motion
    if (motion.current.x > horizontalWidth) motion.current.x -= horizontalWidth;

    // Smooth parallax effect
    target.current.x = THREE.MathUtils.lerp(
      target.current.x,
      mouse.x * 1000,
      lerpFactor
    );
    target.current.y = THREE.MathUtils.lerp(
      target.current.y,
      -mouse.y * 1000,
      lerpFactor
    );

    // Apply positions
    if (group.current) {
      group.current.position.set(
        target.current.x * 0.01,
        target.current.y * 0.01,
        -motion.current.z
      );
    }
    if (horizontalGroup.current) {
      horizontalGroup.current.position.set(
        -motion.current.x,
        target.current.y * 0.005,
        0
      );
    }
  });

  return (
    <>
      {/* Vertical Clouds (infinite Z loop) */}
      <group ref={group} scale={5.5}>
        <mesh geometry={verticalGeometry} material={material} />
        <mesh
          geometry={verticalGeometry}
          material={material}
          position={[0, 0, -verticalDepth]}
        />
      </group>

      {/* Horizontal Clouds (infinite X loop) */}
      <group ref={horizontalGroup}>
        <mesh geometry={horizontalGeometry} material={material} />
        <mesh
          geometry={horizontalGeometry}
          material={material}
          position={[horizontalWidth, 0, 0]}
        />
      </group>
    </>
  );
}

//.......Fuller No Interaction version

// export default function CloudField() {
//   const group = useRef<THREE.Group>(null!); // Z-axis clouds
//   const sideGroup = useRef<THREE.Group>(null!); // X-axis clouds

//   const texture = useTexture("/img/cloud10.png");
//   texture.colorSpace = THREE.SRGBColorSpace;

//   const fog = new THREE.Fog(0x4584b4, -100, 3000);

//   const material = new THREE.ShaderMaterial({
//     uniforms: {
//       map: { value: texture },
//       fogColor: { value: fog.color },
//       fogNear: { value: fog.near },
//       fogFar: { value: fog.far },
//     },
//     vertexShader: `
//       varying vec2 vUv;
//       void main() {
//         vUv = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform sampler2D map;
//       uniform vec3 fogColor;
//       uniform float fogNear;
//       uniform float fogFar;
//       varying vec2 vUv;
//       void main() {
//         float depth = gl_FragCoord.z / gl_FragCoord.w;
//         float fogFactor = smoothstep(fogNear, fogFar, depth);
//         vec4 tex = texture2D(map, vUv);
//         tex.a *= pow(gl_FragCoord.z, 20.0);
//         gl_FragColor = mix(tex, vec4(fogColor, tex.a), fogFactor);
//       }
//     `,
//     transparent: true,
//     depthWrite: false,
//     depthTest: true,
//   });

//   const lightMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//       map: { value: texture },
//       brightness: { value: 1.6 },
//     },
//     vertexShader: `
//       varying vec2 vUv;
//       void main() {
//         vUv = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform sampler2D map;
//       uniform float brightness;
//       varying vec2 vUv;
//       void main() {
//         vec4 tex = texture2D(map, vUv);
//         tex.rgb *= brightness;
//         gl_FragColor = vec4(tex.rgb, tex.a * 0.55);
//       }
//     `,
//     transparent: true,
//     depthWrite: false,
//     depthTest: false,
//   });

//   // Helper to create cloud geometry (same as your original)
//   const createCloudGeometry = (
//     count: number,
//     rangeZ: number,
//     rangeX: number,
//     yOffset: number,
//     scaleMultiplier: number
//   ) => {
//     const geometry = new THREE.BufferGeometry();
//     const tempPlane = new THREE.PlaneGeometry(64, 64);
//     const positions: number[] = [];
//     const uvs: number[] = [];
//     const indices: number[] = [];
//     let indexOffset = 0;

//     for (let i = 0; i < count; i++) {
//       const x = Math.random() * rangeX - rangeX / 2;
//       const y = yOffset - Math.random() * Math.random() * 100;
//       const z = Math.random() * rangeZ - rangeZ / 2;
//       const rotation = Math.random() * Math.PI;
//       const scale = (Math.random() * 1.5 + 1.0) * scaleMultiplier;

//       const posAttr = tempPlane.attributes.position as THREE.BufferAttribute;
//       const uvAttr = tempPlane.attributes.uv as THREE.BufferAttribute;
//       const idx = tempPlane.index!;

//       for (let j = 0; j < posAttr.count; j++) {
//         const vx = posAttr.getX(j) * scale;
//         const vy = posAttr.getY(j) * scale;

//         const cos = Math.cos(rotation);
//         const sin = Math.sin(rotation);
//         const rx = vx * cos - vy * sin;
//         const ry = vx * sin + vy * cos;

//         positions.push(rx + x, ry + y, z);
//         uvs.push(uvAttr.getX(j), uvAttr.getY(j));
//       }

//       for (let j = 0; j < idx.count; j++) {
//         indices.push(idx.getX(j) + indexOffset);
//       }

//       indexOffset += posAttr.count;
//     }

//     geometry.setAttribute(
//       "position",
//       new THREE.Float32BufferAttribute(positions, 3)
//     );
//     geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
//     geometry.setIndex(indices);

//     return geometry;
//   };

//   const forwardClouds = createCloudGeometry(4000, 14000, 1000, 0.5, 1.0);
//   const sideClouds = createCloudGeometry(1800, 2000, 9000, 400, 3.2);

//   const target = useRef({ x: 0, y: 0 });
//   const lerpFactor = 0.08;

//   const zLoop = 8000;
//   const xLoop = 9000;

//   useFrame(({ mouse, clock }) => {
//     const elapsed = clock.getElapsedTime() * 10;

//     // Smooth mouse parallax
//     target.current.x += (mouse.x * 1200 - target.current.x) * lerpFactor;
//     target.current.y += (-mouse.y * 1300 - target.current.y) * lerpFactor;

//     // Infinite Z-axis clouds
//     if (group.current) {
//       const zPos = -((elapsed % zLoop) + zLoop) % zLoop; // seamless modulo
//       group.current.position.set(
//         target.current.x * 0.01,
//         target.current.y * 0.01,
//         zPos
//       );
//     }

//     // Infinite X-axis drifting clouds
//     if (sideGroup.current) {
//       const xPos = ((elapsed * 15.15) % xLoop) - xLoop / 2;
//       sideGroup.current.position.set(xPos, 350 + target.current.y * 0.02, 0);
//     }
//   });

//   return (
//     <>
//       <group ref={group} scale={1.5}>
//         <mesh geometry={forwardClouds} material={material} />
//       </group>

//       <group ref={sideGroup} scale={1.2}>
//         <mesh geometry={sideClouds} material={lightMaterial} />
//       </group>
//     </>
//   );
// }

//   useFrame(({ mouse, clock }) => {
//   const elapsed = clock.getElapsedTime() * 30; // Z speed multiplier

//   // --- NO MODULO ---
//   const zPosition = -elapsed; // Z-axis moves continuously
//   const xPosition = elapsed * 0.35; // X-axis moves continuously

//   // Mouse smoothing
//   target.current.x += (mouse.x * 1200 - target.current.x) * lerpFactor;
//   target.current.y += (-mouse.y * 1300 - target.current.y) * lerpFactor;

//   // Z-axis clouds
//   if (group.current) {
//     group.current.position.set(
//       target.current.x * 0.01,
//       target.current.y * 0.01,
//       zPosition
//     );
//     const second = group.current.children[1];
//     if (second) second.position.z = zPosition - 8000; // looped duplicate
//   }

//   // X-axis clouds
//   if (sideGroup.current) {
//     sideGroup.current.position.set(
//       xPosition,
//       350 + target.current.y * 0.02,
//       0
//     );
//     const second = sideGroup.current.children[1];
//     if (second) second.position.x = xPosition - 9000; // looped duplicate
//   }
// });

////...............................................................///

// export default function CloudField() {
//   const mesh1 = useRef<THREE.Mesh>(null!);
//   const mesh2 = useRef<THREE.Mesh>(null!);
//   const { camera } = useThree();

//   const texture = useTexture("/cloud10.png"); // must be in /public

//   const fog = new THREE.Fog(0x4584b4, -100, 3000);

//   const material = new THREE.ShaderMaterial({
//     uniforms: {
//       map: { value: texture },
//       fogColor: { value: fog.color },
//       fogNear: { value: fog.near },
//       fogFar: { value: fog.far },
//     },
//     vertexShader: `
//       varying vec2 vUv;
//       void main() {
//         vUv = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//       }
//     `,
//     fragmentShader: `
//       uniform sampler2D map;
//       uniform vec3 fogColor;
//       uniform float fogNear;
//       uniform float fogFar;
//       varying vec2 vUv;
//       void main() {
//         float depth = gl_FragCoord.z / gl_FragCoord.w;
//         float fogFactor = smoothstep(fogNear, fogFar, depth);
//         vec4 tex = texture2D(map, vUv);
//         tex.a *= pow(gl_FragCoord.z, 20.0);
//         gl_FragColor = mix(tex, vec4(fogColor, tex.a), fogFactor);
//       }
//     `,
//     depthWrite: false,
//     depthTest: false,
//     transparent: true,
//   });

//   // Build merged planes
//   const geometry = new THREE.BufferGeometry();
//   const tempPlane = new THREE.PlaneGeometry(64, 64);
//   const positions: number[] = [];
//   const uvs: number[] = [];
//   const indices: number[] = [];
//   let indexOffset = 0;

//   for (let i = 0; i < 8000; i++) {
//     const x = Math.random() * 1000 - 500;
//     const y = -Math.random() * Math.random() * 200 - 15;
//     const z = i;
//     const rotation = Math.random() * Math.PI;
//     const scale = Math.random() * Math.random() * 1.5 + 0.5;

//     // Clone plane vertices with transform
//     tempPlane.attributes.position.array.forEach; // just to hint

//     const posAttr = tempPlane.attributes.position as THREE.BufferAttribute;
//     const uvAttr = tempPlane.attributes.uv as THREE.BufferAttribute;
//     const idx = tempPlane.index!;

//     for (let j = 0; j < posAttr.count; j++) {
//       const vx = posAttr.getX(j) * scale;
//       const vy = posAttr.getY(j) * scale;

//       const cos = Math.cos(rotation);
//       const sin = Math.sin(rotation);
//       const rx = vx * cos - vy * sin;
//       const ry = vx * sin + vy * cos;

//       positions.push(rx + x, ry + y, z);
//       uvs.push(uvAttr.getX(j), uvAttr.getY(j));
//     }

//     for (let j = 0; j < idx.count; j++) {
//       indices.push(idx.getX(j) + indexOffset);
//     }

//     indexOffset += posAttr.count;
//   }

//   geometry.setAttribute(
//     "position",
//     new THREE.Float32BufferAttribute(positions, 3)
//   );
//   geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
//   geometry.setIndex(indices);

//   useFrame(({ mouse, clock }) => {
//     const elapsed = clock.getElapsedTime() * 30;
//     const position = elapsed % 8000;

//     camera.position.x += (mouse.x * 200 - camera.position.x) * 0.01;
//     camera.position.y += (-mouse.y * 100 - camera.position.y) * 0.01;
//     camera.position.z = -position + 8000;

//     if (mesh1.current) mesh1.current.position.z = 0;
//     if (mesh2.current) mesh2.current.position.z = -8000;
//   });

//   return (
//     <>
//       <mesh ref={mesh1} geometry={geometry} material={material} />
//       <mesh ref={mesh2} geometry={geometry} material={material} />
//     </>
//   );
// }
