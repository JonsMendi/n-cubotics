import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import Cube from './cube';

const baudRateOptions = ["9600", "19200", "38400", "57600", "115200", ""];

const Dashboard = () => {
  const [angle, setAngle] = useState(50);
  const [baudRate, setBaudRate] = useState<string>(
    typeof localStorage !== 'undefined' ? localStorage.getItem('baudRate') || baudRateOptions[0] : baudRateOptions[0]
  );

  const handleBaudRateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newBaudRate = event.target.value;
    if (newBaudRate === "") {
      // Set the angle to the current rotation angle when the "Stop Rotation" option is selected
      setAngle(angle);
    }
    setBaudRate(newBaudRate);
    localStorage.setItem('baudRate', newBaudRate);
  };

  // Update angle in response to changes in baud rate
  useEffect(() => {
    if (baudRate === '') {
      return;
    }
    let rotationIncrement = 360 / parseInt(baudRate);
    let direction = 1;
    const intervalId = setInterval(() => {
      setAngle(angle => {
        let newAngle = angle + rotationIncrement * direction;
        if (newAngle > 360) {
          newAngle -= 360;
        } else if (newAngle < 0) {
          newAngle += 360;
        }
        // Restart rotation direction if angle is at 0 or 360 degrees
        if (newAngle === 0 || newAngle === 360) {
          direction *= -1;
        }
        return newAngle;
      });
    }, 1000 / parseInt(baudRate));

    return () => clearInterval(intervalId);
  }, [baudRate]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div>Current Cube Angle: {angle.toFixed(1)}°</div>
      <div>
        <label htmlFor="baudRate">Baud Rate:</label>
        <select id="baudRate" name="baudRate" value={baudRate} onChange={handleBaudRateChange}>
          {baudRateOptions.map((option) => (
            <option key={option} value={option}>
              {option !== "" ? option : 'Stop Rotation'}
            </option>
          ))}
        </select>
      </div>
      <Suspense fallback={null}>
        <Canvas shadows>
          <ambientLight intensity={0.5} />
          <pointLight position={[2, 5, 2]} intensity={1} />
          <Cube angle={angle} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Dashboard;
