import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'winChallenge';

export default async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('challengeData');

    // Lade die gespeicherten Daten aus MongoDB
    const data = await collection.findOne({ _id: '1' });

    if (data) {
      res.status(200).json({ games: data.games, timer: data.timer });
    } else {
      res.status(200).json({ games: [], timer: { hours: 0, minutes: 0, seconds: 0 } });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  } finally {
    await client.close();
  }
};
