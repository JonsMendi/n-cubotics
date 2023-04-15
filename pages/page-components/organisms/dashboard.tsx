import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { connectToSerialPort, readData, updateBaudRate } from '../../utils/serial-port-handlers';
import Axis from '../canvas/axis';
import Cube from '../canvas/cube';
import BaudRate from '../molecules/baudrate';
import Connect from '../molecules/connect';
import Devices from '../molecules/devices';
import ReadMode from '../molecules/readmode';

const BaudRates = [9600, 19200, 38400, 57600, 115200];

type DeviceInfo = {
  path: string;
  vendorId: string;
  productId: string;
};

/**
 * Dashboard component
 * @param param0 - axisVisible and setAxisVisible properties
 * @returns - the Dashboard component
 */
function Dashboard({axisVisible, setAxisVisible}: any) {
  const [baudRate, setBaudRate] = useState(BaudRates[0]);
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const [angle, setAngle] = useState(50);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [readMode, setReadMode] = useState<'random' | 'increment'>('increment');
  const [orbitCamera, setOrbitCamera] = useState<'left' | 'right' | null>(null);

  // Fetch available devices on mount
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
   * Handles the read mode changing value
   * @param event - the read mode value
   */
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
   * Updates the interval of data reading based on the current baud rate
   */
  const updateInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }

    const interval = (baudRate / 115200) * 1000;
    const newIntervalId = setInterval(
      readData(selectedDevice, readMode, setAngle),
      interval
    ) as unknown as NodeJS.Timeout;
    setIntervalId(newIntervalId);
  };

  /**
   * Starts the orbit rotation in the specified direction
   * @param direction - 'left' or 'right'
   */
  const handleOrbitMouseDown = (direction: 'left' | 'right') => {
    setOrbitCamera(direction);
  };
  
  /**
   * Stops the orbit rotation
   */
  const handleOrbitMouseUp = () => {
    setOrbitCamera(null);
  };

  return (
    <div className="container-fluid d-flex flex-column flex-grow-1">
      <div className="row flex-grow-1 align-items-center custom-row">
        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-3 d-flex flex-column serial-port-section ">
          <div className="my-auto">
            <h5 className="text-center">Serial Port</h5>

            <Devices
              devices={devices}
              isConnected={isConnected}
              selectedDevice={selectedDevice}
              handleDeviceChange={handleDeviceChange}
            />

            <BaudRate
              baudRate={baudRate}
              isConnected={isConnected}
              handleBaudRateChange={handleBaudRateChange}
              isDeviceSelected={selectedDevice !== null}
            />

            <ReadMode
              readMode={readMode}
              isConnected={isConnected}
              handleReadModeChange={handleReadModeChange}
              isDeviceSelected={selectedDevice !== null}
            />

            <Connect
              isConnected={isConnected}
              connect={connect}
              disconnect={disconnect}
              isDeviceSelected={selectedDevice !== null}
            />
          </div>
        </div>

        <div className="col-10 col-sm-10 col-md-10 col-lg-8 col-xl-8 cube-section">
          <div className="col-12 text-center mb-5">
            <h2 className="major-mono-display">N-<span className='major-mono-display-span'>cuboTICS</span></h2>
            <span className="sub-title">
              Bringing your cube to life, one degree at a time:{" "}
              <span className="angle">{`${angle.toFixed(1)}°`}</span>
            </span>
          </div>

          <div className="col-12 canvas">
            <Suspense fallback={null}>
              <Canvas shadows>
                <spotLight position={[-8, 0, 0]} intensity={1.5} />
                <spotLight position={[8, 0, 0]} intensity={0.2} />
                <Cube
                  angle={angle}
                  baudRate={baudRate}
                  readMode={readMode}
                  orbitCamera={orbitCamera}
                />
                {axisVisible && <Axis />}
              </Canvas>
            </Suspense>
          </div>
          <div className="row flex-grow-1">
            <div className="col-12 d-flex justify-content-center mb-3">
              <button
                className="button-orbit"
                onMouseDown={() => handleOrbitMouseDown("left")}
                onMouseUp={handleOrbitMouseUp}
              >
                <FaArrowLeft className="icon-left" />
                Orbit
              </button>
              <button
                className="button-orbit"
                onClick={() => setAxisVisible(!axisVisible)}
              >
                Toggle Axis
              </button>
              <button
                className="button-orbit"
                onMouseDown={() => handleOrbitMouseDown("right")}
                onMouseUp={handleOrbitMouseUp}
              >
                Orbit
                <FaArrowRight className="icon-right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;