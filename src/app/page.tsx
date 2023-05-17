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

// import ScrollPage from "./ScrollPage";

// import OnPointerOverPage from "./OnPointerOverPage";

//import BoxHome from "./Box";

import BoxHome_3 from "./Box_3";

import BoxHome_4 from "./Box_4";

//import TorusPage from "./BBT";

//import TorusPage from "./Bandy";


//
//
//
//
//
//
//

// Home component

// {
//   /* <BoxHome_3 /> */
// }

export default function Home() {
   

   
  return (
    <>
      <BoxHome_3 />
    </>
  );
}
