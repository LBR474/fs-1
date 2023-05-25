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

  const spriteRefs = useRef<THREE.Sprite[]>([]);

  const [isHovered, setHovered] = useState(false);

  // const mmenuMessageRef = useRef<HTMLDivElement>(null);

  function Sprite({
    angle,
    menuItem,
    spriteRefs,
  }: {
    angle: number;
    menuItem: string;
    spriteRefs: React.MutableRefObject<THREE.Sprite[]>;
  }) {
    const radius = 3.5;
    const x = radius * Math.sin(angle);
    const z = radius * Math.cos(angle);
    let sin_rotater = 0.1;
    const url = "/SPrite_1.png";
    const texture = useLoader(THREE.TextureLoader, url);

    const spriteRef = useRef<THREE.Sprite>() as MutableRefObject<THREE.Sprite>;

    useEffect(() => {
      spriteRefs.current.push(spriteRef.current);

      // console.log(localHover);

      return () => {
        const spriteIndex = spriteRefs.current.indexOf(spriteRef.current);
        if (spriteIndex !== -1) {
          spriteRefs.current.splice(spriteIndex, 1);
        }
      };
    }, []);

    useFrame((state, delta) => {
      sin_rotater += 0.01;
      if (spriteRef.current) {
        spriteRefs.current.forEach((sprite, index) => {
          const radius = 5; // adjust the radius as needed
          const angle =
            sin_rotater + (index * (Math.PI * 2)) / spriteRefs.current.length;
          const x = sprite.position.x;
          const y = Math.cos(angle) * -radius; // Keep the initial y-position unchanged
          const z = sprite.position.z; // Keep the initial z-position unchanged

          sprite.position.x = x;
          sprite.position.y = y;
          sprite.position.z = z;
          //sprite.rotation.x += 0.01; // Adjust the rotation speed as needed
        });
      } else {
        spriteRefs.current.forEach((sprite) => {
          // Reset the sprite positions
          sprite.position.x = 0;
          sprite.position.y = 0;
          sprite.position.z = 0;
        });
      }
    });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = 200;
    canvas.height = 40;

    // Draw the menu item on the canvas
    context!.font = "16px Arial";
    context!.fillStyle = "white";
    context!.fillText(menuItem, 10, 20);

    {
      /* <spriteMaterial map={new THREE.CanvasTexture(context!.canvas)} /> */
    }

    return (
      <sprite position={[0, z, x]} ref={spriteRef}>
        <spriteMaterial map={new THREE.CanvasTexture(context!.canvas)} />
      </sprite>
    );
  }

  useFrame(() => {
    if (isHovered && meshRed.current) {
      meshRed.current.rotation.x += 0.01;

      props.setisHoveredP(true);

     
     
    }
  });

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
        // position={[0, -2, 3]}
        //rotation={[0, Math.PI / 2, 0]}
        scale={[1, 1, 1]}
      >
        {/* <torusGeometry args={[1, 0.25, 12, 16, 6.28]} /> */}
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {menuItems.map((item, index) => (
            <Sprite
              key={index}
              angle={index * 0.6}
              menuItem={item}
              spriteRefs={spriteRefs}
              
            />
          ))}

      {/* {menuItems.map((item, index) => (
        <Sprite key={index} angle={index * 0.6} menuItem={item} />
      ))} */}
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
function Sprite({
  angle,
  menuItem,
  spriteRefs,
  
  
}: {
  angle: number;
  menuItem: string;
  spriteRefs: React.MutableRefObject<THREE.Sprite[]>;
  
  
}) {
  const radius = 3.5;
  const x = radius * Math.sin(angle);
  const z = radius * Math.cos(angle);
  let sin_rotater = 0.1;
  const url = "/SPrite_1.png";
  const texture = useLoader(THREE.TextureLoader, url);

  const spriteRef = useRef<THREE.Sprite>() as MutableRefObject<THREE.Sprite>;

  

  useEffect(() => {
    spriteRefs.current.push(spriteRef.current);
    
    
    // console.log(localHover);

    return () => {
      const spriteIndex = spriteRefs.current.indexOf(spriteRef.current);
      if (spriteIndex !== -1) {
        spriteRefs.current.splice(spriteIndex, 1);
      }
    };
  }, []);

  useFrame((state, delta) => {
    sin_rotater += 0.01;
    if (spriteRef.current) {
      
      spriteRefs.current.forEach((sprite, index) => {
        const radius = 5; // adjust the radius as needed
        const angle =
          sin_rotater + (index * (Math.PI * 2)) / spriteRefs.current.length;
        const x = sprite.position.x;
        const y = Math.cos(angle) * -radius; // Keep the initial y-position unchanged
        const z = sprite.position.z; // Keep the initial z-position unchanged

        sprite.position.x = x;
        sprite.position.y = y;
        sprite.position.z = z;
        //sprite.rotation.x += 0.01; // Adjust the rotation speed as needed
      });
    } else {
      
      spriteRefs.current.forEach((sprite) => {
        // Reset the sprite positions
        sprite.position.x = 0;
        sprite.position.y = 0;
        sprite.position.z = 0;
      });
    }
  });

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = 200;
  canvas.height = 40;

  // Draw the menu item on the canvas
  context!.font = "16px Arial";
  context!.fillStyle = "white";
  context!.fillText(menuItem, 10, 20);

  {
    /* <spriteMaterial map={new THREE.CanvasTexture(context!.canvas)} /> */
  }

  return (
    <sprite position={[0, z, x]} ref={spriteRef}>
      <spriteMaterial map={new THREE.CanvasTexture(context!.canvas)} />
    </sprite>
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
//
//
//

export default function BoxHome_5() {
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
