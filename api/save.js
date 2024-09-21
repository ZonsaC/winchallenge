import { promises as fs } from 'fs';
const filePath = './data.json';  // Datei zum Speichern der Daten

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {
    const { games, timer } = req.body;

    // Daten in die Datei schreiben
    try {
      await fs.writeFile(filePath, JSON.stringify({ games, timer }));
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error saving data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
