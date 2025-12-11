"use client";

import React, { Suspense, useRef } from "react";
import * as THREE from "three";
import Model from "./models/model";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
} from "@react-three/drei";

const ModelScene: React.FC = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '90vw',
        maxWidth: 600,
        height: 420,
        margin: '3rem auto 0',
        zIndex: 11,
      }}
    >
      <Canvas
        style={{
          width: "100%",
          height: "100%",
        }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.05} />
        <Suspense fallback={null}>
          <Model
            rotation={[
              Math.PI / 2,
              3 * (Math.PI / 2) * 1.1,
              (Math.PI / 4) * 1.1,
            ]}
          />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelScene;