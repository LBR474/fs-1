import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import styles from "./page.module.css";
import { Stars } from "@react-three/drei";

const TorusPage: React.FC = () => {
  const model = useLoader(GLTFLoader, "/bandy-bandy-torus.glb");
  const torusRef = useRef<THREE.Mesh>(null);

  return (
    <div className={styles.mainCanvas}>
      <Canvas>
        {/* <ambientLight /> */}
        <pointLight position={[0, 1, 1]} />
        <pointLight position={[0, -1, 1]} />
        <mesh ref={torusRef}>
          <primitive object={model.scene.clone()} />
        </mesh>
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={8}
          saturation={0}
          fade
          speed={1}
        />
        <RotationAnimation torusRef={torusRef} />
      </Canvas>
    </div>
  );
};

const RotationAnimation: React.FC<{
  torusRef: React.RefObject<THREE.Mesh>;
}> = ({ torusRef }) => {
  useFrame(() => {
    if (torusRef.current) {
      // Adjust rotation speed and axis as needed
      torusRef.current.rotation.y += 0.01;
    }
  });

  return null;
};

export default TorusPage;
