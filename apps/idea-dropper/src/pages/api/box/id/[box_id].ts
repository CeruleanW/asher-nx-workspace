import { CARD_COLLECTION } from './../../../../features/idea-server-backend/collections';
import { connectToDatabase } from '@root/shared/features/mongodb';
import { ObjectId } from 'mongodb';
import {
  BOX_COLLECTION,
  getNextDrawCardID,
  getBoxCollection,
  getCardCollection,
} from '@idea/features/idea-server-backend';

/**
 * update draw pointer
 * if reach the end of box, reset draw pointer to zero
 */
export default async (req, res) => {
  try {
    const boxCollection = await getBoxCollection();
    if (req.method === 'POST') {

    } else if (req.method === 'GET') { // draw a card from box
      const { db } = await connectToDatabase();
      // authentication - if fails, redirect to login page
      const { box_id } = req.query || {};
      const boxID = new ObjectId(box_id);

      const box = await boxCollection.findOne({ _id: new ObjectId(box_id) }) as any;
      const { _id, shared_with, tags, cards, draw_pointer, draw_sequence } =
        box || {};
      // draw a card from this box
      const nextCardID: ObjectId = getNextDrawCardID(
        draw_sequence,
        draw_pointer,
        cards
      );
      console.debug('nextCardID', nextCardID);
      const card = await db
        .collection(CARD_COLLECTION)
        .findOne({ _id: nextCardID });
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
        boxCollection.updateOne({ _id: boxID }, { $set: { draw_pointer: 0 } });
      }

      res.json(card);
    } else if (req.method === 'DELETE') { // delete a box
      // const boxCollection = await getCollection(BOX_COLLECTION);
      //
      const { box_id } = req.query || {};
      const boxID = new ObjectId(box_id);
      const result = await boxCollection.deleteOne({ _id: boxID});
      res.json(result);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Faild to access box');
  }

  res.send('No handler for this request method');
};
