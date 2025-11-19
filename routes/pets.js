const express = require('express');
const pool = require('../db/pool');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Pet API Service
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class PetApiService {
    static async getPetById(petId) {
        try {
            const response = await fetch(`https://onlypets-api-wrapper.onrender.com/petfinder/animals/${petId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching pet:', error);
            throw error;
        }
    }

    static async searchPets(params = {}) {
        try {
            const queryParams = new URLSearchParams();
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined && params[key] !== '') {
                    queryParams.append(key, params[key]);
                }
            });

            const url = `https://onlypets-api-wrapper.onrender.com/petfinder/animals${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Error searching pets:', error);
            throw error;
        }
    }
}

// Search pets (public)
router.get('/search', async (req, res) => {
    try {
        const pets = await PetApiService.searchPets(req.query);
        res.json(pets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search pets', details: error.message });
    }
});

// Get pet by ID (public)
router.get('/:id', async (req, res) => {
    try {
        const pet = await PetApiService.getPetById(req.params.id);
        res.json(pet);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pet', details: error.message });
    }
});

// Add to favorites (protected)
router.post('/favorites', verifyToken, async (req, res) => {
    try {
        const { petId, petData } = req.body;
        await pool.query(
            'INSERT INTO favorite_pets (user_id, pet_id, pet_data) VALUES ($1, $2, $3) ON CONFLICT (user_id, pet_id) DO NOTHING',
            [req.user.id, petId, JSON.stringify(petData)]
        );
        res.json({ success: true, message: 'Pet added to favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add favorite', details: error.message });
    }
});

// Get user favorites (protected)
router.get('/favorites/list', verifyToken, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM favorite_pets WHERE user_id = $1', [req.user.id]);
        res.json({ success: true, favorites: result.rows });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch favorites', details: error.message });
    }
});

// Remove from favorites (protected)
router.delete('/favorites/:petId', verifyToken, async (req, res) => {
    try {
        await pool.query('DELETE FROM favorite_pets WHERE user_id = $1 AND pet_id = $2', [req.user.id, req.params.petId]);
        res.json({ success: true, message: 'Pet removed from favorites' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove favorite', details: error.message });
    }
});

module.exports = router;
