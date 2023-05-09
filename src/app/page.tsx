"use client";
import styles from "./page.module.css";

import { Canvas, useFrame } from "@react-three/fiber";
import { forwardRef, RefObject, useEffect, useRef, useState } from "react";

import * as THREE from "three";
import { Mesh, Object3D, Vector3 } from "three";

import {
  OrbitControls,
  Scroll,
  ScrollControls,
  Stars,
  useScroll,
} from "@react-three/drei";

import gsap from "gsap";

type CustomMesh = THREE.Mesh<
  THREE.BufferGeometry<THREE.NormalBufferAttributes>,
  THREE.Material | THREE.Material[]
>;

type MyAnimatingTorusProps = {
  ref: RefObject<THREE.Mesh>;
};

const MyAnimatingTorus = forwardRef<CustomMesh, MyAnimatingTorusProps>(
  (props, ref) => {
    return (
      <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry />
        <meshStandardMaterial />
      </mesh>
    );
  }
);
MyAnimatingTorus.displayName = 'MyAnimatingTorus'
// Home component
export default function Home() {
  const homeMeshRef = useRef<THREE.Mesh>(null);

  const handleClick = () => {
    gsap.to(homeMeshRef.current!.rotation, {
      duration: 2,
      //x: Math.PI * 2,
      x: "+=2",
    });
  };

  return (
    <>
      <div className={styles.mainCanvas} onScroll={handleClick}>
        <button onClick={handleClick}>Rotate Torus</button>
        <Canvas>
          <directionalLight color="white" position={[0, 10, 15]} />

          {/* Render the MyAnimatingTorus component and pass the rotation value */}
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
    </>
  );
}

function setshouldSpin(arg0: boolean) {
  throw new Error("Function not implemented.");
}
