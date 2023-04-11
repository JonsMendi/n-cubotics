interface DeviceMap {
  [key: string]: number;
}

const mockDevices: DeviceMap = {
  "arduino": 9600,
  "raspberry pi": 19200,
  "ESP32": 38400,
};

export default mockDevices;
