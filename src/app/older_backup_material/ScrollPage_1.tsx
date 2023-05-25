"use client";
import styles from "./page.module.css";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { RepeatWrapping, TextureLoader } from "three";

import Sprite from "./Sprite";

import { Scroll, ScrollControls, Stars, useScroll } from "@react-three/drei";

import React from "react";

import gsap from "gsap";

type Props = {
  percentage: number;
};

const MyAnimatingTorus: React.FC<Props> = ({}) => {
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);

  const meshRef = useRef<THREE.Group>(null);

  const data = useScroll();

  const spriteGroupRef = useRef<THREE.Group | null>(null!);

  const spriteRefs = React.useRef<Array<THREE.Sprite | null>>([]);

  useFrame(() => {
    const { offset } = data;

    let rotation = offset * Math.PI * 2;
    let rotate_step = 0.62;
    let offset_step = 0.05;

    // Update the rotation of the torus
    if (spriteGroupRef.current) {
      if (offset <= offset_step) {
        rotation = rotate_step;
      } else if (offset > offset_step && offset <= offset_step * 2) {
        rotation = rotate_step * 2;
        gsap.to(spriteGroupRef.current.rotation, {
          x: rotation,
          duration: 1,
        });
      } else if (offset > offset_step * 2 && offset < offset_step * 3) {
        rotation = rotate_step * 3;
        gsap.to(spriteGroupRef.current.rotation, {
          x: rotation,
          duration: 1,
        });
      } else if (offset > offset_step * 3 && offset <= offset_step * 4) {
        rotation = rotate_step * 4;
        gsap.to(spriteGroupRef.current.rotation, {
          x: rotation,
          duration: 1,
        });
      } else if (offset > 0.4 && offset < 0.5) {
        rotation = rotate_step * 5;
        gsap.to(spriteGroupRef.current.rotation, {
          x: rotation,
          duration: 1,
        });
      } else if (offset > 0.5 && offset <= 0.6) {
        rotation = rotate_step * 6;
        gsap.to(spriteGroupRef.current.rotation, {
          x: rotation,
          duration: 1,
        });
      } else if (offset > 0.6 && offset < 0.7) {
        rotation = rotate_step * 7;
        gsap.to(spriteGroupRef.current.rotation, {
          x: rotation,
          duration: 1,
        });
      } else if (offset > 0.7 && offset <= 0.8) {
        rotation = rotate_step * 8;
        gsap.to(spriteGroupRef.current.rotation, {
          x: rotation,
          duration: 1,
        });
      } else if (offset > 0.8 && offset < 0.9) {
        rotation = rotate_step * 9;
        gsap.to(spriteGroupRef.current.rotation, {
          x: rotation,
          duration: 1,
        });
      } else if (offset > 0.9 && offset < 1.0) {
        rotation = rotate_step * 10;
        gsap.to(spriteGroupRef.current.rotation, {
          x: rotation,
          duration: 1,
        });
      } else {
        spriteGroupRef.current.rotation.x = rotation;
      }
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

  const texture = new TextureLoader().load("/earth.jpg");
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(1, 1);

  return (
    <>
      {""}

      <group ref={spriteGroupRef}>
        {menuItems.map((item, index) => (
          <group
            key={index}
            onClick={() => {
              setCurrentMenuItemIndex(index);
              console.log(currentMenuItemIndex);
              console.log(item);
            }}
          >
            <Sprite
              angle={index * 0.6}
              menuItem={item}
              key={index}
              ref={(sprite) => (spriteRefs.current[index] = sprite)}
            />
          </group>
        ))}
      </group>
    </>
  );
};

export default function HomeSP() {
  useEffect(() => {
    const floatRightDiv = document.querySelector("#floatRight");
    if (floatRightDiv) {
      floatRightDiv.innerHTML = "New content"; // Replace "New content" with the desired new content
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
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
          <Canvas id="mainCanvas">
            <directionalLight color="white" position={[0, 10, 15]} />
            <ScrollControls
              pages={1}
              damping={0.1}
              infinite={true}
              horizontal={false}
            >
              <Scroll>
                {/* Canvas contents in here will scroll along */}

                <MyAnimatingTorus percentage={0} />
              </Scroll>
            </ScrollControls>

            {/* <OrbitControls /> */}
          </Canvas>
        </div>
        <div className={styles.floatRight} id="floatRight">
          <h1>Online Government</h1>
          <h3>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
            mollitia, a expedita neque distinctio natus cupiditate, porro eius
            nostrum voluptatem accusantium ad aliquid autem commodi ex quis
            assumenda magni minima.
          </h3>
        </div>
      </div>
    </>
  );
}
