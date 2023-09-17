import { connectToDatabase, UserByNextJSAuth } from '@root/shared/features/mongodb';
import { ObjectId } from 'mongodb';


export default async (req, res) => {
  // authentication - if fails, redirect to login page
  // const myUsername = getUsername(req.cookies);
  // const myPassword = getPassword(req.cookies);

  if (req.method === 'GET') {
    //return the user document
    const { db } = await connectToDatabase();
    const userCursor = await db.collection('user').find();
    res.json(userCursor);
  } else if (req.method === 'POST') {
    const {name, email, image, emailVerified} = req.body || {};
    // Create a new user
  }
};
