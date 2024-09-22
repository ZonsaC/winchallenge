import clientPromise from './mongodb';

export default async (req, res) => {
  const client = await clientPromise;
  const db = client.db('winChallenge');

  // Daten aus der MongoDB lesen
  const data = await db.collection('challengeData').findOne({ _id: 'winChallengeData' });

  // Fallback, falls noch keine Daten vorhanden sind
  const games = data ? data.games : [];
  const timer = data ? data.timer : { hours: 0, minutes: 0, seconds: 0 };

  res.status(200).json({ games, timer });
};
