import clientPromise from './mongodb';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const client = await clientPromise;
    const db = client.db('winChallenge');  // Name der Datenbank (wie in MongoDB Atlas angegeben)

    const games = req.body.games;
    const timer = req.body.timer;

    // Speichern oder Updaten der Daten
    await db.collection('challengeData').updateOne(
      { _id: 'winChallengeData' },
      { $set: { games, timer } },
      { upsert: true }
    );

    res.status(200).json({ message: 'Data saved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
