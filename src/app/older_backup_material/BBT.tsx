import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import styles from './page.module.css'

const TorusPage: React.FC = () => {
  return (
    <div className={styles.mainCanvas}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <mesh>
          <primitive object={useLoader(GLTFLoader, "/bandy-bandy-torus.glb")} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default TorusPage;
