const express = require('express');
const morgan  = require('morgan');
const cors    = require('cors');
const data    = require('./data.json');

const app  = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (!q) return res.json([]);
  const results = data.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q)
  );
  res.json(results);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
