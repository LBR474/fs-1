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

import OnPointerOverPage from "./OnPointerOverPage";

import BoxHome from "./Box";

//
//
//
//
//
//
//

// Home component



export default function Home() {
  // handle scroll gesture

  return (
    <>
      {/* <ScrollPage /> */}
      {/* <OnPointerOverPage /> */}
      <BoxHome />
      {/* <div className={styles.CContainer} onPointerEnter={handleOpacity}>
        <div
          className={styles.mainCanvas}
          onPointerEnter={handleTorusOver}
          onPointerLeave={handleMouseOut}
        >
          <div className={styles.mmenuMessage} ref={opacityDivRef}>
            {!isTorusHovered && <h2> mouse over torus to see menu items</h2>}
          </div>
          <Canvas>
            <directionalLight color="white" position={[0, 10, 15]} />

            <group onPointerOver={handleMouseOver}>
              <MyAnimatingTorus ref={homeMeshRef} />
            </group>

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
      </div> */}
    </>
  );
}
