import { connectToDatabase } from '@root/shared/features/mongodb';
import {
  USERS_COLLECTION,
  CARD_COLLECTION,
  getCardCollection,
} from './collections';

export async function getUserByEmail(userEmail: string) {
  // console.log("Retrieving all the boxes for user ");
  // // authentication - if fails, redirect to login page
  // const myUsername = getUsername(req.cookies);
  // const myPassword = getPassword(req.cookies);

  const { db } = await connectToDatabase();
  const result = await db
    .collection(USERS_COLLECTION)
    .findOne({ email: userEmail });
  return result;
}

export async function findCardById(cardID: any) {
  const { db } = await connectToDatabase();
  const result = await db.collection(CARD_COLLECTION).findOne({ _id: cardID });
  return result;
}

export async function getAllCards() {
  const collection = await getCardCollection();
  // print a message if no documents were found
  if (await collection.estimatedDocumentCount() === 0) {
    console.log('No documents in this collection!');
  }
  const cursor = collection.find();
  return cursor.toArray();
}
