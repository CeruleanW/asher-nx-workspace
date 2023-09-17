import { connectToDatabase } from '@root/shared/features/mongodb';

//add a card to a box
export default async (req, res) => {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();
    const content = {name: 'Mary Smith'}

    db.collection('test').insertOne({
      content
    }).then(function(result) {
      // process result
      const objResult = JSON.parse(result);
      const {ok, insertedId} = objResult;
      console.log(ok);
      if (ok) {
        res.status(200).send({insertedId});
      } else {
        res.send();
      }

      res.send();
    })
  } else {
    res.send('The test API cannot be accessed by GET method');
  }
};
