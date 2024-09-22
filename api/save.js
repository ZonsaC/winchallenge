let games = [];  // Globale Definition für Spiele
let timer = { hours: 0, minutes: 0, seconds: 0 };  // Globale Definition für Timer

export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  // CORS aktivieren
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // OPTIONS-Anfrage erlauben (wird bei CORS-Anfragen oft gesendet)
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    // Hier sicherstellen, dass der Request-Body existiert
    if (!req.body || !req.body.games || !req.body.timer) {
      res.status(400).json({ message: 'Invalid request body' });
      return;
    }

    games = req.body.games;  // Spiele aktualisieren
    timer = req.body.timer;  // Timer aktualisieren
    res.status(200).json({ message: 'Data saved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
