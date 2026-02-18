import { NextApiRequest, NextApiResponse } from 'next';
import { getOrphanCards } from '@idea/features/idea-server-backend';

/**
 * Get cards that are not in any box
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const result = await getOrphanCards();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to fetch inbox cards');
    }
  } else {
    res.send(`${req.method} method is not supported`);
  }
};
