import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useRef } from "react";

// export default function CloudField() {
//   const group = useRef<THREE.Group>(null!); // group for all clouds
//   const horizontalGroup = useRef<THREE.Group>(null!); // group for horizontal clouds

//   const texture = useTexture("/img/cloud10.png");
//   const fog = new THREE.Fog(0x4584b4, -100, 3000);

//   // Adjustable Y positions for both cloud layers
//   const verticalCloudsYPosition = -35; // Adjust this for vertical clouds Y position
//   const horizontalCloudsYPosition = 80; // Adjust this for horizontal clouds base Y position

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

//   // Build merged planes for vertical clouds (original)
//   const verticalGeometry = new THREE.BufferGeometry();
//   const tempPlane = new THREE.PlaneGeometry(64, 64);
//   const positions: number[] = [];
//   const uvs: number[] = [];
//   const indices: number[] = [];
//   let indexOffset = 0;

//   for (let i = 0; i < 8000; i++) {
//     const x = Math.random() * 1000 - 500;
//     const y = -Math.random() * Math.random() * 200 + verticalCloudsYPosition; // Use variable
//     const z = i;
//     const rotation = Math.random() * Math.PI;
//     const scale = Math.random() * Math.random() * 1.5 + 0.5;

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

//   verticalGeometry.setAttribute(
//     "position",
//     new THREE.Float32BufferAttribute(positions, 3)
//   );
//   verticalGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
//   verticalGeometry.setIndex(indices);

//   // Build merged planes for horizontal clouds (new)
//   const horizontalGeometry = new THREE.BufferGeometry();
//   const horizontalPositions: number[] = [];
//   const horizontalUvs: number[] = [];
//   const horizontalIndices: number[] = [];
//   let horizontalIndexOffset = 0;

//   // Horizontal clouds - similar count but different distribution
//   const horizontalCloudCount = 3000;
//   const horizontalWidth = 4000; // Total width for horizontal clouds

//   for (let i = 0; i < horizontalCloudCount; i++) {
//     const x = Math.random() * horizontalWidth - horizontalWidth / 2; // Spread across X axis
//     const y = Math.random() * 80 + horizontalCloudsYPosition; // Use variable for base Y position
//     const z = Math.random() * 400 - 200; // Random Z position within range
//     const rotation = Math.random() * Math.PI;
//     const scale = Math.random() * 0.8 + 0.7; // Good size: 0.7-1.5

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

//       horizontalPositions.push(rx + x, ry + y, z);
//       horizontalUvs.push(uvAttr.getX(j), uvAttr.getY(j));
//     }

//     for (let j = 0; j < idx.count; j++) {
//       horizontalIndices.push(idx.getX(j) + horizontalIndexOffset);
//     }

//     horizontalIndexOffset += posAttr.count;
//   }

//   horizontalGeometry.setAttribute(
//     "position",
//     new THREE.Float32BufferAttribute(horizontalPositions, 3)
//   );
//   horizontalGeometry.setAttribute(
//     "uv",
//     new THREE.Float32BufferAttribute(horizontalUvs, 2)
//   );
//   horizontalGeometry.setIndex(horizontalIndices);

//   const target = useRef({ x: 0, y: 0 });
//   const lerpFactor = 0.08;

//   useFrame(({ mouse, clock }) => {
//     const elapsed = clock.getElapsedTime() * 20;
//     const zPosition = -(elapsed % 8000); // move vertical group along Z

//     // Horizontal clouds movement: left to right
//     const xPosition = -(elapsed * 0.5) % horizontalWidth; // Left to right movement

//     // Smooth mouse movement with easing
//     target.current.x += (mouse.x * 1200 - target.current.x) * lerpFactor;
//     target.current.y += (-mouse.y * 1300 - target.current.y) * lerpFactor;

//     if (group.current) {
//       group.current.position.set(
//         target.current.x * 0.01,
//         target.current.y * 0.01,
//         zPosition
//       );
//     }

//     if (horizontalGroup.current) {
//       horizontalGroup.current.position.set(
//         -xPosition, // Move from left to right
//         target.current.y * 0.005, // Slight vertical mouse follow
//         0 // No Z movement for horizontal clouds
//       );
//     }
//   });

//   return (
//     <>
//       {/* Original vertical moving clouds */}
//       <group ref={group} scale={2.5}>
//         <mesh geometry={verticalGeometry} material={material} />
//         <mesh
//           geometry={verticalGeometry}
//           material={material}
//           position={[0, 0, -8000]}
//         />
//       </group>

//       {/* New horizontal moving clouds - proper size, moving left to right */}
//       <group ref={horizontalGroup}>
//         <mesh geometry={horizontalGeometry} material={material} />
//         <mesh
//           geometry={horizontalGeometry}
//           material={material}
//           position={[horizontalWidth, 0, 0]}
//         />
//       </group>
//     </>
//   );
// }

//.......Fuller No Interaction version

export default function CloudField() {
  console.log("mounted");

  const group = useRef<THREE.Group>(null!); // Z-axis clouds
  const sideGroup = useRef<THREE.Group>(null!); // X-axis clouds

  const texture = useTexture("/img/cloud10.png");
  texture.colorSpace = THREE.SRGBColorSpace;

  const fog = new THREE.Fog(0x4584b4, -100, 3000);

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
    transparent: true,
    depthWrite: false,
    depthTest: true,
  });

  const lightMaterial = new THREE.ShaderMaterial({
    uniforms: {
      map: { value: texture },
      brightness: { value: 1.6 },
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
      uniform float brightness;
      varying vec2 vUv;
      void main() {
        vec4 tex = texture2D(map, vUv);
        tex.rgb *= brightness;
        gl_FragColor = vec4(tex.rgb, tex.a * 0.55);
      }
    `,
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });

  // Helper to create cloud geometry (same as your original)
  const createCloudGeometry = (
    count: number,
    rangeZ: number,
    rangeX: number,
    yOffset: number,
    scaleMultiplier: number
  ) => {
    const geometry = new THREE.BufferGeometry();
    const tempPlane = new THREE.PlaneGeometry(64, 64);
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];
    let indexOffset = 0;

    for (let i = 0; i < count; i++) {
      const x = Math.random() * rangeX - rangeX / 2;
      const y = yOffset - Math.random() * Math.random() * 100;
      const z = Math.random() * rangeZ - rangeZ / 2;
      const rotation = Math.random() * Math.PI;
      const scale = (Math.random() * 1.5 + 1.0) * scaleMultiplier;

      const posAttr = tempPlane.attributes.position as THREE.BufferAttribute;
      const uvAttr = tempPlane.attributes.uv as THREE.BufferAttribute;
      const idx = tempPlane.index!;

      for (let j = 0; j < posAttr.count; j++) {
        const vx = posAttr.getX(j) * scale;
        const vy = posAttr.getY(j) * scale;

        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);
        const rx = vx * cos - vy * sin;
        const ry = vx * sin + vy * cos;

        positions.push(rx + x, ry + y, z);
        uvs.push(uvAttr.getX(j), uvAttr.getY(j));
      }

      for (let j = 0; j < idx.count; j++) {
        indices.push(idx.getX(j) + indexOffset);
      }

      indexOffset += posAttr.count;
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);

    return geometry;
  };

  const forwardClouds = createCloudGeometry(4000, 4000, 1000, 0.5, 1.0);
  const sideClouds = createCloudGeometry(1800, 2000, 9000, 400, 3.2);

  const target = useRef({ x: 0, y: 0 });
  const lerpFactor = 0.08;

  const zLoop = 8000;
  const xLoop = 9000;

  useFrame(({ mouse, clock }) => {
    const elapsed = clock.getElapsedTime() * 30;

    // Smooth mouse parallax
    target.current.x += (mouse.x * 1200 - target.current.x) * lerpFactor;
    target.current.y += (-mouse.y * 1300 - target.current.y) * lerpFactor;

    // Infinite Z-axis clouds
    if (group.current) {
      const zPos = -((elapsed % zLoop) + zLoop) % zLoop; // seamless modulo
      group.current.position.set(
        target.current.x * 0.01,
        target.current.y * 0.01,
        zPos
      );
    }

    // Infinite X-axis drifting clouds
    if (sideGroup.current) {
      const xPos = ((elapsed * 5.15) % xLoop) - xLoop / 2;
      sideGroup.current.position.set(xPos, 350 + target.current.y * 0.02, 0);
    }
  });

  return (
    <>
      <group ref={group} scale={1.5}>
        <mesh geometry={forwardClouds} material={material} />
      </group>

      <group ref={sideGroup} scale={1.2}>
        <mesh geometry={sideClouds} material={lightMaterial} />
      </group>
    </>
  );
}

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
