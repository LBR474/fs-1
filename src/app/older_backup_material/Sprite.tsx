import React, { forwardRef } from 'react'

import * as THREE from "three";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import styles from "./page.module.css";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import gsap from "gsap";

import { RepeatWrapping, TextureLoader, Vector2 } from "three";

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

    context!.scale(1, 1);

    // Draw the menu item on the canvas
    const fontSize = 8 * dpr;
    context!.font = `${fontSize}px Arial`;
    context!.fillStyle = "white";
    context!.fillText(menuItem, 10 * dpr, 20 * dpr);

    // Draw the border
    const borderWidth = 1 * dpr;
    const borderColor = "red";
    context!.lineWidth = borderWidth;
    context!.strokeStyle = borderColor;
    context!.strokeRect(0, 0, canvasWidth, canvasHeight);

    let center = new Vector2(0.5, 0.5)
    const [hovered, setHovered] = useState(false);


    return (
      <sprite center={center} scale={[1, 1, 1]} position={[0, z, x]} ref={spriteRef}>
        <spriteMaterial map={new THREE.CanvasTexture(context!.canvas)} />
        {/* <Html position={[0, 0.5, 0.5]}>
          <div
            style={{
              color: "white",
              borderRight: "1px solid white", // Add right border
              borderBottom: "1px solid white", // Add bottom border
              padding: "4px", // Add padding to create space between borders and content
              background: hovered ? "gray" : "transparent",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <h1 style={{ color: "white" }}>{menuItem}</h1>
          </div>
        </Html> */}
      </sprite>
    );
  }
)
Sprite.displayName = "Sprite";


export default Sprite