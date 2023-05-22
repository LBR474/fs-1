"use client";
import styles from "./page.module.css";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, useRef } from "react";

import * as THREE from "three";
import { Mesh, Object3D, RepeatWrapping, TextureLoader } from "three";

import Sprite from "./Sprite";

import {
  Html,
  OrbitControls,
  Scroll,
  ScrollControls,
  Stars,
  useScroll,
} from "@react-three/drei";
import Link from "next/dist/client/link";
import React from "react";

type Props = {
  percentage: number;
};

type ScrollControlsProps = {
  /** Precision, default 0.00001 */
  eps?: number;
  /** Horizontal scroll, default false (vertical) */
  horizontal?: boolean;
  /** Infinite scroll, default false (experimental!) */
  infinite?: boolean;
  /** Defines the length of the scroll area, each page is height:100%, default 1 */
  pages?: number;
  /** A factor that increases scroll bar travel, default 1 */
  distance?: number;
  /** Friction in seconds, default: 0.2 (1/5 second) */
  damping?: number;
  /** maxSpeed optionally allows you to clamp the maximum speed. If damping is 0.2s and looks OK
   *  going between, say, page 1 and 2, but not for pages far apart as it'll move very rapid,
   *  then a maxSpeed of e.g. 0.1 which will clamp the speed to 0.1 units per second, it may now
   *  take much longer than damping to reach the target if it is far away. Default: Infinity */
  maxSpeed?: number;
  enabled?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const MyAnimatingTorus: React.FC<Props> = ({ percentage }) => {
  const meshRef = useRef<THREE.Group>(null);
  const data = useScroll();

  const spriteRef = useRef<THREE.Sprite>() as MutableRefObject<THREE.Sprite>;

  const spriteGroupRef = useRef<(THREE.Group | null)>(null!);

  const spriteRefs = React.useRef<Array<THREE.Sprite | null>>([]);

  useFrame(() => {
    const { offset } = data;

    // Calculate the rotation angle based on the scroll offset
    const rotation = offset * Math.PI * 2;

    // Update the rotation of the torus
    if (meshRef.current && spriteGroupRef.current) {
      meshRef.current.rotation.y = rotation;
      spriteGroupRef.current.rotation.x = rotation;
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
      <group ref={meshRef}>
        <mesh rotation={[0, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial map={texture} />
        </mesh>
      </group>
      <group
          ref={spriteGroupRef} >
      {menuItems.map((item, index) => (
        <group
          
          key={index}
          onClick={(e) => {
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

function Foo(props: ScrollControlsProps) {
  const ref = useRef<THREE.Group>(null);
  const data = useScroll();

 
  return <group ref={ref} {...props} />;
}
export default function HomeSP() {
  const spriteRefs = useRef<(THREE.Sprite | null)[]>([]);

  
  return (
    <>
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
              <Foo>
                <MyAnimatingTorus percentage={0.0001} />
              </Foo>
            </Scroll>
            
          </ScrollControls>
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
        </Canvas>
      </div>
    </>
  );
}
