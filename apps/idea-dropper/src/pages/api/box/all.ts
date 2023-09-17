import { connectToDatabase } from '@root/shared/features/mongodb';
import { BOX_COLLECTION, USERS_COLLECTION } from '@idea/features/idea-server-backend';
import { getServerSession } from "next-auth/next"
import { NextApiRequest } from 'next';
// import { getToken } from "next-auth/jwt";
import { authOptions } from "../auth/[...nextauth]";

async function getAllBoxes() {
  const { db } = await connectToDatabase();
  const boxes = await db
    .collection(BOX_COLLECTION)
    .find({})
    .sort({ 'last-access-date': -1 })
    .limit(20)
    .toArray();
  return boxes;
}

async function getBoxesByEmail(email: string) {
  const { db } = await connectToDatabase();
  const user = await db.collection(USERS_COLLECTION).findOne({
    email: email
  })

  const boxes = await db
    .collection(BOX_COLLECTION)
    .find({
      owner: user._id
    })
    .sort({ 'last-access-date': -1 })
    .limit(100)
    .toArray();
  return boxes;
}

/**
 * authentication - if fails, redirect to login page
 */
export default async (req, res) => {
  console.log('Retrieving all the boxes from box API');
  try {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
      // Signed in
      const userEmail = session?.user?.email;
      // console.log("Session", JSON.stringify(session, null, 2))
      if (req.method === 'GET') {
        const boxes = await getBoxesByEmail(userEmail);
        res.status(200).json(boxes);
      }
    } else {
      // Not Signed in
      res.status(401)
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
