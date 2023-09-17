import {
  connectToDatabase,
  getCollection,
} from '@root/shared/features/mongodb';
import { ObjectId } from "mongodb";
import {
  BOX_COLLECTION,
} from '@idea/features/idea-server-backend';
import { createSeed } from '@root/shared/features/random';

/**
 * shake a box. Shuffle all the cards in the box
 */
export default async (req, res) => {
  const { db } = await connectToDatabase();
  // authentication - if fails, redirect to login page
  const { box_id } = req.query || {};
  const boxID = new ObjectId(box_id);
  const boxCollection = await getCollection(BOX_COLLECTION);
  // update draw_seed
  const updateResult = await boxCollection.updateOne(
    { _id:
      boxID
    },
    {
      $set: {
        draw_seed: createSeed(),
      },
    }
  );

  res.json(updateResult);
};

// export default
