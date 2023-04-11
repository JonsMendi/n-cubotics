import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import Cube from './cube';
import mockDevices from '../utils/mockDevices';
import Devices from './devices';
import BaudRate from './baudrate';

const Dashboard = () => {
  const [angle, setAngle] = useState(50);
  const [baudRates, setBaudRates] = useState<Record<string, number>>(
    typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('baudRates') || '{}') : {}
  );
  const [selectedDevice, setSelectedDevice] = useState<string>(Object.keys(mockDevices)[0]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  /**
   * Handles the change of the baud rate of the device
   * @param event 
   * @returns 
   */
  const handleBaudRateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newBaudRate = parseInt(event.target.value);
    if (isNaN(newBaudRate)) {
      return;
    }
    setBaudRates(prevBaudRates => ({ ...prevBaudRates, [selectedDevice]: newBaudRate }));
    localStorage.setItem('baudRates', JSON.stringify({ ...baudRates, [selectedDevice]: newBaudRate }));
  };
  
  /**
   * Handles the device selection
   * @param event 
   */
  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDevice = event.target.value;
    setSelectedDevice(newDevice);
    setBaudRates(prevBaudRates => {
      const defaultBaudRate = mockDevices[newDevice];
      return { ...prevBaudRates, [newDevice]: defaultBaudRate };
    });
  };

  /**
   * Connectes and disconnect the device
   */
  const handleConnect = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const baudRate = baudRates[selectedDevice] ?? mockDevices[selectedDevice];
      console.log("🚀 ~ file: dashboard.tsx:35 ~ handleConnect ~ baudRate:", baudRate)
      const newIntervalId = setInterval(() => {
        setAngle(angle => {
          let newAngle = angle + 360 / baudRate;
          if (newAngle >= 360) {
            newAngle -= 360;
          }
          return newAngle;
        });
      }, 1000 / baudRate);
      setIntervalId(newIntervalId);
    }
  };

  // Reset angle and clear interval when selected device changes
  useEffect(() => {
    if (intervalId !== null) {
      clearInterval(intervalId);

      const baudRate = baudRates[selectedDevice] ?? mockDevices[selectedDevice];
      const newIntervalId = setInterval(() => {
        setAngle(angle => {
          let newAngle = angle + 360 / baudRate;
          if (newAngle >= 360) {
            newAngle -= 360;
          }
          return newAngle;
        });
      }, 1000 / baudRate);
      setIntervalId(newIntervalId);
    }
  }, [selectedDevice, baudRates]); 


  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div>Current Cube Angle: {angle.toFixed(1)}°</div>
  
      <Devices
        selectedDevice={selectedDevice}
        handleDeviceChange={handleDeviceChange}
        intervalId={intervalId}
        handleConnect={handleConnect}
      />
  
      <BaudRate
        selectedDevice={selectedDevice}
        baudRates={baudRates}
        handleBaudRateChange={handleBaudRateChange}
      />
  
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
