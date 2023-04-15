import type { NextApiRequest, NextApiResponse } from "next";
import SerialPort from "serialport";
import MockBinding from "../utils/mock-serial-port";

(SerialPort.Binding as any) = MockBinding.Binding;

/**
 * Handler to connect to the device
 * @param req - the request object
 * @param res - the response object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { devicePath, baudRate } = req.body;

    try {
      const port = new SerialPort(devicePath, { baudRate, autoOpen: false });
      await port.open();

      res.status(200).json({ message: "Connected to the device successfully" });
      return;
    } catch (error) {
      res.status(500).json({ message: "Error connecting to the device" });
      return;
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
}
