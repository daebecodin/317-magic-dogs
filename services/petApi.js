const API_BASE_URL = 'https://onlypets-api-wrapper.onrender.com/petfinder';

class PetApiService {
    // Get a single pet by ID
    static async getPetById(petId) {
        try {
            const response = await fetch(`${API_BASE_URL}/animals/${petId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching pet:', error);
            throw error;
        }
    }

    // Search for pets with filters
    static async searchPets(params = {}) {
        try {
            const queryParams = new URLSearchParams();
            
            // Add common search parameters
            if (params.type) queryParams.append('type', params.type);
            if (params.breed) queryParams.append('breed', params.breed);
            if (params.size) queryParams.append('size', params.size);
            if (params.gender) queryParams.append('gender', params.gender);
            if (params.age) queryParams.append('age', params.age);
            if (params.location) queryParams.append('location', params.location);
            if (params.distance) queryParams.append('distance', params.distance);
            if (params.limit) queryParams.append('limit', params.limit);
            if (params.page) queryParams.append('page', params.page);

            const url = `${API_BASE_URL}/animals${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
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

    // Get pet types
    static async getPetTypes() {
        try {
            const response = await fetch(`${API_BASE_URL}/types`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching pet types:', error);
            throw error;
        }
    }

    // Get breeds for a specific type
    static async getBreeds(type) {
        try {
            const response = await fetch(`${API_BASE_URL}/types/${type}/breeds`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching breeds:', error);
            throw error;
        }
    }
}

module.exports = PetApiService;
