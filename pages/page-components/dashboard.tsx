import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import Cube from './cube';

const Dashboard = () => {
  const [angle, setAngle] = useState(190);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Suspense fallback={null}>
        <Canvas shadows>
          <ambientLight intensity={0.5}/>
          <pointLight position={[2, 5, 2]} intensity={1} />
            <Cube angle={angle} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Dashboard;


