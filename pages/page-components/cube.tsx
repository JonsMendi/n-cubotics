import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import React from 'react';

type CubeProps = {
  angle: number;
  antialias?: boolean;
  shadows?: boolean;
};

const Cube = ({ angle, ...rest }: CubeProps) => {
  const cubeAnimationRef = useRef<THREE.Mesh>(null) as React.MutableRefObject<THREE.Mesh>;
  // Texture from image
  const texture = useMemo(() => new THREE.TextureLoader().load('/metal-gold.jpg'), []);

  useFrame(({ camera }) => {
    const cubeAnimation = cubeAnimationRef.current;
    if (cubeAnimation) {
      cubeAnimation.rotation.z = THREE.MathUtils.degToRad(angle);
      // Update camera position and rotation to Right-Hand coordinate system (+x -> forward, +y ->left, +z -> up)
      camera.position.set(0, 8, 0);
      camera.up.set(0, 0, 1);
      camera.lookAt(cubeAnimation.position);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault fov={50} />
      <mesh ref={cubeAnimationRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
};

export default React.memo(Cube);