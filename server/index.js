// index.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

console.log('🔥 index.js started');

app.use(cors());
app.use(express.json());

console.log('✅ Loaded .env');

let db;

(async () => {
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 8889,
    });
    console.log('✅ Connected to MySQL');
  } catch (err) {
    console.error('❌ MySQL connection error:', err.message);
    process.exit(1);
  }
})();

app.get('/', (req, res) => {
  res.send('API Running');
});

app.post('/signup', async (req, res) => {
  const { email, password, handle } = req.body;

  if (!email || !password || !handle) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE email = ? OR handle = ?', [email, handle]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Email or handle already taken' });
    }

    const hash = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password_hash, handle) VALUES (?, ?, ?)', [email, hash, handle]);

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('❌ Signup failed:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('📥 LOGIN endpoint HIT');
console.log('📩 Email:', email);
console.log('📩 Password:', password);
console.log('📩 User from DB:', user);
console.log('🔒 Compare result:', match);

  if (!email || !password) {
    return res.status(400).json({ message: 'Missing email or password' });
  }

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        handle: user.handle,
      },
    });
  } catch (err) {
    console.error('❌ Login failed:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});