let currentUser = null;

// Initialize favorites page
document.addEventListener('DOMContentLoaded', async function() {
    await checkAuthStatus();
    if (currentUser) {
        await loadFavorites();
    } else {
        showLoginRequired();
    }
});

// Check authentication status
async function checkAuthStatus() {
    try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
            const data = await response.json();
            currentUser = data.user;
            updateAuthUI();
        }
    } catch (error) {
        console.log('User not logged in');
        updateAuthUI();
    }
}

// Load user's favorite pets
async function loadFavorites() {
    showLoading(true);
    try {
        const response = await fetch('/api/pets/favorites');
        const data = await response.json();
        
        if (data.favorites && data.favorites.length > 0) {
            displayFavorites(data.favorites);
            updateSubtitle(`You have ${data.favorites.length} favorite pets`);
        } else {
            showNoFavorites();
        }
    } catch (error) {
        console.error('Failed to load favorites:', error);
        showMessage('Failed to load favorites', 'error');
        showNoFavorites();
    } finally {
        showLoading(false);
    }
}

// Display favorite pets
function displayFavorites(favorites) {
    const container = document.getElementById('favorites-container');
    
    container.innerHTML = favorites.map(favorite => `
        <div class="pet-card">
            <img src="/placeholder.jpg" alt="${favorite.pet_name}" class="pet-image">
            <div class="pet-info">
                <h3 class="pet-name">${favorite.pet_name}</h3>
                <p class="pet-details">${favorite.pet_breed || 'Mixed'} • ${favorite.pet_type || 'Pet'}</p>
                <p class="pet-location">Added: ${new Date(favorite.added_at).toLocaleDateString()}</p>
                <div class="pet-actions">
                    <button onclick="viewPetDetails('${favorite.pet_api_id}')" class="btn-primary">View Details</button>
                    <button onclick="removeFromFavorites('${favorite.pet_api_id}', '${favorite.pet_name}')" class="btn-secondary">Remove ♥</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Show no favorites message
function showNoFavorites() {
    const container = document.getElementById('favorites-container');
    container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <h3 style="color: #6b7280; margin-bottom: 1rem;">No Favorite Pets Yet</h3>
            <p style="color: #9ca3af; margin-bottom: 2rem;">Start exploring pets and save your favorites!</p>
            <a href="/explore.html" class="btn-primary">Explore Pets</a>
        </div>
    `;
    updateSubtitle('No favorites saved yet');
}

// Show login required message
function showLoginRequired() {
    const container = document.getElementById('favorites-container');
    container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
            <h3 style="color: #6b7280; margin-bottom: 1rem;">Login Required</h3>
            <p style="color: #9ca3af; margin-bottom: 2rem;">Please log in to view your favorite pets.</p>
            <button onclick="showLoginForm()" class="btn-primary">Login</button>
        </div>
    `;
    updateSubtitle('Login required to view favorites');
}

// View pet details
async function viewPetDetails(petId) {
    try {
        const response = await fetch(`/api/pets/${petId}`);
        const data = await response.json();
        
        if (data.animal) {
            showAnimalModal(data.animal);
        } else {
            showMessage('Pet details not available', 'error');
        }
    } catch (error) {
        console.error('Failed to load pet details:', error);
        showMessage('Failed to load pet details', 'error');
    }
}

// Remove from favorites
async function removeFromFavorites(petId, petName) {
    if (!confirm(`Remove ${petName} from favorites?`)) return;

    try {
        const response = await fetch(`/api/pets/${petId}/favorite`, {
            method: 'DELETE'
        });

        const result = await response.json();
        
        if (result.success) {
            showMessage(`${petName} removed from favorites`, 'success');
            await loadFavorites(); // Reload favorites
        } else {
            showMessage(result.error || 'Failed to remove from favorites', 'error');
        }
    } catch (error) {
        console.error('Failed to remove from favorites:', error);
        showMessage('Failed to remove from favorites', 'error');
    }
}

// Show animal details modal
function showAnimalModal(animal) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2>${animal.name}</h2>
                <button onclick="this.closest('.modal').remove()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            <img src="${animal.photos?.[0]?.large || '/placeholder.jpg'}" alt="${animal.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <p><strong>Breed:</strong> ${animal.breeds?.primary || 'Mixed'}</p>
                <p><strong>Age:</strong> ${animal.age}</p>
                <p><strong>Size:</strong> ${animal.size}</p>
                <p><strong>Gender:</strong> ${animal.gender}</p>
            </div>
            <p style="margin-bottom: 1rem;">${animal.description || 'No description available.'}</p>
            <div style="display: flex; gap: 1rem;">
                <button onclick="submitApplication('${animal.id}', '${animal.name}')" class="btn-primary">Apply for Adoption</button>
                <button onclick="removeFromFavorites('${animal.id}', '${animal.name}')" class="btn-secondary">Remove from Favorites</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Submit adoption application
async function submitApplication(animalId, animalName) {
    const message = prompt(`Tell us why you'd like to adopt ${animalName}:`);
    if (!message) return;

    try {
        const response = await fetch('/api/applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                petApiId: animalId,
                petName: animalName,
                message: message
            })
        });

        const result = await response.json();
        
        if (result.success) {
            showMessage('Application submitted successfully!', 'success');
            document.querySelector('.modal')?.remove();
        } else {
            showMessage(result.error || 'Failed to submit application', 'error');
        }
    } catch (error) {
        console.error('Failed to submit application:', error);
        showMessage('Failed to submit application', 'error');
    }
}

// Authentication functions
async function login(username, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        
        if (result.success) {
            currentUser = result.user;
            updateAuthUI();
            showMessage('Login successful!', 'success');
            await loadFavorites();
        } else {
            showMessage(result.error, 'error');
        }
    } catch (error) {
        showMessage('Login failed', 'error');
    }
}

async function logout() {
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
        currentUser = null;
        updateAuthUI();
        showMessage('Logged out successfully', 'success');
        showLoginRequired();
    } catch (error) {
        showMessage('Logout failed', 'error');
    }
}

// UI helper functions
function updateAuthUI() {
    const authContainer = document.getElementById('auth-container');
    
    if (currentUser) {
        authContainer.innerHTML = `
            <span>Welcome, ${currentUser.username}!</span>
            <button onclick="logout()" class="btn-secondary" style="margin-left: 0.5rem;">Logout</button>
        `;
    } else {
        authContainer.innerHTML = `
            <button onclick="showLoginForm()" class="btn-primary">Login</button>
        `;
    }
}

function showLoginForm() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Login</h2>
            <input type="text" id="login-username" placeholder="Username" required>
            <input type="password" id="login-password" placeholder="Password" required>
            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <button onclick="handleLogin()" class="btn-primary">Login</button>
                <button onclick="this.closest('.modal').remove()" class="btn-secondary">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

async function handleLogin() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    await login(username, password);
    document.querySelector('.modal').remove();
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    const container = document.getElementById('favorites-container');
    
    if (show) {
        loading.style.display = 'block';
        container.style.display = 'none';
    } else {
        loading.style.display = 'none';
        container.style.display = 'grid';
    }
}

function updateSubtitle(text) {
    document.getElementById('favorites-subtitle').textContent = text;
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}
