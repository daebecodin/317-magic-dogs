const express = require('express');
const pool = require('../db/pool');
const router = express.Router();

router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        
        const sessionResult = await pool.query(
            'SELECT u.id, u.username, u.email, u.first_name, u.last_name FROM user_sessions s JOIN users u ON s.user_id = u.id WHERE s.session_token = $1 AND s.expires_at > NOW()',
            [token]
        );
        
        if (sessionResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        
        const user = sessionResult.rows[0];
        res.json({ user });
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const userResult = await pool.query(
            'SELECT id, username, email, first_name, last_name, password_hash FROM users WHERE username = $1 OR email = $1',
            [username]
        );
        
        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const user = userResult.rows[0];
        
        // For now, simple password check (you should use bcrypt)
        if (password !== 'password') {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Create session token
        const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        
        await pool.query(
            'INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3)',
            [user.id, token, expiresAt]
        );
        
        res.json({ 
            token, 
            user: { 
                id: user.id, 
                username: user.username, 
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            } 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
