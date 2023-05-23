import React, { MutableRefObject, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  Html,
  Scroll,
  ScrollControls,
  Stars,
  useScroll,
} from "@react-three/drei";
import styles from "./page.module.css";

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

type SpriteProps = {
  menuItems: string[];
  onClick?: () => void;
};

const SpriteComponent: React.FC<SpriteProps> = ({ menuItems }) => {
  const spriteRefs = useRef<(THREE.Sprite | null)[]>([]);
  const spriteGroupRef = useRef<THREE.Group>(null!);

  const data = useScroll();

  useFrame((state, delta) => {
    const { offset } = data;
    console.log(state)
    // Calculate the rotation angle based on the scroll offset
    const rotation = offset * Math.PI * 2;

    // Update the rotation of the torus
    if (spriteGroupRef.current) {
      
      spriteGroupRef.current.rotation.x = rotation;
      
      //spriteGroupRef.current.rotation.x += Math.PI / 6;
    }
  });
  interface MyHtmlProps {
    angle: number;
    children: React.ReactNode;
    onClick?: () => void;
  }

  //const myHtmlRefs = menuItems.map(() => useRef<THREE.Sprite | null>(null!));


  const MyHtml = React.forwardRef(
    ({ angle, children }: MyHtmlProps, ref: React.Ref<THREE.Sprite>) => {
      const radians = angle * (Math.PI / 180);
      const y = Math.cos(radians) * 2; // Adjust the radius of the ring
      const z = Math.sin(radians) * 2; // Adjust the radius of the ring

      return (
        <Html position={[0, y, z]}
        >
          <div 
          onClick={() => {console.log("clicked")}}
          style={{ color: "white" }}>{children}</div>
        </Html>
      );
    }
  );



  
  return (
    <group ref={spriteGroupRef}>
      {menuItems.map((item, index) => (
        <group
          key={index}
          // rotation={[0, Math.PI / 1, 0]}
        >
          <MyHtml
            //ref={myHtmlRefs[index]}
            angle={index * 36}
            onClick={() => console.log("Clicked")}
          >
            {item}
          </MyHtml>
        </group>
      ))}
    </group>
  );
};



function Foo(props: ScrollControlsProps) {
  const ref = useRef();
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
  return <mesh  {...props} />;
}

export default function HomeSP() {
  
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

  return (
    <>
      <div className={styles.floatLeft}>
        <Canvas id="mainCanvas" gl={{ antialias: false }} dpr={[1, 1.5]}>
          <directionalLight color="white" position={[0, 10, 15]} />
          <ScrollControls
            pages={1}
            damping={0.1}
            infinite={true}
            horizontal={false}
          >
            <Foo >
              <group>
                <SpriteComponent
                  menuItems={menuItems}
                  onClick={() => {
                    return console.log("clicked");
                  }}
                />
              </group>
            </Foo>
          </ScrollControls>
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
      <div className={styles.floatRight}>
        <h1>Online Government</h1>
        <h3>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
          mollitia, a expedita neque distinctio natus cupiditate, porro eius
          nostrum voluptatem accusantium ad aliquid autem commodi ex quis
          assumenda magni minima.
        </h3>
      </div>
    </>
  );
}
