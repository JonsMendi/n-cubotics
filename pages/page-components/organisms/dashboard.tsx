import Cube from '../canvas/cube';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { connectToSerialPort, updateBaudRate, readData } from '../../utils/serial-port-handlers';
import BaudRate from '../molecules/baudrate';
import Devices from '../molecules/devices';
import Connect from '../molecules/connect';
import ReadMode from '../molecules/readmode';

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
  const [readMode, setReadMode] = useState<'random' | 'increment'>('increment');

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


  const handleReadModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReadMode(event.target.value as 'random' | 'increment');
  };

  /**
   * Handles the connection to the device
   */
  const connect = async () => {
    const connected = await connectToSerialPort(
      selectedDevice,
      baudRate,
      readMode,
      setIsConnected,
      setIntervalId,
      setAngle
    );
    setIsConnected(connected);
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
  };

  /**
   * Updates the Intervale
   */
  const updateInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const interval = (baudRate / 115200) * 1000;
    const newIntervalId = setInterval(
      readData(selectedDevice,readMode, setAngle),
      interval
    ) as unknown as NodeJS.Timeout;
    setIntervalId(newIntervalId);
  };

  return (
    <div className="container d-flex flex-column">
      <div className="mt-5">
        <div className="col-12 text-center py-4">
          <h2 className="major-mono-display">N-Cubotics</h2>
          <span className="sub-title">Bringing your cube to life, one degree at a time</span>
        </div>
  
        <div className="row flex-grow-1">
          <div className="col-12 canvas">
            <Suspense fallback={null}>
              <Canvas shadows>
                <ambientLight intensity={0.5} />
                <pointLight position={[2, 5, 2]} intensity={1} />
                <Cube angle={angle} baudRate={baudRate} readMode={readMode} />
              </Canvas>
            </Suspense>
          </div>
        </div>
      </div>
  
      <div className="fixed-bottom row rounded pt-3 pb-3 serial-port">
        <div className="row">
          <div className="col-12">
            <h5 className="text-center">Serial Port</h5>
          </div>
        </div>

        <div className="col-md-3">
          <Devices
            devices={devices}
            isConnected={isConnected}
            selectedDevice={selectedDevice}
            handleDeviceChange={handleDeviceChange}
          />
        </div>
        <div className="col-md-3">
          <BaudRate
            baudRate={baudRate}
            isConnected={isConnected}
            handleBaudRateChange={handleBaudRateChange}
            isDeviceSelected={selectedDevice !== null}
          />
        </div>
        <div className="col-md-3">
          <ReadMode
            readMode={readMode}
            isConnected={isConnected}
            handleReadModeChange={handleReadModeChange}
            isDeviceSelected={selectedDevice !== null}
          />
        </div>
       
        <div className="col-md-3">
          <div className="col-md-10 mx-auto">
            <label htmlFor="current-angle-input">Current Cube Angle:</label>
            <input
              type="text"
              className="form-control serial-port-select"
              id="current-angle-input"
              value={`${angle.toFixed(1)}°`}
              readOnly
            />
          </div>
          
        </div>


        <Connect
          isConnected={isConnected}
          connect={connect}
          disconnect={disconnect}
          isDeviceSelected={selectedDevice !== null}
        />
      </div>

  
    </div>
  );
    

}

export default Dashboard;