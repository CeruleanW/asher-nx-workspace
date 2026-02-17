import { createUserDoc } from '@idea/features/idea-server-backend';
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
    // TODO: implement createUserDoc and DB insertion
    const nextBox = createUserDoc(body);
    return res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
