import type { NextApiRequest, NextApiResponse } from "next";
import MockBinding from "../../utils/mock-serial-port";

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
      MockBinding.Binding.selectedDevice = devicePath;
      MockBinding.Binding.selectedBaudRate = baudRate;
      await MockBinding.open();

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
