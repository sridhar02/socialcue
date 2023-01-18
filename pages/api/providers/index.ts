import type { NextApiRequest, NextApiResponse } from 'next';
import { Prisma, PrismaClient  } from "@prisma/client";

const prisma = new PrismaClient()

type ResponseData = {
  message: string;
  data?: any;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === 'POST') {
    try {
      const {name,account} = JSON.parse(req.body)
      console.log({name,account});
      
      const data:Prisma.ProviderCreateInput ={
        name,
        account
      }

      const provider = await prisma.provider.create({
        data
      })
      
      res.status(200).json({ message: 'Provider added!', data: null });
    } catch (err) {
      return res.status(400).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(400).json({ message: 'Method not supported' });
  }
};
