"use client";
import styles from "./page.module.css";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

import * as THREE from "three";
import { Mesh, Object3D } from "three";

import { OrbitControls, Scroll, ScrollControls, Stars, useScroll } from "@react-three/drei";


type Props = {
  
  percentage: number
};

type ScrollControlsProps = {
  /** Precision, default 0.00001 */
  eps?: number;
  /** Horizontal scroll, default false (vertical) */
  horizontal?: boolean;
  /** Infinite scroll, default false (experimental!) */
  infinite?: boolean;
  /** Defines the length of the scroll area, each page is height:100%, default 1 */
  pages?: number;
  /** A factor that increases scroll bar travel, default 1 */
  distance?: number;
  /** Friction in seconds, default: 0.2 (1/5 second) */
  damping?: number;
  /** maxSpeed optionally allows you to clamp the maximum speed. If damping is 0.2s and looks OK
   *  going between, say, page 1 and 2, but not for pages far apart as it'll move very rapid,
   *  then a maxSpeed of e.g. 0.1 which will clamp the speed to 0.1 units per second, it may now
   *  take much longer than damping to reach the target if it is far away. Default: Infinity */
  maxSpeed?: number;
  enabled?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
};
const MyAnimatingTorus: React.FC<Props> = ({percentage}) => {
  type CustomMesh = Mesh & Object3D<Event>;
  const meshRef = useRef<THREE.Mesh>(null);
  

  {
    useFrame(() => {
      //meshRef.current!.rotation.x += 0.01;
    });
    return (
      <mesh ref={meshRef}>
        <torusGeometry args={[1, 0.4, 12, 48]} />
        <meshStandardMaterial color="lightpink" wireframe={true} />
      </mesh>
    );
  }
};

function Foo(props: ScrollControlsProps) {
  const ref = useRef<THREE.Mesh>(null);
  const data = useScroll();
  useFrame(() => {
    // data.offset = current scroll position, between 0 and 1, dampened
    // data.delta = current delta, between 0 and 1, dampened

    // Will be 0 when the scrollbar is at the starting position,
    // then increase to 1 until 1 / 3 of the scroll distance is reached
    const a = data.range(0, 1 / 3);
    // Will start increasing when 1 / 3 of the scroll distance is reached,
    // and reach 1 when it reaches 2 / 3rds.
    const b = data.range(1 / 3, 1 / 3);
    // Same as above but with a margin of 0.1 on both ends
    const c = data.range(1 / 3, 1 / 3, 0.1);
    // Will move between 0-1-0 for the selected range
    const d = data.curve(1 / 3, 1 / 3);
    // Same as above, but with a margin of 0.1 on both ends
    const e = data.curve(1 / 3, 1 / 3, 0.1);
    // Returns true if the offset is in range and false if it isn't
    const f = data.visible(2 / 3, 1 / 3);
    // The visible function can also receive a margin
    const g = data.visible(2 / 3, 1 / 3, 0.1);
  });
  return <mesh ref={ref} {...props} />;
}

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
          <ScrollControls pages={3} damping={0.1} horizontal={true}>
            <Scroll>
              <MyAnimatingTorus percentage={0.0001} />
            </Scroll>
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={8}
              saturation={0}
              fade
              speed={1}
            />
          </ScrollControls>
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </>
  );
}
