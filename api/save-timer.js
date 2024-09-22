import clientPromise from './mongodb';

let timer = { hours: 0, minutes: 0, seconds: 0 };

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

    timer = req.body; // Timer aus dem Request

    // Speichern oder Updaten des Timers
    await db.collection('challengeData').updateOne(
      { _id: 'winChallengeData' },
      { $set: { timer } }, // Nur den Timer speichern
      { upsert: true }
    );

    res.status(200).json({ message: 'Timer updated successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
