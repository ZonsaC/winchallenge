import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;  // In Vercel als Umgebungsvariable speichern
const client = new MongoClient(uri);
const dbName = 'winChallenge';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { games, timer } = req.body;
      if (!games || !timer) {
        res.status(400).json({ message: 'Invalid request body' });
        return;
      }

      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('challengeData');

      // Daten in MongoDB speichern
      await collection.updateOne(
        { _id: '1' }, // Einfache ID für ein einzelnes Dokument
        { $set: { games, timer } },
        { upsert: true }  // Falls das Dokument nicht existiert, füge es hinzu
      );

      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
