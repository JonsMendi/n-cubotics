type DeviceInfo = {
  path: string;
  vendorId: string;
  productId: string;
};

/**
 * Handles the connection to a specific device in the serial port
 */
export const connectToSerialPort = async (
  selectedDevice: string | null,
  baudRate: number,
  readMode: 'random' | 'increment',
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setIntervalId: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>,
  setAngle: React.Dispatch<React.SetStateAction<number>>,
) => {
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

    if (response.ok) {
      // Calculate interval based on the selected baud rate
      const interval = (baudRate / 115200) * 1000;

      // Periodically read data from the device at different intervals based on the baud rate
      const newIntervalId = setInterval(readData(selectedDevice,readMode, setAngle), interval) as unknown as NodeJS.Timeout;
      setIntervalId(newIntervalId);
      return true;
    } else {
      return false;
    }
  }
  return false;
}



/**
 * Update the Baud Rate value
 */
export const updateBaudRate = async (
  selectedDevice: string | null,
  baudRate: number,
) => {
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
  * Read data from the connected device and update the angle
  */
export const readData = (
  selectedDevice: string | null,
  readMode: 'random' | 'increment',
  setAngle: React.Dispatch<React.SetStateAction<number>>
) => async () => {
  const readResponse = await fetch("/api/read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      devicePath: selectedDevice,
      readMode,
    }),
  });

  const readData = await readResponse.json();
  setAngle(readData.angle);
};

