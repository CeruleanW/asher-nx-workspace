import {
  connectToDatabase,
} from '@root/shared/features/mongodb';
import { ObjectId } from "mongodb";
import {
  USERS_COLLECTION,
} from '@idea/features/idea-server-backend';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  // authentication - if fails, redirect to login page
  const { userid } = req.query || {};
  console.debug('userid', userid);

  //return the user document
  const userCursor = await db.collection(USERS_COLLECTION).findOne({ _id: ObjectId(userid)});

  res.json(userCursor);
};
