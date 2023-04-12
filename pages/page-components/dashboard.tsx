import Cube from './cube';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';

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
    const fetchDevices = async () => {
      const response = await fetch("/api/list");
      const data = await response.json();
      setDevices(data);
    };

    fetchDevices();
  }, []);

  /**
   * Read data from the connected device and update the angle
   */
  const readData = async () => {
    const readResponse = await fetch("/api/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        devicePath: selectedDevice,
      }),
    });

    const readData = await readResponse.json();
    setAngle(readData.angle);
  };

  /**
   * Updates the Intervale
   */
  const updateInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const interval = (baudRate / 115200) * 1000;
    const newIntervalId = setInterval(readData, interval);
    setIntervalId(newIntervalId);
  };

  /**
   * Update the Baud Rate value
   */
  const updateBaudRate = async () => {
    if (selectedDevice) {
      const response = await fetch("/api/update-baudrate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          devicePath: selectedDevice,
          baudRate,
        }),
      });
  
      const data = await response.json();
      console.log("updateBaudRate:", data.message);
    }
  };
  

  /**
   * Handles the baud rate changing value
   * @param event - the baud rate value
   */
  const handleBaudRateChange = (event: { target: { value: string; }; }) => {
    setBaudRate(parseInt(event.target.value, 10));
  
    if (isConnected) {
      updateBaudRate(); // Update the baud rate for the connected device
      updateInterval(); // Update the reading interval
    }
  }; 

  /**
   * Handles the device changing value
   * @param event - the device value
   */
  const handleDeviceChange = (event: { target: { value: string; }; }) => {
    setSelectedDevice(event.target.value);
  };

  /**
   * Handles the connection to a specific device in the serial port
   */
  const connectToSerialPort = async () => {
    if (selectedDevice) {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          devicePath: selectedDevice,
          baudRate,
        }),
      });
  
      const data = await response.json();
      console.log(data.message);
  
      // Calculate interval based on the selected baud rate
      const interval = (baudRate / 115200) * 1000;
  
      // Periodically read data from the device at different intervals based on the baud rate
      const newIntervalId = setInterval(readData, interval);
      setIntervalId(newIntervalId);
      setIsConnected(true);
    }
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
  
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div>Current Cube Angle: {angle.toFixed(1)}°</div>

      <div>
        <select value={baudRate} onChange={handleBaudRateChange}>
          {BaudRates.map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select value={selectedDevice || ""} onChange={handleDeviceChange} disabled={isConnected}>
          <option value="" disabled>
            Select a device
          </option>
          {devices.map((device) => (
            <option key={device.path} value={device.path}>
              {device.path}
            </option>
          ))}
        </select>
        {!isConnected && (
          <button onClick={connectToSerialPort}>Connect</button>
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