const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let games = [];
let timer = { hours: 0, minutes: 0, seconds: 0 };

app.use(bodyParser.json());
app.use(express.static('public'));  // Für die statischen Seiten (Admin und Anzeige)

app.post('/save', (req, res) => {
    games = req.body.games;
    timer = req.body.timer;
    res.sendStatus(200);
});

app.post('/save-timer', (req, res) => {
    timer = req.body;
    res.sendStatus(200);
});

app.get('/load', (req, res) => {
    res.json({ games, timer });
});

app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});
