import React from 'react';

type DeviceInfo = {
  path: string;
  vendorId: string;
  productId: string;
};

type DevicesProps = {
  devices: DeviceInfo[];
  isConnected: boolean;
  selectedDevice: string | null;
  handleDeviceChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  connect: () => void;
  disconnect: () => void;
};

const Devices: React.FC<DevicesProps> = ({
  devices,
  isConnected,
  selectedDevice,
  handleDeviceChange,
  connect,
  disconnect,
}) => {
  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <label htmlFor="">Serial Port:</label>
        <select className="form-select mb-3" value={selectedDevice || ''} onChange={handleDeviceChange} disabled={isConnected}>
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
          <button className="btn btn-primary w-100" type="button" onClick={connect}>
            Connect
          </button>
        )}
        {isConnected && (
          <button className="btn btn-primary w-100" type="button" onClick={disconnect}>
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};

export default Devices;
