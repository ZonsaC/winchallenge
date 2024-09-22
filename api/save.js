import { writeFile } from 'fs/promises';  // Um Daten in eine Datei zu schreiben
import path from 'path';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    if (!req.body || !req.body.games || !req.body.timer) {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }

    const data = {
      games: req.body.games,
      timer: req.body.timer
    };

    // Speichere die Daten in einer JSON-Datei
    const filePath = path.join(process.cwd(), 'data.json');
    await writeFile(filePath, JSON.stringify(data, null, 2));

    res.status(200).json({ message: 'Data saved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
