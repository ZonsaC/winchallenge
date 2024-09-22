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
    const db = client.db('winChallenge');

    const games = req.body.games; // Spiele aus dem Request

    // Speichern oder Updaten der Spiele
    await db.collection('challengeData').updateOne(
      { _id: 'winChallengeData' },
      { $set: { games } }, // Nur die Spiele speichern
      { upsert: true }
    );

    res.status(200).json({ message: 'Games saved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
