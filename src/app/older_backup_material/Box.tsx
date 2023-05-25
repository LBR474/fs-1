import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import styles from "./page.module.css";
import { TextureLoader, RepeatWrapping, ShaderMaterial } from "three";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Torus(
  props: ThreeElements["mesh"],
  forwardedRef: React.ForwardedRef<THREE.Mesh>
) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const glb = useLoader(GLTFLoader, "/bandy-bandy-torus.glb");

 

  

const [revSpin, setRevSpin] = useState(false)
  useFrame((state, delta) => {
    if (hovered 
      //&& revSpin
      ) {
      mesh.current.rotation.y += delta; 
      
    } else if (hovered 
      //&& !revSpin
      ) {
      mesh.current.rotation.y -= delta;
    }
  });

  // Use the forwardRef function to forward the ref to the mesh component
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      rotation={[Math.PI / 6, 0, 0]}
      position={[0, -1, 0]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => {
        if (!hovered) {
          setHover(true);
          if (event.clientX > 600) {
            setRevSpin(true);
          } else {
            setRevSpin(false);
          }
        }
      }}
      onPointerOut={() => {
        setHover(false);
      }}
    >
      <primitive object={glb.scene.clone()} />
    </mesh>
  );
}
Torus.displayName = "Torus";
//
//
//
//
//
//
//
//
//
//
//
// BoxHome function area begins
//
//
//
//
//
//
//
//


// Use the React.forwardRef function to create a new component that forwards the ref to the Torus component
const ForwardedTorus = React.forwardRef(Torus);

export default function BoxHome() {
  const torusRef = useRef<THREE.Mesh>(null);

  const [messageHovered, setMessageHover] = useState(true);
  const [hoverCount, setHoverCount] = useState(-1);
  const menuItems = [
    "Menu Item One",
    "Menu Item Two",
    "Menu Item Three",
    "Menu Item Four",
    "Menu Item Five",
    "Menu Item Six",
    "Menu Item Seven",
    "Menu Item Eight",
    "Menu Item Nine",
    "Menu Item Ten",
  ];

  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0, y: 0 });
 const handleTorusHover = () => {
   if (hoverCount === -1) {
     setHoverCount(0);
     setMessageHover(false);
   } else {
     setTimeout(() => {
       setHoverCount((hoverCount + 1) % menuItems.length);
       setMessageHover(false);
     }, 200); // Adjust the delay (in milliseconds) between each menu item appearance if needed
   }
 };

 
  return (
    <>
      <div
        className={styles.CContainer}
        onPointerEnter={(event) => setMessageHover(true)}
      >
        <div className={styles.mmenuMessage}>
          {!messageHovered ? (
            <h2>{menuItems[hoverCount % menuItems.length]}</h2>
          ) : (
            <h2>Mouse over torus to see menu items</h2>
          )}
        </div>
        <Canvas 
        //onPointerMove={handlePointerMove}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <ForwardedTorus
            ref={torusRef}
            position={[0, 0, 0]}
            onPointerEnter={() => {
              handleTorusHover();
              // Call your second function here
            }}
            // onPointerMove={(e) => {
            //   setMouseCoordinates({ x: e.clientX, y: e.clientY });
              
            // }}
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
