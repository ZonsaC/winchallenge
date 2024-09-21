import { promises as fs } from 'fs';
const filePath = './data.json';  // Datei zum Laden der Daten

export default async (req, res) => {
  try {
    // Überprüfen, ob die Datei existiert
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    
    if (!fileExists) {
      // Falls die Datei nicht existiert, initialisieren wir leere Daten
      const initialData = { games: [], timer: { hours: 0, minutes: 0, seconds: 0 } };
      await fs.writeFile(filePath, JSON.stringify(initialData, null, 2));
      res.status(200).json(initialData);
    } else {
      // Datei lesen und Daten zurückgeben
      const data = await fs.readFile(filePath, 'utf-8');
      const parsedData = JSON.parse(data);
      res.status(200).json(parsedData);
    }
  } catch (error) {
    console.error('Error loading data:', error);  // Log für Fehlerüberwachung
    res.status(500).json({ message: 'Error loading data', error });
  }
};
