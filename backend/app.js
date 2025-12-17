import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const { Pool } = pkg;
const app = express();
const pool = new Pool();

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from public directory
app.use(express.static('public'));

// Make database pool accessible in route handlers
app.set('pool', pool);

// Test route
app.get('/test', (req, res) => res.send('Server is working!'));

// API routes
app.use('/api/auth', authRoutes);

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/explore', (req, res) => res.sendFile(path.join(__dirname, 'public', 'explore.html')));
app.get('/signup', (req, res) => res.sendFile(path.join(__dirname, 'public', 'signup.html')));

app.listen(process.env.PORT || 3001, () => console.log(`Server running on port ${process.env.PORT || 3001}`));
