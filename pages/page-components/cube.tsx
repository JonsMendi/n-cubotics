import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';

type CubeProps = {
  angle: number;
};

const Cube = ({ angle }: CubeProps) => {
  const cubeAnimationRef = useRef<THREE.Mesh>(null) as React.MutableRefObject<THREE.Mesh>;

  useFrame(({ camera }) => {
    const cubeAnimation = cubeAnimationRef.current;
    if (cubeAnimation) {
      cubeAnimation.rotation.z = THREE.MathUtils.degToRad(angle);
      // Update camera position and rotation
      camera.position.set(0, 8, 0);
      camera.up.set(0, 0, 1);
      camera.lookAt(cubeAnimation.position);
    }
  });

  // Texture from image
  const texture = new THREE.TextureLoader().load('/metal-gold.jpg');

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

export default Cube;



 











