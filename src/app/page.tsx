"use client";
import styles from "./page.module.css";

import { Canvas, useFrame } from "@react-three/fiber";
import { forwardRef, RefObject, useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { Mesh, Object3D, RepeatWrapping, TextureLoader, Vector3 } from "three";

import {
  OrbitControls,
  Scroll,
  ScrollControls,
  Stars,
  useScroll,
} from "@react-three/drei";

import gsap from "gsap";

import ScrollPage from "./ScrollPage";

type CustomMesh = THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[]
>;

type MyAnimatingTorusProps = {
  ref: RefObject<THREE.Mesh>;
};

const MyAnimatingTorus = forwardRef<CustomMesh, MyAnimatingTorusProps>(
  (props, ref) => {
    const texture = new TextureLoader().load(
      "https://threejs.org/examples/textures/water.jpg"
    );
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(10, 10);

    return (
      <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry />
        <meshStandardMaterial map={texture} wireframe={true} />
      </mesh>
    );
  }
);
MyAnimatingTorus.displayName = "MyAnimatingTorus";
// Home component
export default function Home() {
  // handle scroll gesture

  const homeMeshRef = useRef<THREE.Mesh>(null);

  const handleClick = () => {
    console.log("Called");
    gsap.to(homeMeshRef.current!.rotation, {
      duration: 2,

      z: "+=2",
    });
  };

  return (
    <>
      {/* <ScrollPage /> */}
      <div className={styles.CContainer} onScroll={handleClick}>
        <div className={styles.mainCanvas} onScroll={handleClick}>
          <Canvas>
            <directionalLight color="white" position={[0, 10, 15]} />

            <MyAnimatingTorus ref={homeMeshRef} />

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
    </>
  );
}
