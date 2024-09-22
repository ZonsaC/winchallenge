import { readFile } from 'fs/promises';  // Um Daten aus einer Datei zu lesen
import path from 'path';

export default async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), 'data.json');
    const fileData = await readFile(filePath, 'utf8');
    const data = JSON.parse(fileData);

    res.status(200).json(data);
  } catch (error) {
    // Wenn die Datei nicht gefunden wird oder ein Fehler auftritt, gib leere Daten zurück
    res.status(200).json({ games: [], timer: { hours: 0, minutes: 0, seconds: 0 } });
  }
};
