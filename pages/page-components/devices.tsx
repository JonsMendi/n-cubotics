import { useState, useEffect } from "react";

type DeviceInfo = {
  path: string;
  vendorId: string;
  productId: string;
};

type DevicesProps = {
  onSelect: (devicePath: string) => void;
  isConnected: boolean;
  selectedDevice: string | null;
};

export default function Devices({
  onSelect,
  isConnected,
  selectedDevice,
}: DevicesProps) {
  const [devices, setDevices] = useState<DeviceInfo[]>([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const response = await fetch("/api/list");
      const data = await response.json();
      setDevices(data);
    };

    fetchDevices();
  }, []);

  const handleDeviceChange = (event: { target: { value: string } }) => {
    onSelect(event.target.value);
  };

  return (
    <div className="devices">
      <select
        value={selectedDevice || ""}
        onChange={handleDeviceChange}
        disabled={isConnected}
      >
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
  );
}
