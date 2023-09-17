import { BOX_COLLECTION } from "../../../../../features/idea-server-backend";
import { connectToDatabase } from "@root/shared/features/mongodb";


async function getBoxesByEmail(req, res) {
  const { db } = await connectToDatabase();
  const result = await db
    .collection(BOX_COLLECTION)
}

export default getBoxesByEmail;
