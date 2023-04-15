import React from "react";

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

/**
 * The Devices Component
 * @param param0 - devices, isConnected, selectedDevice, handleDeviceChange properties
 * @returns - the Devices dropdown
 */
function Devices({devices, isConnected, selectedDevice, handleDeviceChange}: DevicesProps) {
  return (
    <div className="row">
      <div className="col-md-10 mx-auto">
        <label htmlFor="">Device:</label>
        <select
          className="form-select mb-3 custom-select"
         value={selectedDevice || ""}
          onChange={handleDeviceChange}
          disabled={isConnected}
        >
          <option value="" disabled>
            Select a device
          </option>
          {devices?.map((device) => (
            <option key={device.path} value={device.path}>
              {device.path}
            </option>
          ))}
        </select> 
      </div>
    </div>
  );
}

export default Devices;
