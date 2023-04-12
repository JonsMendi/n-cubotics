import Cube from './cube';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { connectToSerialPort, updateBaudRate, readData } from '../utils/serial-port-handlers';

const BaudRates = [9600, 19200, 38400, 57600, 115200];

type DeviceInfo = {
  path: string;
  vendorId: string;
  productId: string;
};

function Dashboard() {
  const [baudRate, setBaudRate] = useState(BaudRates[0]);
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const [angle, setAngle] = useState(50);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // fetch the available devices
    const fetchDevices = async () => {
      const response = await fetch("/api/list");
      const data = await response.json();
      setDevices(data);
    };

    fetchDevices();
  }, []);

  /**
   * Handles the baud rate changing value
   * @param event - the baud rate value
   */
  const handleBaudRateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBaudRate(parseInt(event.target.value, 10));

    if (isConnected) {
      updateBaudRate(selectedDevice, baudRate);
      updateInterval();
    }
  };

  /**
   * Handles the baud rate changing value
   * @param event - the baud rate value
   */
  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value);
  };

  /**
   * Handles the connection to the device
   */
  const connect = async () => {
    await connectToSerialPort(selectedDevice, baudRate, setIsConnected, setIntervalId, setAngle);
  };

  /**
   * Handles the disconnection of the device
   */
  const disconnect = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsConnected(false);
    setAngle(0);
  };

  /**
   * Updates the Intervale
   */
  const updateInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const interval = (baudRate / 115200) * 1000;
    const newIntervalId = setInterval(readData(selectedDevice, setAngle), interval) as unknown as NodeJS.Timeout;
    setIntervalId(newIntervalId);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div>Current Cube Angle: {angle.toFixed(1)}°</div>

      <div className='baudrates'>
        <select value={baudRate} onChange={handleBaudRateChange}>
          {BaudRates.map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </div>

      <div className='devices'>
        <select value={selectedDevice || ''} onChange={handleDeviceChange} disabled={isConnected}>
          <option value='' disabled>
            Select a device
          </option>
          {devices.map((device) => (
            <option key={device.path} value={device.path}>
              {device.path}
            </option>
          ))}
        </select>
        {!isConnected && (
          <button onClick={connect}>Connect</button>
        )}
        {isConnected && (
          <button onClick={disconnect}>Disconnect</button>
        )}
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

}

export default Dashboard;