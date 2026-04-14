import { NextApiRequest, NextApiResponse } from "next";
import MockBinding from "../../utils/mock-serial-port";

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
      MockBinding.Binding.readMode = readMode || 'random';
      const buffer = Buffer.alloc(4);
      await MockBinding.read(buffer, 0, 4);
      const angle = buffer.readInt32LE(0);

      res.status(200).json({ angle });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
