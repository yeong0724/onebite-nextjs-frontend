import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    /**
     * On Demand ISR (요청을 받을때 마다 페이지를 다시 생성하는 방식)
     * -> revalidate 하고자 하는 페이지 경로
     */
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Revalidation Failed");
  }
}
