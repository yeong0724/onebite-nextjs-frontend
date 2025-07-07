import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  time: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const date = new Date();
  res.status(200).json({ time: date.toLocaleString() });
}
