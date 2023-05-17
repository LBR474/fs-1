import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import styles from "./page.module.css";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React from "react";
import { ThreeEvent } from "@react-three/fiber";

function Torus(
  props: JSX.IntrinsicElements["mesh"] & { onTorusPointerOver: (isHovered: boolean,
    isHoveredBlue: boolean) => void;
  } 
) {
  const mesh = useRef<THREE.Mesh>(null!);
  const meshRed = useRef<THREE.Mesh>(null!);
  const meshBlue = useRef<THREE.Mesh>(null!);
  const [isHovered, setHovered] = useState(false);
  const [isHoveredBlue, setHoveredBlue] = useState(false);

  const handlePointerOver = () => {
    props.onTorusPointerOver(isHovered, isHoveredBlue);
  };

  useFrame(() => {
    if (isHovered && mesh.current) {
      mesh.current.rotation.y += 0.01;
    } else if (isHoveredBlue && mesh.current) {
      mesh.current.rotation.y -= 0.01;
    }
  });

  const glb = useLoader(GLTFLoader, "/bandy-bandy-torus.glb");

  return (
    <>
      <mesh
        {...props}
        ref={mesh}
        rotation={[Math.PI / 6, 0, 0]}
        position={[0, -1, 0]}
      >
        <primitive object={glb.scene.clone()} />
      </mesh>
      <mesh
        ref={meshRed}
        onPointerOver={() => {
          setHovered(true);
          props.onTorusPointerOver(true, false);
        }}
        onPointerOut={() => setHovered(false)}
        position={[0, -1, 0]}
        rotation={[Math.PI / -3, 0, Math.PI / 2]}
      >
        <torusGeometry args={[1, 0.25, 12, 16, 3.14]} />
        <meshStandardMaterial color={"red"} />
      </mesh>
      <mesh
        ref={meshBlue}
        onPointerOver={() => {
          setHoveredBlue(true);
          props.onTorusPointerOver(false, true);
        }}
        onPointerOut={() => setHoveredBlue(false)}
        position={[0, -1, 0]}
        rotation={[Math.PI / -3, 0, Math.PI / -2]}
      >
        <torusGeometry args={[1, 0.25, 12, 16, 3.14]} />
        <meshStandardMaterial color={"blue"} />
      </mesh>
    </>
  );
}

export default function BoxHome_4() {
  const BHdivMenuItems = [
    // <div style={{ color: "red" }}>Menu item one</div>,
    <div>Mouse over torus to scroll policies</div>,
    <div>End poverty</div>,
    <div>Clean, abundant water</div>,
    <div>Online government</div>,
    <div>Direct your taxes</div>,
    <div>Disclosure</div>,
    <div>Focus on peace</div>,
    <div>End the war on drugs</div>,
    <div>Free education</div>,
    <div>Free healthcare</div>,
    <div>No more jobs</div>,
  ];
  const [currentMenuItem, setCurrentMenuItem] = useState(BHdivMenuItems[0]);
  const [isHovered, setHovered] = useState(false);
  const [isHoveredBlue, setHoveredBlue] = useState(false);

  const handleTorusPointerOver = (
    isHovered: boolean,
    isHoveredBlue: boolean
  ) => {
    setCurrentMenuItem((prevMenuItem) => {
      const currentIndex = BHdivMenuItems.findIndex(
        (item) => item.props.children === prevMenuItem.props.children
      );
      let nextIndex;
      if (isHovered) {
        nextIndex = (currentIndex + 1) % BHdivMenuItems.length;
        
    
      } else if (isHoveredBlue) {
        nextIndex =
          (currentIndex - 1 + BHdivMenuItems.length) % BHdivMenuItems.length;
      } else {
        // No scrolling if neither isHovered nor isHoveredBlue is true
        return prevMenuItem;
      }
      return BHdivMenuItems[nextIndex];
    });
  };

  let menuItems = [
    "Mouse over torus to scroll policies",
    "End poverty",
    "End poverty",
    "Clean, abundant water",
    "Online government",
    "Direct your taxes",
    "Disclosure",
    "Focus on peace",
    "End the war on drugs",
    "Free education",
    "Free healthcare",
    "No more jobs",
  ];


  return (
    <>
      <div className={styles.floatLeft} style={{ flex: 1, height: "100vh" }}>
        <div className={styles.mmenuMessage}>{currentMenuItem}</div>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Torus
            position={[0, 0, 0]}
            onTorusPointerOver={handleTorusPointerOver}
            
          />
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
      <div className={styles.floatRight}>
        {/* <img src={menuImage} alt="Menu" style={{ width: "100%", height: "100%" }} /> */}
      </div>
    </>
  );
}
