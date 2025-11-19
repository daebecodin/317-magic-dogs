# Pet Adoption Site - API Documentation

## External Pet APIs

### Base URL
```
https://onlypets-api-wrapper.onrender.com
```

## PetFinder API Endpoints

### 🐕 Animals Endpoints

#### Get Animals
Retrieve a list of animals with extensive filtering options.

**Endpoint:** `GET /petfinder/animals`

**Query Parameters:**
| Parameter | Type | Description | Example Values |
|-----------|------|-------------|----------------|
| `type` | string | Animal type | `dog`, `cat`, `bird`, `rabbit`, `small-furry`, `horse`, `barnyard`, `scales-fins-other` |
| `breed` | string | Animal breed (comma-separated) | `pug,samoyed` |
| `size` | string | Animal size (comma-separated) | `small`, `medium`, `large`, `xlarge` |
| `gender` | string | Animal gender (comma-separated) | `male`, `female`, `unknown` |
| `age` | string | Animal age (comma-separated) | `baby`, `young`, `adult`, `senior` |
| `color` | string | Animal color | Values from Get Animal Types |
| `coat` | string | Animal coat (comma-separated) | `short`, `medium`, `long`, `wire`, `hairless`, `curly` |
| `status` | string | Adoption status (comma-separated) | `adoptable`, `adopted`, `found` (default: `adoptable`) |
| `name` | string | Animal name (partial matches) | `Fred` (matches "Alfredo", "Frederick") |
| `organization` | string | Organization ID(s) (comma-separated) | `CA2702,TX123` |
| `good_with_children` | boolean | Good with children | `true`, `false`, `1`, `0` |
| `good_with_dogs` | boolean | Good with dogs | `true`, `false`, `1`, `0` |
| `good_with_cats` | boolean | Good with cats | `true`, `false`, `1`, `0` |
| `house_trained` | boolean | House trained | `true`, `1` only |
| `declawed` | boolean | Declawed | `true`, `1` only |
| `special_needs` | boolean | Special needs | `true`, `1` only |
| `location` | string | Location filter | `Seattle, WA`, `90210`, `47.6062,-122.3321` |
| `distance` | integer | Distance from location (miles) | `25` (default: 100, max: 500) |
| `before` | string | Published before date | `2019-10-07T19:13:01+00:00` |
| `after` | string | Published after date | `2019-10-07T19:13:01+00:00` |
| `sort` | string | Sort order | `recent`, `-recent`, `distance`, `-distance`, `random` |
| `page` | integer | Page number | `1` (default: 1) |
| `limit` | integer | Results per page | `20` (default: 20, max: 100) |

**Example Requests:**
```bash
# Get all dogs
GET /petfinder/animals?type=dog

# Get small, young dogs good with children
GET /petfinder/animals?type=dog&size=small&age=young&good_with_children=true

# Get cats in Seattle within 25 miles
GET /petfinder/animals?type=cat&location=Seattle,WA&distance=25
```

#### Get Single Animal
**Endpoint:** `GET /petfinder/animals/{id}`

**Example:**
```bash
GET /petfinder/animals/77921117
```

#### Get Animal Types
**Endpoint:** `GET /petfinder/types/{type}`

#### Get Animal Breeds
**Endpoint:** `GET /petfinder/types/{type}/breeds`

### 🏢 Organizations Endpoints

#### Get Organizations
**Endpoint:** `GET /petfinder/organizations`

#### Get Single Organization
**Endpoint:** `GET /petfinder/organizations/{id}`

---

## Rescue Groups API Endpoints

### 🐕 Animals Endpoints

#### Get All Dogs
**Endpoint:** `GET /rescuegroups/dogs` or `POST /rescuegroups/dogs`

#### Get Dog Breeds
**Endpoint:** `POST /rescuegroups/dog-breeds`

#### Get Dog Species Information
**Endpoint:** `GET /rescuegroups/dog-species`

#### Get All Animal Species
**Endpoint:** `GET /rescuegroups/all-species`

### 🏢 Organizations Endpoints

#### Get All Organizations
**Endpoint:** `GET /rescuegroups/orgs`

#### Get Organization by ID
**Endpoint:** `GET /rescuegroups/orgs/id`

#### Get Rescue Organizations
**Endpoint:** `GET /rescuegroups/rescues` or `POST /rescuegroups/rescues`

#### Get Shelter Organizations
**Endpoint:** `GET /rescuegroups/shelters` or `POST /rescuegroups/shelters`

### 🎨 Metadata Endpoints

#### Get Animal Patterns
**Endpoint:** `GET /rescuegroups/patterns`

#### Get Animal Colors
**Endpoint:** `GET /rescuegroups/colors`

#### Get Animal Statuses
**Endpoint:** `GET /rescuegroups/statuses`

#### Get Single Status
**Endpoint:** `GET /rescuegroups/status`

---

## Our Backend API Endpoints

### 🔐 Authentication Endpoints

#### Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "phone": "string (optional)",
  "address": "string (optional)"
}
```

#### Login User
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

#### Logout User
**Endpoint:** `POST /api/auth/logout`

#### Get Current User
**Endpoint:** `GET /api/auth/me`

### 🐾 Pet Management Endpoints

#### Get Pet Details (from API)
**Endpoint:** `GET /api/pets/{id}`

#### Search Pets (from API)
**Endpoint:** `GET /api/pets/search`

**Query Parameters:** Same as PetFinder API

#### Add Pet to Favorites
**Endpoint:** `POST /api/pets/{id}/favorite`

#### Remove Pet from Favorites
**Endpoint:** `DELETE /api/pets/{id}/favorite`

#### Get User's Favorite Pets
**Endpoint:** `GET /api/pets/favorites`

### 📝 Adoption Application Endpoints

#### Submit Adoption Application
**Endpoint:** `POST /api/applications`

**Request Body:**
```json
{
  "petApiId": "string",
  "petName": "string",
  "message": "string"
}
```

#### Get User's Applications
**Endpoint:** `GET /api/applications`

#### Get Application by ID
**Endpoint:** `GET /api/applications/{id}`

---

## Database Schema

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

---

## Frontend Pages Structure

### Public Pages (in /public/)
- `index.html` - Homepage with featured pets
- `about.html` - About the organization
- `explore.html` - Browse all pets
- `nearby.html` - Find pets nearby
- `signup.html` - User registration
- `how-it-works.html` - How adoption works
- `impact.html` - Impact statistics

### Dynamic Content Areas
- Pet search results
- User dashboard (favorites, applications)
- Individual pet details
- User profile management

---

## Implementation Checklist

### ✅ Completed
- [x] Project structure setup
- [x] Package.json with dependencies
- [x] Environment variables (.env)
- [x] Database schema design
- [x] API documentation

### 🔄 In Progress
- [ ] Database connection (pool.js)
- [ ] Express server setup
- [ ] Authentication middleware
- [ ] Pet API service
- [ ] Backend routes
- [ ] Frontend JavaScript integration

### 📋 Todo
- [ ] User registration/login
- [ ] Pet search functionality
- [ ] Favorites system
- [ ] Adoption applications
- [ ] User dashboard
- [ ] Database export/import
- [ ] Testing and deployment
