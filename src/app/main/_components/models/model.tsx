"use client";

import * as THREE from "three";
import React, { forwardRef, useMemo } from "react";
import { useRouter } from "next/navigation";

const Model = forwardRef<
  THREE.Group,
  JSX.IntrinsicElements["group"]
>(function Model(props, ref) {
  const router = useRouter();

  // Create dotted texture canvas for elegant appearance
  const textureCanvas = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#d0d0d0';
    const dotSize = 8;
    for (let x = 0; x < 256; x += dotSize) {
      for (let y = 0; y < 256; y += dotSize) {
        if (Math.random() > 0.3) {
          ctx.fillRect(x, y, dotSize - 1, dotSize - 1);
        }
      }
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const cubeSize = 1.45;
  const halfSize = cubeSize / 2;

  const cubes = useMemo(() => {
    const positions: [number, number, number][] = [
      [-halfSize, -halfSize, -halfSize],
      [halfSize, -halfSize, -halfSize],
      [-halfSize, halfSize, -halfSize],
      [halfSize, halfSize, -halfSize],
      [-halfSize, -halfSize, halfSize],
      [halfSize, -halfSize, halfSize],
      [-halfSize, halfSize, halfSize],
      [halfSize, halfSize, halfSize],
    ];
    const colors = [
      '#CA6885', // Pink
      '#81967A', // Light Green
      '#A99466', // Tan
      '#3C80A4', // Dusty Blue
      '#D8A0F5', // Lavender
      '#88FFB1', // Teal
      '#00A0A0', // Dark Grey
      '#CA6885', // Orange
    ];
    return positions.map((position, i) => ({
      position,
      color: colors[i],
      index: i,
    }));
  }, []);

  const getLink = (index: number) => {
    const links = ['/about-us', '/events', '/gallery', '/projects', '/about-us', '/events', '/gallery', '/projects'];
    return links[index] || '/';
  };

  return (
    <group ref={ref} {...props} dispose={null}>
      {cubes.map((cube) => (
        <mesh
          key={cube.index}
          position={cube.position}
          onClick={() => router.push(getLink(cube.index))}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
          <meshStandardMaterial
            color={cube.color}
            map={textureCanvas}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
});

export default Model;
