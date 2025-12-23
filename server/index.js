require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 4000;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || 'game_gambit';

let db = null;

// Connect to MongoDB
async function connectDB() {
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`Connected to MongoDB: ${DB_NAME}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

app.use(morgan('dev'));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

// Root/Health
app.get('/', (req, res) => res.json({ message: 'Game Gambit API is running', version: '1.0.0' }));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Matches - Read from MongoDB
app.get('/api/matches', async (req, res) => {
  try {
    const matches = await db.collection('matches').find({}).toArray();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create Match - Write to MongoDB
app.post('/api/matches', async (req, res) => {
  try {
    const { players, result, game, stake } = req.body;
    if (!players || !Array.isArray(players)) return res.status(400).json({ error: 'Invalid players' });
    
    const match = { 
      players, 
      result: result || null,
      game: game || 'Unknown',
      stake: stake || '0 SOL',
      createdAt: new Date()
    };
    
    const result_insert = await db.collection('matches').insertOne(match);
    res.status(201).json({ ...match, _id: result_insert.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Users - Read from MongoDB
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Game Gambit backend listening on port ${PORT}`);
  });
}

start();

// console.log(process.env.NEXTAUTH_SECRET)