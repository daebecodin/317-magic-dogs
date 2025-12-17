const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, password, email, firstName, lastName } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password_hash, email, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, email',
      [username, hash, email, firstName, lastName]
    );
    res.json({ success: true, message: 'User registered successfully', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Registration error', error: err.message });
  }
});

// Login route — verifies credentials and returns JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if (result.rowCount === 0) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    
    // Create token with 1-hour expiration
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login error', error: err.message });
  }
});

// Get current user info (protected route)
router.get('/me', require('../middleware/auth').verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email FROM users WHERE id=$1', [req.user.id]);
    if (result.rowCount === 0) return res.status(404).json({ success: false, message: 'User not found' });
    
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching user', error: err.message });
  }
});

module.exports = router;
