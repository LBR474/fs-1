import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import styles from "./page.module.css";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React from "react";
import gsap from "gsap";

import { RepeatWrapping, TextureLoader } from "three";


function Torus(
  props: JSX.IntrinsicElements["mesh"] & {
    setisHoveredP: (arg0: boolean) => void;
  } & { isHoveredP: any; setisHoveredP: (arg0: boolean) => void }
) {
  
  const meshRed = useRef<THREE.Mesh>(null!);
  
  const [isHovered, setHovered] = useState(false);
  

  // const mmenuMessageRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (isHovered && meshRed.current) {
      meshRed.current.rotation.x += 0.01;
      props.setisHoveredP(true);
      //console.log(props.isHoveredP);
    } 
  });

  function Sprite({}) {
    const url = "/earth.jpg"
    const texture = useLoader(THREE.TextureLoader, url);
    return (
      <sprite>
        <spriteMaterial map={texture} />
      </sprite>
    );
  }


  
    const menuItems = [
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

    
   
  const glb = useLoader(GLTFLoader, "/bandy-bandy-torus.glb");
  const texture = new TextureLoader().load("/earth.jpg");
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, 1);


  return (
    <>
      <mesh
        ref={meshRed}
        onPointerOver={() => {
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        position={[0, -2.5, 3]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1, 1]}
      >
        {/* <torusGeometry args={[1, 0.25, 12, 16, 6.28]} /> */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
   <Sprite />
    </>
  );
}


export default function BoxHome_5() {
  const [isHoveredP, setisHoveredP] = useState(false);

  useEffect(() => {
    const openingMessage = document.querySelector(
      `.${styles.openingMessage}`
    ) as HTMLDivElement;
    // if (mmenuMessage) {
    //   mmenuMessage.textContent = "Menu item one";
    // }
    if (isHoveredP) {
      gsap.to(openingMessage, {
        opacity: 0,
        duration: 3,
      });
    }
  }, [isHoveredP]);

  return (
    <>
      <div className={styles.floatLeft}>
        <div className={styles.mmenuMessage_1}></div>
        <div className={styles.openingMessage}>
          Mouse over torus to see policies
        </div>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          <Torus
            position={[0, 0, 0]}
            isHoveredP={isHoveredP}
            setisHoveredP={setisHoveredP}
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
    </>
  );
}
