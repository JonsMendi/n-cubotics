import mockDevices from "../utils/mockDevices";

type DeviceProps = {
  selectedDevice: string;
  handleDeviceChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  intervalId: NodeJS.Timer | null;
  handleConnect: () => void;
};

const Devices = ({ selectedDevice, handleDeviceChange, intervalId, handleConnect }: DeviceProps) => {
  return (
    <div className='device'>
      <label htmlFor="device">Select the Device:</label>
      <select
        id="device"
        name="device"
        value={selectedDevice}
        onChange={handleDeviceChange}
        disabled={intervalId !== null}
      >
        {Object.keys(mockDevices).map(device => (
          <option key={device} value={device}>
            {device}
          </option>
        ))}
      </select>
      <button onClick={handleConnect}>{intervalId !== null ? 'Disconnect' : 'Connect'}</button>
    </div>
  );
};

export default Devices;
