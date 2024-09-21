let timer = { hours: 0, minutes: 0, seconds: 0 };

export default (req, res) => {
  if (req.method === 'POST') {
    timer = req.body;
    res.status(200).json({ message: 'Timer updated successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
