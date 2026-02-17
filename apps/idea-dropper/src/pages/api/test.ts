import { connectToDatabase } from '@root/shared/features/mongodb';

//add a card to a box
export default async (req, res) => {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();
    const content = {name: 'Mary Smith'}

    const result = await db.collection('test').insertOne({ content });
    const { acknowledged, insertedId } = result;

    if (acknowledged) {
      return res.status(200).send({ insertedId });
    } else {
      return res.status(500).send({ error: 'Insertion failed' });
    }
  } else {
    return res.send('The test API cannot be accessed by GET method');
  }
};
