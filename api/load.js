let games = [];
let timer = { hours: 0, minutes: 0, seconds: 0 };

export default (req, res) => {
  res.status(200).json({ games, timer });
};
