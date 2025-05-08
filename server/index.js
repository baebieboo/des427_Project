console.log('📂 Starting server...');
require('dotenv').config();
console.log('✅ .env loaded');

const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🔥 Backend starting...');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('✅ Middleware loaded');

// 📦 Multer setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// 🛢️ MySQL connection
let db;
(async () => {
  try {
    db = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 8889,
    });
    console.log('✅ Connected to MySQL');
  } catch (err) {
    console.error('❌ MySQL connection error:', err.message);
    process.exit(1);
  }
})();

// 🌐 Routes
app.get('/', (req, res) => {
  res.send('API Running');
});

// 🧾 Signup
app.post('/signup', async (req, res) => {
  const { email, password, handle } = req.body;
  if (!email || !password || !handle) return res.status(400).json({ message: 'Missing fields' });
  try {
    const [existing] = await db.query(
      'SELECT * FROM users WHERE email = ? OR handle = ?',
      [email, handle]
    );
    if (existing.length > 0) return res.status(400).json({ message: 'Email or handle already taken' });

    const hash = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (email, password_hash, handle) VALUES (?, ?, ?)',
      [email, hash, handle]
    );
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('❌ Signup failed:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔐 Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing email or password' });

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];
    if (!user) return res.status(401).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ message: 'Incorrect password' });

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

// 📤 Upload photo
app.post('/upload', upload.single('image'), async (req, res) => {
  const { user_id } = req.body;
  const file = req.file;
  if (!file || !user_id) return res.status(400).json({ message: 'Missing image or user ID' });

  const imageUrl = `http://172.20.10.2:3000/uploads/${file.filename}`;

  try {
    await db.query('INSERT INTO photos (user_id, image_url) VALUES (?, ?)', [user_id, imageUrl]);
    res.status(201).json({ message: 'Uploaded', imageUrl });
  } catch (err) {
    console.error('❌ Upload error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 📰 Feed (followed users)
app.get('/feed/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const [photos] = await db.query(
      `SELECT p.id, p.image_url, u.handle as user_handle
       FROM photos p
       JOIN follows f ON p.user_id = f.following_id
       JOIN users u ON p.user_id = u.id
       WHERE f.follower_id = ?
       ORDER BY p.uploaded_at DESC`,
      [userId]
    );
    res.json({ photos });
  } catch (err) {
    console.error('❌ Feed fetch error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔍 Search with isFollowing
app.get('/search', async (req, res) => {
    const { query, currentUserId } = req.query;
  
    if (!query || !currentUserId) {
      return res.status(400).json({ message: 'Missing query or user id' });
    }
  
    try {
      const [users] = await db.query(
        `SELECT u.id, u.handle,
          EXISTS (
            SELECT 1 FROM follows f
            WHERE f.follower_id = ? AND f.following_id = u.id
          ) AS isFollowing
         FROM users u
         WHERE u.handle LIKE ? AND u.id != ?`,
        [currentUserId, `%${query}%`, currentUserId]
      );
  
      res.json({ users });
    } catch (err) {
      console.error('❌ Search error:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });

// ➕ Follow
app.post('/follow', async (req, res) => {
  const { follower_id, following_id } = req.body;
  if (!follower_id || !following_id) return res.status(400).json({ message: 'Missing fields' });
  try {
    await db.query('INSERT INTO follows (follower_id, following_id) VALUES (?, ?)', [follower_id, following_id]);
    res.status(200).json({ message: 'Followed' });
  } catch (err) {
    console.error('❌ Follow error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// ➖ Unfollow
app.post('/unfollow', async (req, res) => {
  const { follower_id, following_id } = req.body;
  if (!follower_id || !following_id) return res.status(400).json({ message: 'Missing fields' });
  try {
    await db.query('DELETE FROM follows WHERE follower_id = ? AND following_id = ?', [follower_id, following_id]);
    res.status(200).json({ message: 'Unfollowed' });
  } catch (err) {
    console.error('❌ Unfollow error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});