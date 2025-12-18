require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('./db/pool');

// Import routes
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);

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

// Serve HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

app.get('/explore', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'explore.html'));
});

app.get('/favorites', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'favorites.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'signup.html'));
});

app.listen(port, () => {
    console.log(`Magic Dawgs server running on http://localhost:${port}`);
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "login.html"));
});