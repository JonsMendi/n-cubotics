import { Canvas } from '@react-three/fiber';
import Cube from './cube';
import * as THREE from 'three';


const Dashboard = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Cube position={new THREE.Vector3(0, 0, 0)} />
      </Canvas>
    </div>
  );
};

export default Dashboard;

