import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import styles from "./page.module.css";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React from "react";
import gsap from "gsap";
import ReactDOM from "react-dom";


function Torus(
  props: JSX.IntrinsicElements["mesh"] & {
    setisHoveredP: (arg0: boolean) => void;
  } & { isHoveredP: any; setisHoveredP: (arg0: boolean) => void }
) {
  const mesh = useRef<THREE.Mesh>(null!);
  const meshRed = useRef<THREE.Mesh>(null!);
  const meshBlue = useRef<THREE.Mesh>(null!);
  const [isHovered, setHovered] = useState(false);
  const [isHoveredBlue, setHoveredBlue] = useState(false);

  const mmenuMessageRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (isHovered && mesh.current) {
      mesh.current.rotation.y += 0.01;
      props.setisHoveredP(true);
      console.log(props.isHoveredP);
    } else if (isHoveredBlue && mesh.current) {
      mesh.current.rotation.y -= 0.01;
    }
  });

  useEffect(() => {
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

    const mmenuMessage = document.querySelector(
      `.${styles.mmenuMessage_1}`
    ) as HTMLDivElement;

    let startMenuItem = mmenuMessage?.textContent || "";

    if (!startMenuItem) {
      startMenuItem = menuItems[0];
    }
    let index = -1; // Set initial index to -1 (invalid index)
    let interval: NodeJS.Timeout | null = null;

    const changeMenuItem = () => {
      if (isHovered) {
        index = (index + 1) % menuItems.length;
        if (mmenuMessage) {
           mmenuMessage.innerHTML = `<div class="${styles.subDiv}">${menuItems[index]}</div>`;
        }
      } else if (isHoveredBlue) {
        index = (index - 1 + menuItems.length) % menuItems.length;
        if (mmenuMessage) {
          mmenuMessage.innerHTML = `<div>${menuItems[index]}</div>`;
        }
      } else {
        // Torus is not hovered, clear the mmenuMessage_1 div
        if (mmenuMessage) {
          mmenuMessage.innerHTML = "";
        }
      }
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
  }, [isHovered, isHoveredBlue]);

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

export default function BoxHome_4() {
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
