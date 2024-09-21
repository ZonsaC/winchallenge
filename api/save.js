let games = [];
let timer = { hours: 0, minutes: 0, seconds: 0 };

export default (req, res) => {
  if (req.method === 'POST') {
    games = req.body.games;
    timer = req.body.timer;
    res.status(200).json({ message: 'Data saved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
