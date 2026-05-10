import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@root/shared/features/mongodb';
import { ObjectId } from 'mongodb';
import { USERS_COLLECTION } from '@idea/features/idea-server-backend';
import type { IUser } from '@idea/features/idea-server-backend/mongodbSchema/user.schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser | null>
) {
  const { db } = await connectToDatabase();
  // authentication - if fails, redirect to login page
  const { userid } = req.query || {};
  console.debug('userid', userid);

  // return the user document
  const userCursor = await db
    .collection(USERS_COLLECTION)
    .findOne({ _id: new ObjectId(userid as string) });

  res.json(userCursor as unknown as IUser | null);
}
