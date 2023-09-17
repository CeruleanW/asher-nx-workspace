import { connectToDatabase, iterateFunc, errorFunc } from '@root/shared/features/mongodb';


export default async (req, res) => {
  const { db } = await connectToDatabase();
  // authentication - if fails, redirect to login page
  const { username } = req.query || {};
  console.debug('username', username);

  //return the user document
  const userCursor = await db
    .collection('user')
    .findOne({ username });

  // userCursor && userCursor.forEach(iterateFunc, errorFunc);

  res.json(userCursor);
};
