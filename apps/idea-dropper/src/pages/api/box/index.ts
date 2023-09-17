import { connectToDatabase } from '@root/shared/features/mongodb';
import {
  BOX_COLLECTION,
  createBoxDoc,
  createCardDoc,
} from '@idea/features/idea-server-backend';
import { CreateBoxDTO } from '../../../features/idea-server';
import { getServerSession } from "next-auth/next"
import { NextApiRequest } from 'next';
// import { getToken } from "next-auth/jwt";
import { authOptions } from "../../api/auth/[...nextauth]";

type Request = NextApiRequest & {body?: CreateBoxDTO; [x: string]: any};

/**
 * /box
 * POST for insert
 */
export default async (req: Request, res) => {
  // // authentication - if fails, redirect to login page

  // const myUsername = getUsername(req.cookies);
  // const myPassword = getPassword(req.cookies);
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }

  try {
    if (req.method === 'GET') {

    } else if (req.method === 'POST') {
      const { body } = req || {};
      if (!body) {
        res.status(400).json({ error: 'Missing body' });
        return;
      }

      const { db } = await connectToDatabase();
      const nextBox = createBoxDoc(body);
      const inserted = await db.collection(BOX_COLLECTION).insertOne(nextBox);
      console.debug('nextBox', nextBox);
      res.status(200).json(inserted);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
