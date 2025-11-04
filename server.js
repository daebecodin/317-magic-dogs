const express = require('express');
const path = require('path');
const app = express();

// Serve static files from public directory
app.use(express.static('public'));

// Route handlers for all pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/how-it-works', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'how-it-works.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/impact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'impact.html'));
});

app.get('/nearby', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'nearby.html'));
});

app.get('/explore', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'explore.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.listen(3000, () => console.log('Server running on port 3000'));
