import { NextApiRequest, NextApiResponse } from "next";
import SerialPort from "serialport";
import MockBinding from "../utils/mock-serial-port";

(SerialPort.Binding as any) = MockBinding.Binding;

/**
 * Handler that reads the device values
 * @param req - the request object
 * @param res - the response object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { devicePath, readMode } = req.body;

    try {
      const port = new SerialPort(devicePath);
      const buffer = Buffer.alloc(4);
      const result = await ((port.binding as unknown) as typeof MockBinding.Binding.prototype).read(buffer, 0, 4, readMode);
      const angle = buffer.readInt32LE(0);

      res.status(200).json({ angle });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
