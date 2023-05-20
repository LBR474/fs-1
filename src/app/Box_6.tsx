import * as THREE from "three";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import styles from "./page.module.css";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React from "react";
import gsap from "gsap";

import { RepeatWrapping, TextureLoader } from "three";
//
//
//
//
//
//
//
//
//

function Torus(
  props: JSX.IntrinsicElements["mesh"] & {
    setisHoveredP: (arg0: boolean) => void;
  }
  // &
  // { isHoveredP: any; setisHoveredP: (arg0: boolean) => void }
) {
  const meshRed = useRef<THREE.Mesh>(null!);

 const spriteRefs = useRef<(THREE.Sprite | null)[]>([]);

  //const spriteRef = useRef<THREE.Sprite>(null!);

  const [isHovered, setHovered] = useState(false);

  let sin_rotater = 0.1;

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

  
  useFrame((state, delta) => {
    if (isHovered && meshRed.current) {
      meshRed.current.rotation.x += 0.01;

      const speed = 0.1; // Adjust the speed of circling
      const radius = 3; // Adjust the radius of the circle

      spriteRefs.current.forEach((spriteRef, index) => {
        if (spriteRef) {
          const angle =
            (state.clock.elapsedTime * speed +
              ((2 * Math.PI) / menuItems.length) * index) %
            (2 * Math.PI);
          const y = -radius * Math.sin(angle);
          const z = -radius * Math.cos(angle);

          spriteRef.position.y = -y;
          spriteRef.position.z = z;
        }
      });

      props.setisHoveredP(true);
    }
  });

  //
  //
  //
  //
  //
  //
  //
  //

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
         position={[0, -1, 4]}
        //rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1, 1]}
      >
        {/* <torusGeometry args={[1, 0.25, 12, 16, 6.28]} /> */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      {menuItems.map((menuItem, index) => {
        const angle = ((2 * Math.PI) / menuItems.length) * index;
        const radius = 3;
        const y = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = 600;
        canvas.height = 80;

        context!.font = "32px Arial"; // Increase the font size
        context!.fillStyle = "white";
        context!.textAlign = "center"; // Center the text horizontally
        
        context!.textBaseline = "middle"; // Center the text vertically

        const textWidth = context!.measureText(menuItem).width;
        const textHeight = context!.measureText("M").width; // Approximate height

        context!.fillText(menuItem, 300, 40);

        // Draw a border
        // context!.strokeStyle = "white";
        // context!.lineWidth = 2;
        // context!.strokeRect(0, 0, canvas.width, canvas.height);
        return (
          <sprite
            position={[0, y, z]}
            ref={(ref) => (spriteRefs.current[index] = ref)}
            key={index}
          >
            <spriteMaterial map={new THREE.CanvasTexture(context!.canvas)} />
          </sprite>
        );
      })}
    </>
  );
}

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
//

//function Sprite({ angle, menuItem }: { angle: number; menuItem: string }) {

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
//
//
//
//

export default function BoxHome_6() {
  const [isHoveredP, setisHoveredP] = useState(false);

  const spriteRefs = useRef<THREE.Sprite[]>([]);

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
          Mouse over Earth at the bottom of screen
        </div>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          <Torus
            position={[0, 0, 0]}
            onPointerOver={() => setisHoveredP(true)} // Start rotation on torus hover
            onPointerOut={() => setisHoveredP(false)} // Stop rotation on torus hover out
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
          {/* <OrbitControls /> */}
          {/* {menuItems.map((item, index) => (
            <Sprite
              key={index}
              angle={index * 0.6}
              menuItem={item}
              spriteRefs={spriteRefs}
              
            />
          ))} */}
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}
