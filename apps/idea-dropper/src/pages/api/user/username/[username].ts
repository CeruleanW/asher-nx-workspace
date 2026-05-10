import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@root/shared/features/mongodb';
import type { IUser } from '@idea/features/idea-server-backend/mongodbSchema/user.schema';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUser | null>
) {
  const { db } = await connectToDatabase();
  // authentication - if fails, redirect to login page
  const { username } = req.query || {};
  console.debug('username', username);

  // return the user document
  const userCursor = await db
    .collection('user')
    .findOne({ username: username as string });

  // userCursor && userCursor.forEach(iterateFunc, errorFunc);

  res.json(userCursor as unknown as IUser | null);
}
