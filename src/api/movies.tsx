import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../lib/mongo';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await connectToDatabase();
    const moviesCollection = db.collection('movies');
    const movies = await moviesCollection.find({}).toArray();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error});
  }
};

export default handler;
