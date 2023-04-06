import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type Props = {
  position: THREE.Vector3;
};

const Cube = ({ position }: Props) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Use useFrame to rotate the cube
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.003;
    }
  });

  // Create texture from image
  const texture = new THREE.TextureLoader().load('/metal-gold.jpg');

  return (
    <mesh position={position} ref={meshRef}>
      <boxBufferGeometry args={[2, 2, 2]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default Cube;






