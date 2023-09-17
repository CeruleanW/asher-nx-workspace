import { CARD_COLLECTION } from '../../../../../features/idea-server-backend/collections';
import { connectToDatabase } from '@root/shared/features/mongodb';
import { ObjectId } from 'mongodb';
import {
  BOX_COLLECTION,
  getNextDrawCardID,
} from '@idea/features/idea-server-backend';
import { getCollection } from '@root/shared/features/mongodb';

/**
 * update draw pointer
 * if reach the end of box, reset draw pointer to zero
 */
export default async (req, res) => {
  try {
    if (req.method === 'GET') {
      // draw a card from box
      console.debug('draw a card from box');
      const { db } = await connectToDatabase();
      // authentication - if fails, redirect to login page
      const { box_id } = req.query || {};
      const boxID = new ObjectId(box_id);
      const boxCollection = await getCollection(BOX_COLLECTION);
      const cardCollection = await getCollection(CARD_COLLECTION);

      const box = await boxCollection.findOne({ _id: boxID });

      const { cards, draw_pointer, draw_seed } = box || {};
      console.debug('draw_seed', draw_seed);

      const nextCardID: ObjectId = getNextDrawCardID(
        draw_seed,
        draw_pointer,
        cards
      );
      console.debug('nextCardID', nextCardID);
      const card = await cardCollection.findOne({ _id: nextCardID });

      // if card doesn't exist
      if (!card) {
        // remove this nextCardID in cards list
        await boxCollection.updateOne(
          {
            _id: boxID,
          },
          {
            $pull: {
              cards: nextCardID,
            },
          }
        );
        return res.status(404).send('Card not found');
      }

      console.debug('card', card);

      // update draw_pointer
      if (card) {
        await db
          .collection(BOX_COLLECTION)
          .updateOne({ _id: boxID }, { $inc: { draw_pointer: 1 } });
        if (draw_pointer === cards.length - 1) {
          await db
            .collection(BOX_COLLECTION)
            .updateOne({ _id: boxID }, { $set: { draw_pointer: 0 } });
        }
      } else {
        await db
          .collection(BOX_COLLECTION)
          .updateOne({ _id: boxID }, { $set: { draw_pointer: 0 } });
      }

      return res.json(card);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Faild to access box');
  }

  res.send('No handler for this request method');
};
