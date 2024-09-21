import { promises as fs } from 'fs';
const filePath = './data.json';  // Datei zum Laden der Daten

export default async (req, res) => {
  try {
    // Datei lesen und Daten zurückgeben
    const data = await fs.readFile(filePath, 'utf-8');
    const parsedData = JSON.parse(data);
    res.status(200).json(parsedData);
  } catch (error) {
    res.status(500).json({ message: 'Error loading data', error });
  }
};
