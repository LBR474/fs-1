import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
import styles from "./pageResponsive.module.css";
import { setSyntheticTrailingComments } from "typescript";
import { Camera } from "three";

type TextScrollerProps = {
  menuItems: string[];
  color?: string;
  startRotation?: boolean;
  laterUseRef?: React.RefObject<HTMLDivElement>;
  laterUseRefText?: React.RefObject<HTMLElement>;
  laterUseImgLablRef?: React.RefObject<HTMLParagraphElement>;
  containerRef: React.RefObject<HTMLDivElement>;
};

const TextScroller: React.FC<TextScrollerProps> = ({
  menuItems,

  startRotation,
  laterUseRef,
  laterUseRefText,
  laterUseImgLablRef,
  containerRef,
}) => {
  const groupRef = useRef<THREE.Group | null>(null);

  const [frameCount, setFrameCount] = useState(0);

  const { camera } = useThree();
 

  useFrame(({}) => {
    if (startRotation) {
      setFrameCount((prevFrameCount) => prevFrameCount + 0.01);
    } else {
      setFrameCount(frameCount);
    }
  });

  useEffect(() => {
    const angleIncrement = (2 * Math.PI) / menuItems.length;
    let circleRadius = 2;
    const rotationOffset = Math.PI / 2;

    const containerWidth = containerRef.current?.clientWidth || 0;

    groupRef.current!.rotation.y = rotationOffset;

    const prevZPositions: number[] = [];


    


    groupRef.current!.children.forEach((text, index) => {
      let mesh = text as THREE.Mesh; // Cast text to Mesh

      if (containerWidth < 580) {
        text.scale.set(0.5, 0.5, 0.5);
        circleRadius = 1;
        
      } else {
        text.scale.set(1.0, 1.0, 1.0);
      }

      const material = mesh.material as THREE.MeshBasicMaterial; // Cast material to MeshBasicMaterial
      let angle = frameCount + index * angleIncrement;

      text.position.x = Math.cos(angle) * circleRadius; // Adjust x position based on angle
      text.position.y = Math.sin(angle) * circleRadius; // Adjust y position based on angle
      text.position.z = (Math.cos(angle) * -circleRadius) / 4;
      if (index == 0){
        console.log(text.position.z)
      }
      

      

      if (text.position.z > 0.225 * circleRadius) {
        if (material.color) {
          material.color.set("green");
          material.needsUpdate = true;

          laterUseRef!.current!.textContent = menuItems[index].toString();
          //laterUseRef!.current!.style.background = "red";
          laterUseImgLablRef!.current!.textContent =
            "Image label for " + menuItems[index].toString();

          laterUseRefText!.current!.textContent =
            menuItems[index] +
            " and some more text for " +
            menuItems[index].toString();
        }
      } else  {
        material.color.set("white");
        material.needsUpdate = true;
      }

      text.rotation.y = Math.PI / -2;
    });
  }, [frameCount, menuItems, containerRef.current!.clientWidth]);

  return (
    <group ref={groupRef}>
      {menuItems.map((item, index) => (
        <Text
          key={index}
          fontSize={0.2}
          font="/fonts/Lato-Roboto/Lato/Lato-Light.ttf"
          anchorX="center"
          anchorY="middle"
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

  const MyImageComponent = ({ label, labelRef }: myImageProps) => {
    return (
      <div className={styles["image-container"]}>
        <Image
          src="/earth.jpg" // Replace with the actual image path
          alt="Description of the image"
          width={200}
          height={200}
          className={styles["custom-image"]}
        />
        <p ref={labelRef} className={styles["image-label"]}>
          {label}
        </p>
      </div>
    );
  };

  const CustomMesh = () => {
    const { viewport } = useThree();

    const handlePointerOver = () => {
      setSR(true);
    };

    const handlePointerOut = () => {
      setSR(false);
    };

    return (
      <>
        <Text
          color="white" // Set the color of the text
          fontSize={1} // Adjust the font size of the text
          anchorX="center" // Center the text horizontally
          anchorY="bottom" // Align the first line to the bottom
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          Mouse over here
        </Text>
        <Text
          color="white" // Set the color of the text
          fontSize={1} // Adjust the font size of the text
          anchorX="center" // Center the text horizontally
          anchorY="top" // Align the second line to the top
        >
          to scroll menu
        </Text>
      </>
    );
  };

  return (
    <>
      {/* <Canvas id="mainCanvas">
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={8}
            saturation={0}
            fade
            speed={1}
          />
        </Canvas> */}

      <div className={styles.container} ref={containerRef}>
        <div className={styles.header}>
          <h1>Cory Armbrecht</h1>
        </div>
        <div className={styles.floatLeft}>
          <div className={styles.topCorner}>
            <Canvas
              onPointerOver={() => {
                setSR(true);
              }}
              onPointerOut={() => {
                setSR(false);
              }}
            >
              <directionalLight color="white" position={[0, 10, 15]} />

              <CustomMesh />
            </Canvas>
          </div>
          <div className={styles.floatLeftInner}>
            <Canvas>
              <directionalLight color="white" position={[0, 10, 15]} />

              <group position={[0, 1, 0]}>
                <TextScroller
                  menuItems={menuItems}
                  color="white"
                  startRotation={SR}
                  laterUseRef={rightDivRefHeading}
                  laterUseRefText={rightDivRefText}
                  laterUseImgLablRef={imageLabelRef}
                  containerRef={containerRef}
                />
              </group>
              {/* <OrbitControls /> */}
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
        </div>
        <div
          className={styles.floatRight}
          ref={rightDivRef}
          style={{ backgroundColor: "transparent" }}
        >
          <h1 ref={rightDivRefHeading}></h1>

          <MyImageComponent label="Image label" labelRef={imageLabelRef} />
          <h3 ref={rightDivRefText}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
            voluptatem suscipit illo fugiat eveniet! Quod enim aliquam,
            voluptatem molestiae omnis consequuntur sunt a optio, rem,
            dignissimos expedita necessitatibus reiciendis ducimus.
          </h3>
        </div>
        {/* <div className={styles.textContainer} ref={rightDivRefText}>
          <h3>all the section body text goes in here.</h3>
        </div> */}
      </div>
    </>
  );
}
