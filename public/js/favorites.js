// Favorites functionality
class FavoritesManager {
    constructor() {
        this.userFavorites = new Set();
        this.loadUserFavorites();
    }

    // Load user's favorites from backend
    async loadUserFavorites() {
        if (!AuthService.isLoggedIn()) return;

        try {
            const response = await AuthService.authenticatedFetch('/api/pets/favorites');
            const data = await response.json();

            if (data.success) {
                this.userFavorites = new Set(data.favorites.map(fav => fav.pet_api_id));
                this.updateHeartIcons();
            }
        } catch (error) {
            console.error('Failed to load favorites:', error);
        }
    }

    // Toggle favorite status
    async toggleFavorite(petId, petData) {
        if (!AuthService.isLoggedIn()) {
            alert('Please login to save favorites');
            return;
        }

        const isFavorited = this.userFavorites.has(petId);

        try {
            let response;
            if (isFavorited) {
                response = await AuthService.authenticatedFetch(`/api/pets/${petId}/favorite`, {
                    method: 'DELETE'
                });
                this.userFavorites.delete(petId);
            } else {
                response = await AuthService.authenticatedFetch('/api/pets/favorites', {
                    method: 'POST',
                    body: JSON.stringify({
                        pet_api_id: petId,
                        pet_name: petData.name,
                        pet_type: petData.type,
                        pet_breed: petData.breed
                    })
                });
                this.userFavorites.add(petId);
            }

            const result = await response.json();
            if (result.success) {
                this.updateHeartIcon(petId);
            } else {
                // Revert on failure
                if (isFavorited) {
                    this.userFavorites.add(petId);
                } else {
                    this.userFavorites.delete(petId);
                }
                alert('Failed to update favorite');
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            alert('Failed to update favorite');
        }
    }

    // Update all heart icons
    updateHeartIcons() {
        document.querySelectorAll('.heart-icon').forEach(heart => {
            const petId = heart.dataset.petId;
            this.updateHeartIcon(petId);
        });
    }

    // Update specific heart icon
    updateHeartIcon(petId) {
        const heart = document.querySelector(`[data-pet-id="${petId}"]`);
        if (!heart) return;

        const isFavorited = this.userFavorites.has(petId);
        heart.classList.toggle('favorited', isFavorited);
        heart.classList.toggle('not-favorited', !isFavorited);

        // Update SVG path for filled/hollow heart
        const path = heart.querySelector('path');
        if (isFavorited) {
            path.setAttribute('d', 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z');
            path.setAttribute('fill', '#ef4444');
            path.setAttribute('stroke', 'none');
        } else {
            path.setAttribute('d', 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', '#6b7280');
        }
    }

    // Check if pet is favorited
    isFavorited(petId) {
        return this.userFavorites.has(petId);
    }
}

// Create heart icon HTML
function createHeartIcon(petId, petData) {
    return `
        <svg class="heart-icon not-favorited" data-pet-id="${petId}" viewBox="0 0 24 24" onclick="favoritesManager.toggleFavorite('${petId}', ${JSON.stringify(petData).replace(/"/g, '&quot;')})">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
    `;
}

// User display functionality
function displayCurrentUser() {
    if (!AuthService.isLoggedIn()) return;

    // Get user info from token (basic decode)
    const token = AuthService.getToken();
    if (!token) return;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const username = payload.username;

        const userDisplay = document.createElement('div');
        userDisplay.className = 'user-display';
        userDisplay.innerHTML = `
            <span class="username">${username}</span>
            <a href="#" class="logout-btn" onclick="AuthService.logout()">Logout</a>
        `;

        document.body.appendChild(userDisplay);
    } catch (error) {
        console.error('Error displaying user:', error);
    }
}

// Initialize favorites manager
const favoritesManager = new FavoritesManager();

// Display user on page load
document.addEventListener('DOMContentLoaded', displayCurrentUser);
