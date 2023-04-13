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
};

const Devices: React.FC<DevicesProps> = ({
  devices,
  isConnected,
  selectedDevice,
  handleDeviceChange,
}) => {
  return (
    <div className="row">
      <div className="col-md-10 mx-auto">
        <label htmlFor="">Device:</label>
        <select className="form-select mb-3 serial-port-select" value={selectedDevice || ''} onChange={handleDeviceChange} disabled={isConnected}>
          <option value="" disabled>
            Select a device
          </option>
          {devices.map((device) => (
            <option key={device.path} value={device.path}>
              {device.path}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Devices;
