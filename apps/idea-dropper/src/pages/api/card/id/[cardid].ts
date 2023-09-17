import { connectToDatabase } from '@root/shared/features/mongodb';
import { getSession } from '@idea/features/auth';
import {
  CARD_COLLECTION,
  findCardById,
  updateCard,
  deleteCard,
  removeCardFromBoxes,
} from '@idea/features/idea-server-backend';
import { inspect } from '@root/shared/utils';

//request a card by its id
export default async (req, res) => {
  const { cardid }: { cardid: string; [x: string]: any } = req.query || {};
  const session = await getSession({ req });
  if (session) {
    const { db } = await connectToDatabase();
    if (req.method === 'GET') {
      const foundCard = await findCardById(cardid);
      res.json(foundCard);
    } else if (req.method === 'POST') {
    } else if (req.method === 'DELETE') {
      console.debug('delete card request', cardid);
      const result = await deleteCard(cardid);
      if (result) {
        // remove card from boxes
        await removeCardFromBoxes(cardid);
      }

      return res.status(200).json(result);
    } else if (req.method === 'PATCH') {
      const result = await updateCard(req?.body);
      return res.status(200).json(result);
    }
    res.send('No handler for this request method');
  } else {
    res.status(500).send({
      error:
        'This is protected content. You must be signed in to access this api route',
    });
  }
};
