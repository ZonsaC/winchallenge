let games = [];
let timer = { hours: 0, minutes: 0, seconds: 0 };

export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // CORS aktivieren, wenn nötig
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

<<<<<<< HEAD
  if (req.method === 'POST') {
    const { games, timer } = req.body;

    try {
      // Daten in eine JSON-Datei schreiben
      const data = JSON.stringify({ games, timer }, null, 2);  // Formatierung für bessere Lesbarkeit
      await fs.writeFile(filePath, data);  // Datei schreiben
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error saving data:', error);  // Log für Fehlerüberwachung
      res.status(500).json({ message: 'Error saving data', error });
    }
=======
  if (req.method === 'POST') {  // POST-Methode prüfen
    games = req.body.games;     // Spiele aktualisieren
    timer = req.body.timer;     // Timer aktualisieren
    res.status(200).json({ message: 'Data saved successfully' });
>>>>>>> parent of a1b7689 (Changed to Filesaving)
  } else {
    res.status(405).json({ message: 'Method not allowed' });  // Andere Methoden ablehnen
  }
};
