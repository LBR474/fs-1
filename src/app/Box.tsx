import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import styles from "./page.module.css";
import { TextureLoader, RepeatWrapping } from "three";

function Torus(
  props: ThreeElements["mesh"],
  forwardedRef: React.ForwardedRef<THREE.Mesh>
) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  //useFrame((state, delta) => (mesh.current.rotation.z += delta));

  const texture = new TextureLoader().load(
    "https://threejs.org/examples/textures/water.jpg"
  );
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(10, 10);

  useFrame((state, delta) => {
    if (hovered) {
      mesh.current.rotation.z += delta; // Adjust the rotation as needed
    }
  });

  // Use the forwardRef function to forward the ref to the mesh component
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      rotation={[Math.PI / -3, 0, 0]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)
      }
      onPointerOut={(event) => setHover(false)}
    >
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial
        map={texture}
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
}
Torus.displayName = 'Torus'

// Use the React.forwardRef function to create a new component that forwards the ref to the Torus component
const ForwardedTorus = React.forwardRef(Torus);

export default function BoxHome() {
  const torusRef = useRef<THREE.Mesh>(null);
  const [messageHovered, setMessageHover] = useState(true);
  const [hoverCount, setHoverCount] = useState(0);
  const handleTorusHover = () => {
    
    if (hoverCount === 0) {
      setMessageHover(false);
    }
    setHoverCount(hoverCount + 1);
  };
  return (
    <>
      <div
        className={styles.CContainer}
        onPointerEnter={(event) => setMessageHover(true)}
      >
        <div className={styles.mmenuMessage}>
          {!messageHovered ? (
            <h2>{hoverCount === 1 ? "Menu Item One" : "Menu Item Two"}</h2>
          ) : (
            <h2>mouse over torus to see menu items</h2>
          )}
        </div>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <ForwardedTorus
            ref={torusRef}
            position={[0, 0, 0]}
            onPointerEnter={handleTorusHover}
          />

          {/* <Box position={[1.2, 0, 0]} /> */}

          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={8}
            saturation={0}
            fade
            speed={1}
          />
        </Canvas>
      </div>
    </>
  );
}
