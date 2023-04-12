import * as THREE from 'three';
import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as TWEEN from '@tweenjs/tween.js';

type CubeProps = {
  angle: number;
  antialias?: boolean;
  shadows?: boolean;
};

interface Rotation {
  z: number;
}

/**
 * The Cube class
 * @param param0 
 * @returns - the Cube object
 */
const Cube = ({ angle, ...rest }: CubeProps) => {
  const cubeAnimationRef = useRef<THREE.Mesh>(null);
  const currentRotationRef = useRef(0);
  const tweenRef = useRef<TWEEN.Tween<Rotation> | null>(null);
  const texture = useMemo(() => new THREE.TextureLoader().load('/metal-gold.jpg'), []);

  useEffect(() => {
    if (cubeAnimationRef.current && currentRotationRef.current !== angle) {
      if (tweenRef.current) {
        tweenRef.current.stop();
      }

      const startRotation = { z: cubeAnimationRef.current.rotation.z };
      const targetRotation = { z: -THREE.MathUtils.degToRad(angle) };

      // create animation with Tween.js for smooth rotation
      tweenRef.current = new TWEEN.Tween(startRotation)
        .to(targetRotation, 1000)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onUpdate(() => {
          if (cubeAnimationRef.current) {
            cubeAnimationRef.current.rotation.z = startRotation.z;
          }
        })
        .start();
      currentRotationRef.current = angle;
    }
  }, [angle]);


  useFrame(({ camera }) => {
    TWEEN.update();
    const cubeAnimation = cubeAnimationRef.current;
    
    if (cubeAnimation) {
      // Update camera position and rotation to Right-Hand coordinate system (+x -> forward, +y ->left, +z -> up)
      camera.position.set(0, 8, 0);
      camera.up.set(0, 0, 1);
      camera.lookAt(cubeAnimation.position);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault fov={50} />
      <mesh rotation={[0, 0, Math.PI / 4]} ref={cubeAnimationRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  );
};

export default Cube;
