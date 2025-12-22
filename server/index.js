require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 4000;

// In-memory sample storage (for demo only)
const matches = [
  { id: 1, players: ['Alice', 'Bob'], result: 'Alice' },
  { id: 2, players: ['Carol', 'Dave'], result: 'Dave' },
];

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

app.use(morgan('dev'));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

// Health
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Matches
app.get('/api/matches', (req, res) => {
  res.json(matches);
});

app.post('/api/matches', (req, res) => {
  const { players, result } = req.body;
  if (!players || !Array.isArray(players)) return res.status(400).json({ error: 'Invalid players' });
  const id = matches.length ? matches[matches.length - 1].id + 1 : 1;
  const match = { id, players, result: result || null };
  matches.push(match);
  res.status(201).json(match);
});

// Users
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Game Gambit backend listening on port ${PORT}`);
});
