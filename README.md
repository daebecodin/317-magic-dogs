# 🐕 Pet Adoption Full-Stack Application

A complete full-stack web application for pet adoption built with Express.js, PostgreSQL, and vanilla JavaScript. This project demonstrates a working client → server → database → server → client connection with user authentication, dynamic content loading, and external API integration.

## 🎯 Project Overview

This application allows users to:
- Browse adoptable pets from external APIs
- Register and login with secure authentication
- Save favorite pets to their profile
- Submit adoption applications
- View personalized dashboards with their data

## 🏗️ Architecture

```
Frontend (Public/)     Backend (Server.js)     Database (PostgreSQL)     External APIs
├── HTML Pages    ←→   ├── Express Routes  ←→  ├── Users Table      ←→   PetFinder API
├── CSS Styles         ├── Authentication      ├── Favorites Table       RescueGroups API
└── JavaScript         ├── Session Management  └── Applications Table
                       └── API Integration
```

## 📋 Requirements Met

✅ **File Organization**: Clean separation of frontend/backend  
✅ **PostgreSQL Integration**: Full database connection with pool  
✅ **User Authentication**: Login/logout with bcrypt and sessions  
✅ **Dynamic Content**: Real data from database rendered in UI  
✅ **Full-Stack Flow**: Complete client-server-database connection  

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone and Setup
```bash
# Navigate to project directory
cd /Users/dmac/317-code/magic-dawgs/group-project-memes

# Install dependencies
npm install

# Verify package.json exists with required dependencies
cat package.json
```

### 2. Database Setup
```bash
# Create PostgreSQL user and database
createuser -s woofusai
createdb -O woofusai woofusaidb

# Set user password
psql -d woofusaidb -c "ALTER USER woofusai PASSWORD 'woofusaipw';"

# Create database tables
psql -U woofusai -d woofusaidb -f db/schema.sql

# Verify tables were created
psql -U woofusai -d woofusaidb -c "\dt"
```

### 3. Environment Configuration
Verify `.env` file contains:
```env
DB_USER=woofusai
DB_PASS=woofusaipw
DB_NAME=woofusaidb
DB_HOST=localhost
DB_PORT=5432
SESSION_SECRET=woofusaiss
```

### 4. Start the Application
```bash
# Start the server
npm start

# Or for development with auto-restart
npm run dev
```

### 5. Test the Connection
```bash
# Test database connection
curl http://localhost:3000/api/test-db

# Expected response:
# {"success":true,"message":"Database connected successfully","timestamp":"..."}
```

## 🎪 Presentation Demo Script

### Demo 1: Database Connection (2 minutes)
1. **Show the full-stack architecture**:
   ```bash
   # Terminal 1: Show project structure
   tree -I node_modules
   
   # Terminal 2: Test database
   curl http://localhost:3000/api/test-db
   ```

2. **Explain the setup**:
   - "We have a clean file organization with frontend in `public/` and backend outside"
   - "PostgreSQL database with proper connection pooling"
   - "Environment variables for secure credential management"

### Demo 2: User Authentication (3 minutes)
1. **Show registration**:
   ```bash
   # Register a new user via API
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"demo","email":"demo@test.com","password":"demo123","firstName":"Demo","lastName":"User"}'
   ```

2. **Show login**:
   ```bash
   # Login user
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"demo","password":"demo123"}' \
     -c cookies.txt
   ```

3. **Show protected route**:
   ```bash
   # Access protected user data
   curl http://localhost:3000/api/auth/me -b cookies.txt
   ```

### Demo 3: Dynamic Data & External API (3 minutes)
1. **Show pet search**:
   ```bash
   # Search for pets
   curl "http://localhost:3000/api/pets/search?type=dog&limit=3"
   ```

2. **Show database integration**:
   ```bash
   # Add pet to favorites (requires login)
   curl -X POST http://localhost:3000/api/pets/12345/favorite -b cookies.txt
   
   # Get user's favorites
   curl http://localhost:3000/api/pets/favorites -b cookies.txt
   ```

3. **Show in browser**:
   - Open `http://localhost:3000`
   - Demonstrate user registration/login
   - Show pet browsing and favorites

### Demo 4: Database Queries (2 minutes)
```bash
# Show live database data
psql -U woofusai -d woofusaidb -c "SELECT * FROM users;"
psql -U woofusai -d woofusaidb -c "SELECT * FROM favorite_pets;"
psql -U woofusai -d woofusaidb -c "SELECT * FROM adoption_applications;"
```

## 📁 Project Structure

```
group-project-memes/
├── 📄 README.md                 # This file
├── 📄 API_DOCUMENTATION.md      # Complete API reference
├── 📄 package.json              # Dependencies and scripts
├── 📄 server.js                 # Main Express server
├── 📄 .env                      # Environment variables
├── 📄 .gitignore               # Git ignore rules
│
├── 📁 public/                   # Frontend files
│   ├── 📄 index.html           # Homepage
│   ├── 📄 about.html           # About page
│   ├── 📄 signup.html          # Registration page
│   ├── 📄 explore.html         # Pet browsing
│   ├── 📄 script.js            # Frontend JavaScript
│   ├── 📄 styles.css           # Styling
│   └── 🖼️ [images]             # Static assets
│
├── 📁 db/                       # Database files
│   ├── 📄 pool.js              # PostgreSQL connection
│   ├── 📄 schema.sql           # Database schema
│   └── 📄 backup.sql           # Database export
│
└── 📁 node_modules/             # Dependencies
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
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
```

### Favorite Pets Table
```sql
CREATE TABLE favorite_pets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    pet_api_id VARCHAR(50) NOT NULL,
    pet_name VARCHAR(100),
    pet_type VARCHAR(50),
    pet_breed VARCHAR(100),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, pet_api_id)
);
```

### Adoption Applications Table
```sql
CREATE TABLE adoption_applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    pet_api_id VARCHAR(50) NOT NULL,
    pet_name VARCHAR(100),
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user (protected)

### Pets
- `GET /api/pets/search` - Search pets with filters
- `GET /api/pets/:id` - Get pet details
- `POST /api/pets/:id/favorite` - Add to favorites (protected)
- `DELETE /api/pets/:id/favorite` - Remove from favorites (protected)
- `GET /api/pets/favorites` - Get user favorites (protected)

### Applications
- `POST /api/applications` - Submit adoption application (protected)
- `GET /api/applications` - Get user applications (protected)

### System
- `GET /api/test-db` - Test database connection

## 🧪 Testing Commands

### Test Database Connection
```bash
curl http://localhost:3000/api/test-db
```

### Test User Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'
```

### Test Pet Search
```bash
curl "http://localhost:3000/api/pets/search?type=dog&limit=5"
```

### Test Database Queries
```bash
# Check users
psql -U woofusai -d woofusaidb -c "SELECT id, username, email, created_at FROM users;"

# Check favorites
psql -U woofusai -d woofusaidb -c "SELECT fp.*, u.username FROM favorite_pets fp JOIN users u ON fp.user_id = u.id;"
```

## 📦 Database Export/Import

### Export Database
```bash
# Export as SQL file
pg_dump -U woofusai -W -F p woofusaidb > backup.sql

# Export as tar file
pg_dump -U woofusai -W -F t woofusaidb > backup.tar
```

### Import Database
```bash
# Import from SQL file
psql -U woofusai -d woofusaidb -f backup.sql

# Import from tar file
pg_restore -U woofusai -W -d woofusaidb backup.tar
```

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Start PostgreSQL if needed
brew services start postgresql@14

# Test connection manually
psql -U woofusai -d woofusaidb -c "SELECT version();"
```

### Server Issues
```bash
# Kill existing processes
pkill -f "node server.js"

# Check if port is in use
lsof -i :3000

# Start with verbose logging
DEBUG=* npm start
```

### Permission Issues
```bash
# Fix database permissions
psql -d woofusaidb -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO woofusai;"
psql -d woofusaidb -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO woofusai;"
```

## 🎯 Key Features Demonstrated

1. **Full-Stack Architecture**: Clean separation of concerns
2. **Database Integration**: PostgreSQL with connection pooling
3. **Authentication**: Secure login with bcrypt and sessions
4. **Dynamic Content**: Real-time data from database and external APIs
5. **RESTful API**: Well-structured endpoints
6. **Error Handling**: Comprehensive error management
7. **Security**: Environment variables and input validation

## 📈 Presentation Talking Points

1. **"This demonstrates a complete full-stack application..."**
2. **"We have proper file organization with frontend and backend separation..."**
3. **"The database connection uses environment variables for security..."**
4. **"User authentication includes password hashing and session management..."**
5. **"Dynamic content loads from both our database and external pet APIs..."**
6. **"The application shows a working client-server-database flow..."**

## 🔄 Development Workflow

1. **Start Development**:
   ```bash
   npm run dev  # Auto-restart on changes
   ```

2. **Test Changes**:
   ```bash
   curl http://localhost:3000/api/test-db
   ```

3. **Check Database**:
   ```bash
   psql -U woofusai -d woofusaidb
   ```

4. **Export for Submission**:
   ```bash
   pg_dump -U woofusai -W -F p woofusaidb > backup.sql
   git add backup.sql
   git commit -m "Add PostgreSQL database dump"
   ```

---

## 📞 Quick Help

**If something breaks during presentation:**

1. **Database not connecting**: `brew services restart postgresql@14`
2. **Server won't start**: `pkill -f node && npm start`
3. **Port in use**: `lsof -i :3000` then kill the process
4. **Need to reset**: `psql -U woofusai -d woofusaidb -f db/schema.sql`

**Emergency demo data:**
```bash
# Quick user creation
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"username":"demo","email":"demo@test.com","password":"demo123","firstName":"Demo","lastName":"User"}'
```

---

*Last updated: November 19, 2025*
