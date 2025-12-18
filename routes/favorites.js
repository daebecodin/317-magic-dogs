const express = require('express');
const pool = require('../db/pool');
const router = express.Router();

// Middleware to verify auth token
async function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        
        const sessionResult = await pool.query(
            'SELECT user_id FROM user_sessions WHERE session_token = $1 AND expires_at > NOW()',
            [token]
        );
        
        if (sessionResult.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        
        req.userId = sessionResult.rows[0].user_id;
        next();
    } catch (error) {
        console.error('Auth error:', error);
        res.status(500).json({ error: 'Server error' });
    }
}

// Get user's favorites
router.get('/', verifyToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM favorite_pets WHERE user_id = $1 ORDER BY added_at DESC',
            [req.userId]
        );
        
        res.json({ favorites: result.rows });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});

// Add pet to favorites
router.post('/', verifyToken, async (req, res) => {
    try {
        const { pet_api_id, pet_name, pet_type, pet_breed } = req.body;
        
        const result = await pool.query(
            'INSERT INTO favorite_pets (user_id, pet_api_id, pet_name, pet_type, pet_breed) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (user_id, pet_api_id) DO NOTHING RETURNING *',
            [req.userId, pet_api_id, pet_name, pet_type, pet_breed]
        );
        
        if (result.rows.length > 0) {
            res.json({ success: true, favorite: result.rows[0] });
        } else {
            res.json({ success: true, message: 'Already in favorites' });
        }
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ error: 'Failed to add favorite' });
    }
});

// Remove pet from favorites
router.delete('/:petId', verifyToken, async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM favorite_pets WHERE user_id = $1 AND pet_api_id = $2 RETURNING *',
            [req.userId, req.params.petId]
        );
        
        if (result.rows.length > 0) {
            res.json({ success: true, message: 'Removed from favorites' });
        } else {
            res.json({ success: false, message: 'Not found in favorites' });
        }
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ error: 'Failed to remove favorite' });
    }
});

module.exports = router;
