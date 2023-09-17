import { connectToDatabase } from '@root/shared/features/mongodb';
import {  USERS_COLLECTION, createUserDoc} from '@idea/features/idea-server-backend';
import { CreateBoxDTO } from '../../../features/idea-server';

/**
 * /user/register
 */
export default async (req: {body: CreateBoxDTO; [x:string]: any}, res) => {
  // // authentication - if fails, redirect to login page
  // const myUsername = getUsername(req.cookies);
  // const myPassword = getPassword(req.cookies);

  try {
    const {body} = req || {};
    if (!body) {
      res.status(400).json({ error: 'Missing body' });
      return;
    }
    const nextBox = createUserDoc(body);
    res.status(200).json();
    return;

    const { db } = await connectToDatabase();
    // const inserted = await db
    //   .collection(USERS_COLLECTION)
    //   .insertOne(nextBox);
    // // console.debug('nextBox', nextBox);
    // res.status(200).json(inserted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
