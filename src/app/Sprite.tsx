import React, { forwardRef } from 'react'

import * as THREE from "three";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import styles from "./page.module.css";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import gsap from "gsap";

import { RepeatWrapping, TextureLoader } from "three";

type SpriteProps = {
  angle: number;
  menuItem: string;
  onClick?: React.MouseEventHandler<HTMLPreElement>;
};

const Sprite = forwardRef<THREE.Sprite | null, SpriteProps>(
  ({ angle, menuItem }, ref) => {
  const radius = 2.5;
  const x = radius * Math.sin(angle);
  const z = radius * Math.cos(angle);
  let sin_rotater = 0.1;
  const url = "/SPrite_1.png";
  const texture = useLoader(THREE.TextureLoader, url);

  const spriteRef = useRef<THREE.Sprite>() as MutableRefObject<THREE.Sprite>;

  const spriteRefs = useRef<(THREE.Sprite | null)[]>([]);

  

  useEffect(() => {
    spriteRefs.current.push(spriteRef.current);

    // console.log(localHover);

    return () => {
      const spriteIndex = spriteRefs.current.indexOf(spriteRef.current);
      if (spriteIndex !== -1) {
        spriteRefs.current.splice(spriteIndex, 1);
      }
    };
  }, []);

  // 

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const dpr = window.devicePixelRatio || 1;
  const canvasWidth = 200 * dpr;
  const canvasHeight = 60 * dpr;

  
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  
  context!.scale(dpr, dpr);

  // Draw the menu item on the canvas
  const fontSize = 8 * dpr;
  context!.font = `${fontSize}px Arial`;
  context!.fillStyle = "white";
  context!.fillText(menuItem, 10 * dpr, 20 * dpr);

  
  return (
    <sprite position={[0, z, x]} ref={spriteRef}>
      <spriteMaterial map={new THREE.CanvasTexture(context!.canvas)} />
      {/* <Html position={[0, 0, 0]}>
        <h1 style={{ color: "white" }}>{menuItem}</h1>
      </Html> */}
    </sprite>
  );
}
)
Sprite.displayName = "Sprite";


export default Sprite