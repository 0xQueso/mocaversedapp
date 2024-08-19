import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, ethAddress, signature, code } = req.body;

  console.log(email, ethAddress, signature, code, "email and ethAddress");
  res.status(200).json({ valid: true });
};
