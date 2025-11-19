-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Favorite pets table (since pet data comes from API)
CREATE TABLE IF NOT EXISTS favorite_pets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    pet_api_id VARCHAR(50) NOT NULL, -- ID from the API
    pet_name VARCHAR(100),
    pet_type VARCHAR(50),
    pet_breed VARCHAR(100),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, pet_api_id)
);

-- Adoption applications
CREATE TABLE IF NOT EXISTS adoption_applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    pet_api_id VARCHAR(50) NOT NULL,
    pet_name VARCHAR(100),
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions for tracking login state
CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Search history table to track user searches
CREATE TABLE IF NOT EXISTS search_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    search_type VARCHAR(50), -- 'dog', 'cat', etc.
    search_location VARCHAR(100),
    search_filters JSONB, -- Store all search parameters as JSON
    results_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cached animal searches to reduce API calls
CREATE TABLE IF NOT EXISTS cached_animals (
    id SERIAL PRIMARY KEY,
    api_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100),
    type VARCHAR(50),
    breed VARCHAR(100),
    age VARCHAR(20),
    gender VARCHAR(20),
    size VARCHAR(20),
    location VARCHAR(100),
    description TEXT,
    photos JSONB, -- Store photo URLs as JSON array
    contact_info JSONB, -- Store contact details as JSON
    api_data JSONB, -- Store full API response
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_available BOOLEAN DEFAULT true
);

-- Popular searches tracking
CREATE TABLE IF NOT EXISTS popular_searches (
    id SERIAL PRIMARY KEY,
    search_term VARCHAR(100) NOT NULL,
    search_count INTEGER DEFAULT 1,
    last_searched TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(search_term)
);

-- Insert sample user for testing
INSERT INTO users (username, email, password_hash, first_name, last_name) VALUES 
('testuser', 'test@example.com', '$2b$10$example.hash.here', 'Test', 'User') 
ON CONFLICT (username) DO NOTHING;
