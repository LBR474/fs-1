import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
  const [fillOpacNumber, setFillOpacNumber] = useState(1);

  

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
  const textYPositions = useRef<number[]>([]);
  const textXPositions = useRef<number[]>([]);

  useEffect(() => {
    
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Configure the ScrollTrigger
    gsap.config({
      autoKillThreshold: 0.01,
    });

    textPositions.current = new Array(menuItems.length).fill(0);
    textYPositions.current = new Array(menuItems.length).fill(0);
    textXPositions.current = new Array(menuItems.length).fill(0);

    // Set up the ScrollTrigger
    ScrollTrigger.create({
      trigger: containerRef.current,
      //start: "top top+=100",
      // end: "top top+=200",
      onEnter: () => {
        const updateTextPositions = () => {
          const positions = [...textPositions.current];
          const Ypositions = [...textYPositions.current];
          const Xpositions = [...textXPositions.current];

          const positionOffset = scrollY / 100; // Adjust the scrollY value as needed

          menuItems.forEach((_, index) => {
            const textRef = textRefs.current[index];
            if (textRef && index == 0) {
              const boundingBox = new THREE.Box3().setFromObject(textRef);
              // positions[index] = boundingBox.min.z;
              // Ypositions[index] = Math.cos(positionOffset - index) + 1;
              setFillOpacNumber(1);
              console.log("TextRef position", textRef.position);
            }

            positions[index] = positionOffset - index;
            Ypositions[index] = Math.cos(positionOffset - index) + 1;
            if (positionOffset - index > 3) {
              Xpositions[index] = 0;
            } else {
              Xpositions[index] = positionOffset - index;
            }
          });

          // Update the text positions
          textPositions.current = positions;
          textYPositions.current = Ypositions;
          textXPositions.current = Xpositions;
          console.log(
            "Z positions:",
            positions,
            "Y positions:",
            Ypositions,
            "X positions:",
            [...Xpositions]
          );
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const textureLoader = new TextureLoader();
    textureLoader.load("/earth.jpg", (loadedTexture) => {
      loadedTexture.wrapS = THREE.RepeatWrapping;
      loadedTexture.wrapT = THREE.RepeatWrapping;
      setTexture(loadedTexture);
      setIsLoading(false); // Set loading state to false once the texture is loaded
    });
  }, []);
  const textRefs = useRef<Array<any>>([]);

  const [screenWidthReact, setscreenWidthreact] = useState(1);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const[y_pos, set_y_pos] = useState(0.0)

  const MeshRef = useRef<THREE.Mesh>(null)

   useEffect(() => {

     
     const handleResize = () => {
      if (windowWidth < 780) {
        if (MeshRef.current) {
          gsap.to(MeshRef.current.scale, {
            duration: 1.5,
            x: 0.5,
            y: 0.5,
            z: 0.5,
          });
        }
        set_y_pos(-0.5);
        console.log(windowWidth);
      } else {
        if (MeshRef.current) {
          gsap.to(MeshRef.current.scale, {
            duration: 1.5,
            x: 1.0,
            y: 1.0,
            z: 1.0,
          });
        }
      }
     };

     window.addEventListener("resize", handleResize);

     const checkScreenWidth = () => {
       if (windowWidth < 780) {
         handleResize();
       }
     };
    

     return () => {
       window.removeEventListener("resize", handleResize);
     };
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

          {!isLoading && ( // Render the mesh only when the texture is loaded
            <mesh ref ={MeshRef}
              position={[0, 1, 0]}
              scale={[screenWidthReact, screenWidthReact, screenWidthReact]}
            >
              <sphereGeometry />
              <meshStandardMaterial map={texture} />
            </mesh>
          )}
          {menuItems.map((item, index) => (
            <Text
              key={index}
              rotation={[0, 0, 0]}
              anchorX="center"
              anchorY="middle"
              fontSize={0.5}
              color="white"
              maxWidth={10}
              position={[
                0,

                y_pos + textYPositions.current[index],
                textPositions.current[index],
              ]}
              scale={[0.1, 0.1, 0.1]}
              fillOpacity={1}
              ref={(ref) => (textRefs.current[index] = ref)}
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
