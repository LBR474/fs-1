import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import styles from "./page.module.css";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React from "react";
import { ThreeEvent } from "@react-three/fiber";

function Torus(props: JSX.IntrinsicElements["mesh"]) {
  const mesh = useRef<THREE.Mesh>(null!);
  const meshRed = useRef<THREE.Mesh>(null!);
  const meshBlue = useRef<THREE.Mesh>(null!);
  const [isHovered, setHovered] = useState(false);
  const [isHoveredBlue, setHoveredBlue] = useState(false);
  const [spinDirection, setSpinDirection] = useState(1);
  const box = useRef<THREE.Box3>(new THREE.Box3());
 
  const menuItems = [
    "Menu item one",
    "Menu item two",
    "Menu item three",
    "Menu item four",
    "Menu item five",
    "Menu item six",
    "Menu item seven",
    "Menu item eight",
    "Menu item nine",
    "Menu item ten",
  ];

  useFrame(() => {
    if (isHovered && mesh.current) {
      mesh.current.rotation.y += 0.01;
     
    } else if (isHoveredBlue && mesh.current) {
      mesh.current.rotation.y -= 0.01;
     
    }
  });

useEffect(() => {
  const mmenuMessage = document.querySelector(
    `.${styles.mmenuMessage}`
  ) as HTMLDivElement;

  const startMenuItem = mmenuMessage.textContent || "";
  let index = menuItems.indexOf(startMenuItem);

  let interval: NodeJS.Timeout | null = null;

  const changeMenuItem = () => {
    if (isHovered) {
      index = (index + 1) % menuItems.length;
    } else if (isHoveredBlue) {
      index = (index - 1 + menuItems.length) % menuItems.length;
    }
    mmenuMessage.textContent = menuItems[index];
  };

  const startChangingMenuItems = () => {
    interval = setInterval(changeMenuItem, 500);
  };

  const stopChangingMenuItems = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  startChangingMenuItems();

  return stopChangingMenuItems;
}, [isHovered, isHoveredBlue, menuItems]);




  

 
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




export default function BoxHome_3() {
  
  useEffect(() => {
    const mmenuMessage = document.querySelector(
      `.${styles.mmenuMessage}`
    ) as HTMLDivElement;
    if (mmenuMessage) {
      mmenuMessage.textContent = "Menu item one";
    }
  }, []);

 return (
   <>
     <div className={styles.CContainer}>
       <div className={styles.mmenuMessage}></div>
       <Canvas>
         <ambientLight />
         <pointLight position={[10, 10, 10]} />

         <Torus position={[0, 0, 0]}  />

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
