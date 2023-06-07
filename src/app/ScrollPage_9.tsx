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
  const bandedDivsRef = useRef<Array<HTMLDivElement | null>>(
    Array(10).fill(null)
  );
  const [scrollY, setScrollY] = useState(0);
  const [fillOpacNumber, setfillOpacNumber]=useState(0)

  const texture = useLoader(TextureLoader, "/earth.jpg");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const menuItems = [
    "End poverty",
    "Clean, abundant water",
    // "Online government",
    // "Direct your taxes",
    // "Disclosure",
    // "Focus on peace",
    // "End the war on drugs",
    // "Free education",
    // "Free healthcare",
    // "No more jobs",
  ];

  // const textRefs = useRef<Array<React.MutableRefObject<Object3D | null>>>(
  //   menuItems.map(() => useRef<Object3D | null>(null))
  // );

  // const textRefs = useRef<Array<React.MutableRefObject<Object3D | null>>>(
  //   Array.from({ length: menuItems.length }, () =>
  //     useRef<Object3D | null>(null)
  //   )
  // );
  const textRefs = useRef<Array<React.MutableRefObject<Object3D | null>>>([]);

  // textRefs.current[0] = useRef<Object3D | null>(null);
  // textRefs.current[1] = useRef<Object3D | null>(null);

  for (let i = 0; i < menuItems.length; i++) {
    textRefs.current.push(useRef<Object3D | null>(null));
  }

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Configure the ScrollTrigger
    gsap.config({
      autoKillThreshold: 0.01,
    });

    // Define the animation for banded-div 0 (moving up the page)
    const bandedDiv0Animation = gsap.to(textRefs.current[0], {
      x: (scrollY + 1) * 3,
      duration: 1,
      opacity: 1,
      paused: true,
    });
    const bandedDiv1Animation = gsap.to(bandedDivsRef.current[1], {
      x: scrollY * -3,
      duration: 1,
      opacity: 1,
      paused: true,
    });
    let z_pos = -Math.PI;

    // Set up the ScrollTrigger
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top+=100",
      end: "top top+=200",
      onEnter: () => {
        if (
          scrollY >= 0 &&
          scrollY <= 100 &&
          textRefs.current[0].current &&
          textRefs.current[0].current.position.z < Math.PI
        ) {
          const textAnimation0 = () => {
            setfillOpacNumber(1)
           
            textRefs.current[0].current!.position.z =
              scrollY / 100;
          };

          textAnimation0();
        } else if (
          scrollY >= 100 &&
          scrollY <= 200 &&
          textRefs.current[1].current
        ) {
          const textAnimation1 = () => {
             textRefs.current[1].current!.position.z = scrollY / 100;
          }
          textAnimation1();
        }
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
  }, [scrollY]);

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
              ref={textRefs.current[index]}
              position={[0, 2, index]}
              scale={[0.1, 0.1, 0.1]}
              fillOpacity={fillOpacNumber}
              
            >
              {item}
            </Text>
          ))}
        </Canvas>
      </div>

      <div className={styles.container} ref={containerRef}>
        <div
          ref={(el) => (bandedDivsRef.current[0] = el)}
          className={styles["banded-div"]}
        >
          Div 1
        </div>
        <div
          ref={(el) => (bandedDivsRef.current[1] = el)}
          className={styles["banded-div"]}
        >
          Div 2
        </div>
        <div
          ref={(el) => (bandedDivsRef.current[2] = el)}
          className={styles["banded-div"]}
        >
          Div 3
        </div>
        {/* ... and so on */}
        {/* Display window.scrollY */}
        <div className={styles.scrollY}>{scrollY}</div>
      </div>
    </>
  );
};

export default ScrollPage;
