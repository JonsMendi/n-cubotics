import { PerspectiveCamera } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as TWEEN from '@tweenjs/tween.js';
import { RefObject, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

type CubeProps = {
  angle: number;
  antialias?: boolean;
  shadows?: boolean;
  baudRate: number;
  readMode: 'increment' | 'random';
  cubeAnimationRef: RefObject<THREE.Mesh>;
};

interface Rotation {
  z: number;
}

/**
 * Cube component
 * @param param0 
 * @returns - the Cube object
 */
function Cube ({ angle, baudRate, readMode, cubeAnimationRef }: CubeProps) {
  // Create references for the mesh, current rotation, and tween
  const currentRotationRef = useRef(0);
  const tweenRef = useRef<TWEEN.Tween<Rotation> | null>(null);

  // Calculate the duration of the transition based on the baud rate and read mode
  const baseDuration = readMode === 'random' ? 1000 : 100;
  const transitionDuration = baseDuration / (baudRate / 9600);

  // Access the camera from the three.js scene
  const { camera } = useThree();

  // Set the camera position and rotation for the Right-Hand coordinate system
  useEffect(() => {
    camera.position.set(-8, 0, 0);
    camera.up.set(0, 0, 1);
  }, [camera]);

  // If the angle has changed, create and start the tween animation
  useEffect(() => {
    if (cubeAnimationRef.current && currentRotationRef.current !== angle) {
      if (tweenRef.current) {
        tweenRef.current.stop();
      }

      // Calculate the shortest angle for the rotation
      const startRotation = { z: cubeAnimationRef.current.rotation.z };
      const targetAngleRad = -THREE.MathUtils.degToRad(angle);
      const diff = (targetAngleRad - startRotation.z) % (2 * Math.PI);
      const shortestAngle = ((diff + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
      const targetRotation = { z: startRotation.z + shortestAngle };

      // Create the tween animation for smooth rotation
      tweenRef.current = new TWEEN.Tween(startRotation)
        .to(targetRotation, transitionDuration)
        .easing(TWEEN.Easing.Sinusoidal.Out)
        .onUpdate(() => {
          if (cubeAnimationRef.current) {
            cubeAnimationRef.current.rotation.z = startRotation.z;
          }
        })
        .onComplete(() => {
          currentRotationRef.current = angle;
        })
        .start();
    }
  }, [angle, cubeAnimationRef, transitionDuration]);

  // Update the tween animation on every frame
  useFrame(() => {
    TWEEN.update();
  });

  // Load the texture for the cube
  const texture = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new THREE.TextureLoader().load('/marmore.jpg');
    }
  }, []);  
  
  return (
    <>
      <group>
        <PerspectiveCamera makeDefault fov={20} />
        <mesh  rotation={[0, 0, Math.PI / 4]} ref={cubeAnimationRef}>
          <boxGeometry args={[2, 2, 2]} />
          <meshLambertMaterial emissive="#000000" reflectivity={0.886} combine={THREE.MultiplyOperation} vertexColors={false} map={texture} />
        </mesh>
      </group>
    </>
  );
};

export default Cube;
