import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import { CARD_COLLECTION } from '@idea/features/idea-server-backend';
import {
  createCardDoc,
  getAllCards,
  deleteAllCards,
  insertNewCard,
} from '@idea/features/idea-server-backend';

type RequestBody = {
  cardData: {
    title: string;
    content: any;
  };
  boxId: string;
};

/**
 * add a card to a box
 */
export default async (
  req: NextApiRequest & { body: RequestBody },
  res: NextApiResponse
) => {
  if (req.method === 'POST') { // add a card
    try {
      const { body } = req || {};
      const { cardData } = body || {};

      const result = await insertNewCard(cardData);
      console.log('insert new card result', result);
      // process result
      const { insertedId } = result || {};

      return res.status(200).send({ insertedId });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Insertion failed');
    }
  } else if (req.method === 'GET') { // get all cards
    const result = await getAllCards();
    res.status(200).json(result);
  } else if (req.method === 'DELETE') { // delete all cards
    await deleteAllCards();
    res.status(200).send('Deletion success!');
  } else {
    res.send(`${req.method} method is not supported`);
  }
};
