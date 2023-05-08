"use client";
import Image from "next/image";
import styles from "./page.module.css";

import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { useRef, MutableRefObject } from "react";

import * as THREE from "three";
import { Mesh, Object3D } from "three";

import { OrbitControls, Stars } from "@react-three/drei";

const MyAnimatingTorus: React.FC = () => {
  type CustomMesh = Mesh & Object3D<Event>;
  const meshRef = useRef<THREE.Mesh>(null);

  {
    useFrame(() => {
      meshRef.current!.rotation.x += 0.01;
    });
    return (
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.4, 12, 48]} />
        <meshStandardMaterial color="lightpink" wireframe={true} />
      </mesh>
    );
  }
};

export default function Home() {
  return (
    <>
      <div className={styles.mainCanvas}>
        <Canvas id="mainCanvas">
          <directionalLight color="white" position={[0, 10, 15]} />
          {/* <mesh>
            <torusGeometry />
            <meshStandardMaterial color="lightpink" wireframe={true} />
          </mesh> */}
          <MyAnimatingTorus />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={8}
            saturation={0}
            fade
            speed={1}
          />
          <OrbitControls />
        </Canvas>
      </div>
    </>
  );
}
