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



const TextGeometry = forwardRef<THREE.Mesh | null, SpriteProps>(
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

    
    return (
      <mesh>
        <TextGeometry angle={0} menuItem={'Some Text'} />
        <meshStandardMaterial />
      </mesh>
    );
  }
)
TextGeometry.displayName = "Sprite";


export default TextGeometry