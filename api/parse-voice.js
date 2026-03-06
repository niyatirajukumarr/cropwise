app.post('/api/parse-voice', async (req, res) => {
  const { transcript, lang } = req.body;
  res.json({ soil: 'loamy', rainfall: 'medium', season: 'rabi' });
});