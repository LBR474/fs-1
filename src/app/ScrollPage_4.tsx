import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  OrbitControls,
  Scroll,
  ScrollControls,
  Stars,
  Text,
  useScroll,
} from "@react-three/drei";
import styles from "./page.module.css";

type TextScrollerProps = {
  menuItems: string[];
  color?: string;
  startRotation?: boolean;
};

const TextScroller: React.FC<TextScrollerProps> = ({
  menuItems,
  color = "white",
  startRotation,
}) => {
  const groupRef = useRef<THREE.Group | null>(null);
  const [frameCount, setFrameCount] = useState(0);

  useFrame(({ camera }) => {
    if (startRotation) {
      setFrameCount((prevFrameCount) => prevFrameCount + 0.001);
    } else {
      setFrameCount(frameCount);
    }
  });

  useEffect(() => {
    const angleIncrement = (2 * Math.PI) / menuItems.length;
    const circleRadius = 2;
    const rotationOffset = Math.PI / 2;

    groupRef.current!.rotation.y = rotationOffset;

    const positions: { name: string; position: THREE.Vector3 }[] = []; // Array to store positions with names

    groupRef.current!.children.forEach((text, index) => {
      const mesh = text as THREE.Mesh; // Cast text to Mesh
      const material = mesh.material as THREE.MeshBasicMaterial; // Cast material to MeshBasicMaterial
      let angle = frameCount + index * angleIncrement;

      text.position.x = Math.cos(angle) * circleRadius; // Adjust x position based on angle
      text.position.y = Math.sin(angle) * circleRadius; // Adjust y position based on angle
      text.position.z = (Math.cos(angle) * -circleRadius) / 4;

      if (text.position.z > 0.45) {
        if (material.color) {
          material.color.set("green");
          material.needsUpdate = true;
        }
      } else {
         material.color.set("white");
         material.needsUpdate = true;
      }

      text.rotation.y = Math.PI / -2;

      const position = new THREE.Vector3(
        text.position.x,
        text.position.y,
        text.position.z
      );

      const item = {
        name: menuItems[index],
        position: position,
      };

      positions.push(item); // Store position in the array

      text.position.copy(position);
    });
    console.log(positions);
  }, [frameCount, menuItems]);
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

  return (
    <group ref={groupRef}>
      {menuItems.map((item, index) => (
        <Text
          key={index}
          fontSize={0.2}
          font="/fonts/Lato-Roboto/Lato/Lato-Light.ttf"
          anchorX="center"
          anchorY="middle"
          //position={[index - 5, -index, 0]}
        >
          {item}
        </Text>
      ))}
    </group>
  );
};
TextScroller.displayName = "TextScroller";

export default function HomeSP() {
  const [SR, setSR] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const COLOR_CHANGE_BREAKPOINT_IN_PX = 800;
  const LIGHT_COLOR = "#dfdfdf";
  const DARK_COLOR = "#424241";

  const [backgroundColor, setBackgroundColor] = useState(LIGHT_COLOR);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > COLOR_CHANGE_BREAKPOINT_IN_PX) {
        setBackgroundColor(LIGHT_COLOR);
      } else {
        setBackgroundColor(DARK_COLOR);
      }
    };

    window.addEventListener("resize", onResize);
  }, []);

  // set the correct color by default
  useEffect(() => {
    if (window.innerWidth > COLOR_CHANGE_BREAKPOINT_IN_PX) {
      setBackgroundColor(LIGHT_COLOR);
    } else {
      setBackgroundColor(DARK_COLOR);
    }
  }, []);

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

  return (
    <>
      <div className={styles.container} ref={containerRef}>
        <Canvas id="mainCanvas">
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
        <div className={styles.floatLeft}>
          <Canvas
            onPointerOver={(e) => {
              console.log(e);
              setSR(true);
              console.log(SR);
            }}
            onPointerOut={(e) => {
              console.log(e);
              setSR(false);
              console.log(SR);
            }}
          >
            <directionalLight color="white" position={[0, 10, 15]} />

            <TextScroller
              menuItems={menuItems}
              color="white"
              startRotation={SR}
            />
            <OrbitControls />
          </Canvas>
        </div>
        <div className={styles.floatRight}>
          <h1>Online Government</h1>
          <h3>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
            mollitia, a expedita neque distinctio natus cupiditate, porro eius
            nostrum voluptatem accusantium ad aliquid autem commodi ex quis
            assum
          </h3>
        </div>
      </div>
    </>
  );
}
