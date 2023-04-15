import type { NextApiRequest, NextApiResponse } from "next";
import SerialPort from "serialport";
import MockBinding from "../../utils/mock-serial-port";

(SerialPort.Binding as any) = MockBinding.Binding;

/**
 * Handler to provide the list of devices
 * @param req - the request object
 * @param res - the response object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const devices = await SerialPort.list();
  res.status(200).json(devices);
}
