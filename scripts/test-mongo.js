require('dotenv').config();
const { MongoClient } = require('mongodb');
(async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) { console.error('MONGODB_URI not set'); process.exit(1); }
    const dbName = process.env.MONGODB_DB || process.env.MONGODB_DB_NAME || 'game_gambit';
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    console.log('Connected to', db.databaseName);
    const cols = await db.listCollections().toArray();
    console.log('Collections:', cols.map(c=>c.name));
    const otps = db.collection('otps');
    const doc = await otps.findOne({});
    console.log('One OTP document sample:', doc);
    await client.close();
  } catch (err) {
    console.error('Error', err);
    process.exit(1);
  }
})();
