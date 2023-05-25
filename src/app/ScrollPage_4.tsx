import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import Image from "next/image";

import {
  OrbitControls,
  Scroll,
  ScrollControls,
  Stars,
  Text,
  useScroll,
} from "@react-three/drei";
import styles from "./page.module.css";
import { setSyntheticTrailingComments } from "typescript";

type TextScrollerProps = {
  menuItems: string[];
  color?: string;
  startRotation?: boolean;
  laterUseRef?: React.RefObject<HTMLDivElement>;
  laterUseRefText?: React.RefObject<HTMLElement>;
  laterUseImgLablRef?: React.RefObject<HTMLParagraphElement>;
};

const TextScroller: React.FC<TextScrollerProps> = ({
  menuItems,
  color = "white",
  startRotation,
  laterUseRef,
  laterUseRefText,
  laterUseImgLablRef
}) => {
  const groupRef = useRef<THREE.Group | null>(null);
  const containerRef = useRef<THREE.Group | null>(null);
  const [frameCount, setFrameCount] = useState(0);

  const [displayText, setDisplayText] = useState("");

  useFrame(({ camera }) => {
    if (startRotation) {
      setFrameCount((prevFrameCount) => prevFrameCount + 0.01);
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

      if (text.position.z > 0.45 && text.position.y < 0.2 && text.position.y > -0.1) {
        if (material.color) {
          material.color.set("green");
          material.needsUpdate = true;
          console.log(laterUseRef)
           laterUseRef!.current!.textContent = menuItems[index].toString(); 
            laterUseImgLablRef!.current!.textContent = 'Image label for ' +
             menuItems[index].toString();

           (laterUseRefText!.current!.textContent =
             menuItems[index] +
             " and some more text for " +
             menuItems[index].toString())

            
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
  const rightDivRef = useRef<HTMLDivElement>(null);
  const rightDivRefHeading = useRef<HTMLHeadingElement>(null);
  const rightDivRefText = useRef<HTMLHeadingElement>(null);
  const imageLabelRef = useRef<HTMLParagraphElement>(null);

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

  type myImageProps = {
    label: string;
    labelRef: React.RefObject<HTMLParagraphElement>;
  };

  const MyImageComponent = ({label, labelRef }:myImageProps) => {
    return (
      <div className={styles["image-container"]}>
        <Image
          src="/earth.jpg" // Replace with the actual image path
          alt="Description of the image"
          width={200}
          height={200}
          className={styles["custom-image"]}
        />
        <p ref={labelRef}  className={styles["image-label"]}>
          {label}
        </p>
      </div>
    );
  };

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
          <Canvas>
            <directionalLight color="white" position={[0, 10, 15]} />
            <mesh
              onPointerOver={(e) => {
                setSR(true);
              }}
              onPointerOut={(e) => {
                console.log(e);
                setSR(false);
                console.log(SR);
              }}
            >
              <boxGeometry />
              <meshStandardMaterial />
            </mesh>
            <TextScroller
              menuItems={menuItems}
              color="white"
              startRotation={SR}
              laterUseRef={rightDivRefHeading}
              laterUseRefText={rightDivRefText}
              laterUseImgLablRef={imageLabelRef}
            />
            {/* <OrbitControls /> */}
          </Canvas>
        </div>
        <div className={styles.floatRight} ref={rightDivRef}>
          <h1 ref={rightDivRefHeading}></h1>
          <h3 ref={rightDivRefText}></h3>

          <MyImageComponent label="Image label" labelRef={imageLabelRef} />
        </div>
      </div>
    </>
  );
}
