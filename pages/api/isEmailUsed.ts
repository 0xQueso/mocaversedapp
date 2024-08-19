import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  email: string;
  inUse: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email } = req.query;
  let inUse = false;
  // mock call to email verifier backend
  setTimeout(() => {
    console.log(email);
    inUse = true;
    res.status(200).json({ email: JSON.stringify(email), inUse: inUse });
  }, 3000);
}
