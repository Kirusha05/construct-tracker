import type { NextApiRequest, NextApiResponse } from "next";

const TOKEN = "7fa0bef00626";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return;

  const userToken: string = req.body.userToken;

  
};