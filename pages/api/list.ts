import type { NextApiRequest, NextApiResponse } from "next";
import MockBinding from "../../utils/mock-serial-port";

/**
 * Handler to provide the list of devices
 * @param req - the request object
 * @param res - the response object
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const devices = await MockBinding.Binding.list();
  res.status(200).json(devices);
}
