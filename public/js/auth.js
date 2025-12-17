// JWT Authentication Helper for Magic Dawgs
class AuthService {
    static getToken() {
        return localStorage.getItem('token');
    }

    static setToken(token) {
        localStorage.setItem('token', token);
    }

    static removeToken() {
        localStorage.removeItem('token');
    }

    static isLoggedIn() {
        return !!this.getToken();
    }

    // Login user and store JWT token
    static async login(username, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            if (data.success) {
                this.setToken(data.token);
                return { success: true, user: data.user };
            }
            return { success: false, message: data.message };
        } catch (error) {
            return { success: false, message: 'Login failed' };
        }
    }

    // Register new user
    static async register(username, password, email) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email })
            });
            
            return await response.json();
        } catch (error) {
            return { success: false, message: 'Registration failed' };
        }
    }

    // Make authenticated API requests
    static async authenticatedFetch(url, options = {}) {
        const token = this.getToken();
        if (!token) throw new Error('No token available');

        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    // Add pet to favorites
    static async addToFavorites(petId, petData) {
        try {
            const response = await this.authenticatedFetch('/api/pets/favorites', {
                method: 'POST',
                body: JSON.stringify({ petId, petData })
            });
            return await response.json();
        } catch (error) {
            return { success: false, message: 'Failed to add favorite' };
        }
    }

    // Get user favorites
    static async getFavorites() {
        try {
            const response = await this.authenticatedFetch('/api/pets/favorites/list');
            return await response.json();
        } catch (error) {
            return { success: false, message: 'Failed to get favorites' };
        }
    }

    // Remove from favorites
    static async removeFromFavorites(petId) {
        try {
            const response = await this.authenticatedFetch(`/api/pets/favorites/${petId}`, {
                method: 'DELETE'
            });
            return await response.json();
        } catch (error) {
            return { success: false, message: 'Failed to remove favorite' };
        }
    }

    static logout() {
        this.removeToken();
        window.location.href = '/';
    }
}
