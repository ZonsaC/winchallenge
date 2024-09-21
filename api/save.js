let games = [];
let timer = { hours: 0, minutes: 0, seconds: 0 };

export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // CORS aktivieren, wenn nötig
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'POST') {  // POST-Methode prüfen
    games = req.body.games;     // Spiele aktualisieren
    timer = req.body.timer;     // Timer aktualisieren
    res.status(200).json({ message: 'Data saved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });  // Andere Methoden ablehnen
  }
};
