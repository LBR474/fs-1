import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./STPage.module.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { Stars, Text } from "@react-three/drei";
import { Object3D, TextureLoader } from "three";

import * as THREE from "three";

const ScrollPage = () => {
  const containerRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [fillOpacNumber, setFillOpacNumber] = useState(0);

  // const texture = useLoader(TextureLoader, "/earth.jpg");
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.wrapT = THREE.RepeatWrapping;

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

  const textPositions = useRef<number[]>([]);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Configure the ScrollTrigger
    gsap.config({
      autoKillThreshold: 0.01,
    });

    textPositions.current = new Array(menuItems.length).fill(0);

    const positions = [...textPositions.current];

    menuItems.forEach((_, index) => {
      positions[index] = -index;
    });

    // Set up the ScrollTrigger
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top+=100",
      end: "top top+=200",
      onEnter: () => {
        const updateTextPositions = () => {
           const positions = [...textPositions.current];

           const positionOffset = scrollY / 100; // Adjust the scrollY value as needed

           menuItems.forEach((_, index) => {
             positions[index] = positionOffset - index;
           });

           // Update the text positions
           textPositions.current = positions;
        };

        updateTextPositions();
      },
    });

    // Scroll event listener to update scrollY
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the ScrollTrigger and scroll event listener when the component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY, menuItems]);

  const [texture, setTexture] = useState<THREE.Texture | undefined>(undefined); // Explicitly define the type

  useEffect(() => {
    const textureLoader = new TextureLoader();
    textureLoader.load("/earth.jpg", (loadedTexture) => {
      loadedTexture.wrapS = THREE.RepeatWrapping;
      loadedTexture.wrapT = THREE.RepeatWrapping;
      setTexture(loadedTexture);
    });
  }, []);

  return (
    <>
      <div className={styles.CanvasContainer}>
        <Canvas>
          <directionalLight
            color="white"
            intensity={0.5}
            position={[0, 10, 15]}
          />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={8}
            saturation={0}
            fade
            speed={1}
          />

          <mesh position={[0, 0, 0]}>
            <sphereGeometry />
            <meshStandardMaterial map={texture} />
          </mesh>
          {menuItems.map((item, index) => (
            <Text
              key={index}
              rotation={[0, 0, 0]}
              anchorX="center"
              anchorY="middle"
              fontSize={0.5}
              color="white"
              maxWidth={10}
              position={[0, 2, textPositions.current[index]]}
              scale={[0.1, 0.1, 0.1]}
              fillOpacity={1}
            >
              {item}
            </Text>
          ))}
        </Canvas>
      </div>

      <div className={styles.container} ref={containerRef}>
        {/* Display window.scrollY */}
        <div className={styles.scrollY}>{scrollY}</div>
      </div>
    </>
  );
};

export default ScrollPage;
