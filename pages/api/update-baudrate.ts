import type { NextApiRequest, NextApiResponse } from "next";
import SerialPort from "serialport";
import MockBinding from "../../utils/mock-serial-port";

(SerialPort.Binding as any) = MockBinding.Binding;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Request received in update-baudrate.ts");
  if (req.method === "POST") {
    const { devicePath, baudRate } = req.body;

    if (!devicePath || !baudRate) {
      return res.status(400).json({ message: "Device path and baud rate are required" });
    }

    try {
      if (devicePath !== MockBinding.Binding.selectedDevice) {
        return res.status(404).json({ message: "The specified device is not connected" });
      }

      MockBinding.Binding.selectedBaudRate = baudRate;

      res.json({ message: "Baud rate updated successfully" });
    } catch (error) {
      console.error("Error updating baud rate:", error);
      res.status(500).json({ message: "Error updating baud rate" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
