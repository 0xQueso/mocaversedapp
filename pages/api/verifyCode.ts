// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  code: string;
  valid: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { code } = req.query;
  let valid = false;
  // mock call to code verifier backend
  setTimeout(() => {
    console.log(code);
    valid = true;
    res.status(200).json({ code: JSON.stringify(code), valid: valid });
  }, 3000);
}
