require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const pool = require('./db/pool');

// Add fetch for Node.js versions < 18
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true in production with HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Pet API Service
class PetApiService {
    static async getPetById(petId) {
        try {
            const response = await fetch(`https://onlypets-api-wrapper.onrender.com/petfinder/animals/${petId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
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
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error searching pets:', error);
            throw error;
        }
    }
}

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'Authentication required' });
    }
};

// Test database connection
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ 
            success: true, 
            message: 'Database connected successfully',
            timestamp: result.rows[0].now 
        });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Database connection failed',
            details: error.message 
        });
    }
});

// Authentication Routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, phone, address } = req.body;
        
        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }

        // Check if user already exists
        const existingUser = await pool.query(
            'SELECT id FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert new user
        const result = await pool.query(
            'INSERT INTO users (username, email, password_hash, first_name, last_name, phone, address) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, username, email, first_name, last_name',
            [username, email, passwordHash, firstName, lastName, phone, address]
        );

        const user = result.rows[0];
        req.session.userId = user.id;
        req.session.username = user.username;

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Find user
        const result = await pool.query(
            'SELECT id, username, email, password_hash, first_name, last_name FROM users WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Set session
        req.session.userId = user.id;
        req.session.username = user.username;

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        res.json({ success: true, message: 'Logout successful' });
    });
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, username, email, first_name, last_name, phone, address FROM users WHERE id = $1',
            [req.session.userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = result.rows[0];
        res.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                phone: user.phone,
                address: user.address
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Failed to get user data' });
    }
});

// Pet Routes with Database Integration
app.get('/api/pets/search', async (req, res) => {
    try {
        const searchParams = req.query;
        const userId = req.session.userId;

        // Log search history if user is logged in
        if (userId) {
            await pool.query(
                'INSERT INTO search_history (user_id, search_type, search_location, search_filters) VALUES ($1, $2, $3, $4)',
                [userId, searchParams.type || 'all', searchParams.location || '', JSON.stringify(searchParams)]
            );
        }

        // Update popular searches
        const searchTerm = `${searchParams.type || 'all'}_${searchParams.location || 'anywhere'}`;
        await pool.query(
            'INSERT INTO popular_searches (search_term, search_count, last_searched) VALUES ($1, 1, NOW()) ON CONFLICT (search_term) DO UPDATE SET search_count = popular_searches.search_count + 1, last_searched = NOW()',
            [searchTerm]
        );

        // Get pets from API
        const pets = await PetApiService.searchPets(searchParams);

        // Cache animal data in database
        if (pets.animals && pets.animals.length > 0) {
            for (const animal of pets.animals.slice(0, 10)) { // Cache first 10 results
                try {
                    await pool.query(
                        `INSERT INTO cached_animals (api_id, name, type, breed, age, gender, size, location, description, photos, contact_info, api_data, last_updated) 
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()) 
                         ON CONFLICT (api_id) DO UPDATE SET 
                         name = EXCLUDED.name, 
                         last_updated = NOW(), 
                         api_data = EXCLUDED.api_data`,
                        [
                            animal.id,
                            animal.name || 'Unknown',
                            animal.type || 'Unknown',
                            animal.breeds?.primary || 'Mixed',
                            animal.age || 'Unknown',
                            animal.gender || 'Unknown',
                            animal.size || 'Unknown',
                            animal.contact?.address?.city || 'Unknown',
                            animal.description || '',
                            JSON.stringify(animal.photos || []),
                            JSON.stringify(animal.contact || {}),
                            JSON.stringify(animal)
                        ]
                    );
                } catch (cacheError) {
                    console.log('Cache error for animal:', animal.id, cacheError.message);
                }
            }

            // Update search results count
            if (userId) {
                await pool.query(
                    'UPDATE search_history SET results_count = $1 WHERE user_id = $2 AND id = (SELECT MAX(id) FROM search_history WHERE user_id = $2)',
                    [pets.animals.length, userId]
                );
            }
        }

        res.json(pets);
    } catch (error) {
        console.error('Pet search error:', error);
        res.status(500).json({ error: 'Failed to search pets' });
    }
});

app.get('/api/pets/:id', async (req, res) => {
    try {
        const petId = req.params.id;

        // First try to get from cache
        const cachedResult = await pool.query(
            'SELECT * FROM cached_animals WHERE api_id = $1 AND last_updated > NOW() - INTERVAL \'1 hour\'',
            [petId]
        );

        if (cachedResult.rows.length > 0) {
            console.log('Serving pet from cache:', petId);
            res.json({ animal: cachedResult.rows[0].api_data });
        } else {
            // Get from API and cache
            const pet = await PetApiService.getPetById(petId);
            
            // Cache the result
            if (pet.animal) {
                await pool.query(
                    `INSERT INTO cached_animals (api_id, name, type, breed, age, gender, size, location, description, photos, contact_info, api_data, last_updated) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW()) 
                     ON CONFLICT (api_id) DO UPDATE SET 
                     api_data = EXCLUDED.api_data, 
                     last_updated = NOW()`,
                    [
                        pet.animal.id,
                        pet.animal.name || 'Unknown',
                        pet.animal.type || 'Unknown',
                        pet.animal.breeds?.primary || 'Mixed',
                        pet.animal.age || 'Unknown',
                        pet.animal.gender || 'Unknown',
                        pet.animal.size || 'Unknown',
                        pet.animal.contact?.address?.city || 'Unknown',
                        pet.animal.description || '',
                        JSON.stringify(pet.animal.photos || []),
                        JSON.stringify(pet.animal.contact || {}),
                        JSON.stringify(pet.animal)
                    ]
                );
            }
            
            res.json(pet);
        }
    } catch (error) {
        console.error('Get pet error:', error);
        res.status(500).json({ error: 'Failed to get pet details' });
    }
});

// New Database-driven endpoints
app.get('/api/search/history', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        const result = await pool.query(
            'SELECT * FROM search_history WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20',
            [userId]
        );

        res.json({ searchHistory: result.rows });
    } catch (error) {
        console.error('Get search history error:', error);
        res.status(500).json({ error: 'Failed to get search history' });
    }
});

app.get('/api/search/popular', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT search_term, search_count FROM popular_searches ORDER BY search_count DESC LIMIT 10'
        );

        res.json({ popularSearches: result.rows });
    } catch (error) {
        console.error('Get popular searches error:', error);
        res.status(500).json({ error: 'Failed to get popular searches' });
    }
});

app.get('/api/animals/cached', async (req, res) => {
    try {
        const { type, limit = 20 } = req.query;
        
        let query = 'SELECT api_id, name, type, breed, age, gender, size, location, photos FROM cached_animals WHERE is_available = true';
        let params = [];
        
        if (type) {
            query += ' AND LOWER(type) = LOWER($1)';
            params.push(type);
        }
        
        query += ' ORDER BY last_updated DESC LIMIT $' + (params.length + 1);
        params.push(limit);

        const result = await pool.query(query, params);

        res.json({ 
            animals: result.rows,
            source: 'database_cache',
            count: result.rows.length 
        });
    } catch (error) {
        console.error('Get cached animals error:', error);
        res.status(500).json({ error: 'Failed to get cached animals' });
    }
});

app.get('/api/dashboard/stats', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;

        // Get user stats
        const [favoritesCount, applicationsCount, searchCount] = await Promise.all([
            pool.query('SELECT COUNT(*) FROM favorite_pets WHERE user_id = $1', [userId]),
            pool.query('SELECT COUNT(*) FROM adoption_applications WHERE user_id = $1', [userId]),
            pool.query('SELECT COUNT(*) FROM search_history WHERE user_id = $1', [userId])
        ]);

        // Get recent activity
        const recentActivity = await pool.query(
            `SELECT 'search' as type, search_type as details, created_at FROM search_history WHERE user_id = $1
             UNION ALL
             SELECT 'favorite' as type, pet_name as details, added_at as created_at FROM favorite_pets WHERE user_id = $1
             UNION ALL
             SELECT 'application' as type, pet_name as details, created_at FROM adoption_applications WHERE user_id = $1
             ORDER BY created_at DESC LIMIT 10`,
            [userId]
        );

        res.json({
            stats: {
                favorites: parseInt(favoritesCount.rows[0].count),
                applications: parseInt(applicationsCount.rows[0].count),
                searches: parseInt(searchCount.rows[0].count)
            },
            recentActivity: recentActivity.rows
        });
    } catch (error) {
        console.error('Get dashboard stats error:', error);
        res.status(500).json({ error: 'Failed to get dashboard stats' });
    }
});

// Favorites Routes
app.post('/api/pets/:id/favorite', requireAuth, async (req, res) => {
    try {
        const petId = req.params.id;
        const userId = req.session.userId;

        // Get pet details from API
        const pet = await PetApiService.getPetById(petId);
        
        // Insert favorite (ignore if already exists)
        await pool.query(
            'INSERT INTO favorite_pets (user_id, pet_api_id, pet_name, pet_type, pet_breed) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (user_id, pet_api_id) DO NOTHING',
            [userId, petId, pet.animal?.name || 'Unknown', pet.animal?.type || 'Unknown', pet.animal?.breeds?.primary || 'Mixed']
        );

        res.json({ success: true, message: 'Pet added to favorites' });
    } catch (error) {
        console.error('Add favorite error:', error);
        res.status(500).json({ error: 'Failed to add pet to favorites' });
    }
});

app.delete('/api/pets/:id/favorite', requireAuth, async (req, res) => {
    try {
        const petId = req.params.id;
        const userId = req.session.userId;

        await pool.query(
            'DELETE FROM favorite_pets WHERE user_id = $1 AND pet_api_id = $2',
            [userId, petId]
        );

        res.json({ success: true, message: 'Pet removed from favorites' });
    } catch (error) {
        console.error('Remove favorite error:', error);
        res.status(500).json({ error: 'Failed to remove pet from favorites' });
    }
});

app.get('/api/pets/favorites', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        const result = await pool.query(
            'SELECT * FROM favorite_pets WHERE user_id = $1 ORDER BY added_at DESC',
            [userId]
        );

        res.json({ favorites: result.rows });
    } catch (error) {
        console.error('Get favorites error:', error);
        res.status(500).json({ error: 'Failed to get favorite pets' });
    }
});

// Adoption Application Routes
app.post('/api/applications', requireAuth, async (req, res) => {
    try {
        const { petApiId, petName, message } = req.body;
        const userId = req.session.userId;

        if (!petApiId || !petName) {
            return res.status(400).json({ error: 'Pet ID and name are required' });
        }

        const result = await pool.query(
            'INSERT INTO adoption_applications (user_id, pet_api_id, pet_name, message) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, petApiId, petName, message]
        );

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            application: result.rows[0]
        });
    } catch (error) {
        console.error('Submit application error:', error);
        res.status(500).json({ error: 'Failed to submit application' });
    }
});

app.get('/api/applications', requireAuth, async (req, res) => {
    try {
        const userId = req.session.userId;
        const result = await pool.query(
            'SELECT * FROM adoption_applications WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );

        res.json({ applications: result.rows });
    } catch (error) {
        console.error('Get applications error:', error);
        res.status(500).json({ error: 'Failed to get applications' });
    }
});

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`🐕 Pet Adoption Server running at http://localhost:${port}`);
    console.log(`📊 Database: ${process.env.DB_NAME} on ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    console.log(`🔗 Test database connection: http://localhost:${port}/api/test-db`);
});
