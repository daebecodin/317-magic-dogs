# RescueGroups API Search Guide

## Base URL
```
https://onlypets-api-wrapper.onrender.com
```

## Table of Contents
- [Animals](#animals)
- [Organizations](#organizations)
- [Breeds](#breeds)
- [Metadata](#metadata)
- [Advanced Filtering](#advanced-filtering)
- [Radius Search](#radius-search)

---

## Animals

### Get All Animals
```bash
GET /rescuegroups/animals?limit=25&page=1
```

**Example:**
```bash
curl "https://onlypets-api-wrapper.onrender.com/rescuegroups/animals?limit=10"
```

**Response:**
```json
{
  "meta": {
    "count": 3135522,
    "countReturned": 10,
    "pageReturned": 1
  },
  "data": [
    {
      "id": "12345",
      "attributes": {
        "name": "Buddy",
        "breedString": "Labrador Retriever",
        "ageString": "2 Years",
        "sizeGroup": "Large",
        "sex": "Male",
        "pictureThumbnailUrl": "https://cdn.rescuegroups.org/..."
      }
    }
  ]
}
```

### Get Single Animal
```bash
GET /rescuegroups/animals/{id}
```

**Example:**
```bash
curl "https://onlypets-api-wrapper.onrender.com/rescuegroups/animals/1000001"
```

**Response:**
```json
{
  "data": [{
    "id": "1000001",
    "attributes": {
      "name": "Bernie",
      "breedString": "English Bulldog / Beagle / Mixed",
      "ageString": "14 Years 4 Months",
      "descriptionText": "Full description...",
      "isDogsOk": true,
      "isCatsOk": true,
      "isKidsOk": true
    }
  }]
}
```

### Search Animals with Filters
```bash
POST /rescuegroups/animals/search?limit=25&page=1
Content-Type: application/json
```

**Example 1: Filter by Size**
```bash
curl -X POST "https://onlypets-api-wrapper.onrender.com/rescuegroups/animals/search?limit=10" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "filters": [
        {
          "fieldName": "animals.sizeGroup",
          "operation": "equal",
          "criteria": "Small"
        }
      ]
    }
  }'
```

**Example 2: Multiple Filters**
```bash
curl -X POST "https://onlypets-api-wrapper.onrender.com/rescuegroups/animals/search" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "filters": [
        {
          "fieldName": "animals.sex",
          "operation": "equal",
          "criteria": "Female"
        },
        {
          "fieldName": "animals.sizeGroup",
          "operation": "equal",
          "criteria": "Small"
        },
        {
          "fieldName": "animals.isKidsOk",
          "operation": "equal",
          "criteria": true
        }
      ]
    }
  }'
```

**Example 3: Animals with Pictures**
```bash
curl -X POST "https://onlypets-api-wrapper.onrender.com/rescuegroups/animals/search" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "filters": [
        {
          "fieldName": "animals.pictureCount",
          "operation": "greaterthan",
          "criteria": 0
        }
      ]
    }
  }'
```

---

## Organizations

### Get All Organizations
```bash
GET /rescuegroups/organizations?limit=25&page=1
```

**Example:**
```bash
curl "https://onlypets-api-wrapper.onrender.com/rescuegroups/organizations?limit=5"
```

**Response:**
```json
{
  "meta": {
    "count": 4191,
    "countReturned": 5
  },
  "data": [
    {
      "id": "123",
      "attributes": {
        "name": "Cat Rescue of Maryland",
        "city": "Baltimore",
        "state": "MD",
        "email": "info@rescue.org",
        "phone": "(555) 123-4567"
      }
    }
  ]
}
```

### Get Single Organization
```bash
GET /rescuegroups/organizations/{id}
```

**Example:**
```bash
curl "https://onlypets-api-wrapper.onrender.com/rescuegroups/organizations/854"
```

---

## Breeds

### Get Breeds by Type
```bash
GET /rescuegroups/types/{type}/breeds
```

**Supported Types:** dogs, cats, birds, rabbits, etc.

**Example:**
```bash
curl "https://onlypets-api-wrapper.onrender.com/rescuegroups/types/dogs/breeds"
```

**Response:**
```json
{
  "meta": {
    "count": 807
  },
  "data": [
    {
      "id": "90",
      "attributes": {
        "name": "Beagle"
      }
    },
    {
      "id": "162",
      "attributes": {
        "name": "Labrador Retriever"
      }
    }
  ]
}
```

---

## Metadata

### Get All Species
```bash
GET /rescuegroups/species
```

**Example:**
```bash
curl "https://onlypets-api-wrapper.onrender.com/rescuegroups/species"
```

**Response:**
```json
{
  "data": [
    {
      "id": "8",
      "attributes": {
        "singular": "Dog",
        "plural": "Dogs"
      }
    },
    {
      "id": "3",
      "attributes": {
        "singular": "Cat",
        "plural": "Cats"
      }
    }
  ]
}
```

### Get All Colors
```bash
GET /rescuegroups/colors
```

**Example:**
```bash
curl "https://onlypets-api-wrapper.onrender.com/rescuegroups/colors"
```

### Get All Patterns
```bash
GET /rescuegroups/patterns
```

**Example:**
```bash
curl "https://onlypets-api-wrapper.onrender.com/rescuegroups/patterns"
```

### Get All Statuses
```bash
GET /rescuegroups/statuses
```

**Example:**
```bash
curl "https://onlypets-api-wrapper.onrender.com/rescuegroups/statuses"
```

---

## Advanced Filtering

### Available Filter Operations
- `equal` - Exact match (or "in" for arrays)
- `notequal` - Not equal
- `lessthan` - Less than
- `greaterthan` - Greater than
- `contains` - Contains string
- `notcontains` - Does not contain
- `blank` - Has no value
- `notblank` - Has a value

### Common Filterable Fields

**Animal Attributes:**
- `animals.name` - Animal name
- `animals.sex` - Male, Female
- `animals.sizeGroup` - Small, Medium, Large, X-Large
- `animals.ageGroup` - Baby, Young, Adult, Senior
- `animals.ageString` - Exact age string
- `animals.breedPrimary` - Primary breed name
- `animals.breedString` - Full breed string
- `animals.coatLength` - Short, Medium, Long
- `animals.isDogsOk` - Boolean
- `animals.isCatsOk` - Boolean
- `animals.isKidsOk` - Boolean
- `animals.isHousetrained` - Boolean
- `animals.isSpecialNeeds` - Boolean
- `animals.pictureCount` - Number of pictures
- `animals.activityLevel` - Activity level
- `animals.energyLevel` - Low, Moderate, High

**Example: Complex Filter**
```bash
curl -X POST "https://onlypets-api-wrapper.onrender.com/rescuegroups/animals/search" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "filters": [
        {
          "fieldName": "animals.ageGroup",
          "operation": "equal",
          "criteria": "Young"
        },
        {
          "fieldName": "animals.energyLevel",
          "operation": "equal",
          "criteria": "Moderate"
        },
        {
          "fieldName": "animals.isHousetrained",
          "operation": "equal",
          "criteria": true
        },
        {
          "fieldName": "animals.pictureCount",
          "operation": "greaterthan",
          "criteria": 2
        }
      ]
    }
  }'
```

---

## Radius Search

Search for animals within a specific distance from a location.

### By Postal Code
```bash
curl -X POST "https://onlypets-api-wrapper.onrender.com/rescuegroups/animals/search" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "filters": [
        {
          "fieldName": "animals.sizeGroup",
          "operation": "equal",
          "criteria": "Medium"
        }
      ],
      "filterRadius": {
        "postalcode": "90210",
        "miles": 50
      }
    }
  }'
```

### By Coordinates
```bash
curl -X POST "https://onlypets-api-wrapper.onrender.com/rescuegroups/animals/search" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "filterRadius": {
        "lat": 34.0522,
        "lon": -118.2437,
        "miles": 25
      }
    }
  }'
```

### Using Kilometers
```bash
curl -X POST "https://onlypets-api-wrapper.onrender.com/rescuegroups/animals/search" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "filterRadius": {
        "postalcode": "M5H 2N2",
        "kilometers": 50
      }
    }
  }'
```

---

## Query Parameters

All GET endpoints support:
- `limit` - Results per page (default: 25, max: 250)
- `page` - Page number (default: 1)

**Example:**
```bash
curl "https://onlypets-api-wrapper.onrender.com/rescuegroups/animals?limit=50&page=2"
```

---

## Complete Example: Find Perfect Pet

```bash
curl -X POST "https://onlypets-api-wrapper.onrender.com/rescuegroups/animals/search?limit=10" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "filters": [
        {
          "fieldName": "animals.sizeGroup",
          "operation": "equal",
          "criteria": "Small"
        },
        {
          "fieldName": "animals.ageGroup",
          "operation": "equal",
          "criteria": "Young"
        },
        {
          "fieldName": "animals.sex",
          "operation": "equal",
          "criteria": "Female"
        },
        {
          "fieldName": "animals.isKidsOk",
          "operation": "equal",
          "criteria": true
        },
        {
          "fieldName": "animals.isDogsOk",
          "operation": "equal",
          "criteria": true
        },
        {
          "fieldName": "animals.isHousetrained",
          "operation": "equal",
          "criteria": true
        },
        {
          "fieldName": "animals.pictureCount",
          "operation": "greaterthan",
          "criteria": 0
        }
      ],
      "filterRadius": {
        "postalcode": "10001",
        "miles": 100
      }
    }
  }'
```

This finds: Small, young, female dogs that are good with kids and other dogs, housetrained, have pictures, within 100 miles of NYC.
