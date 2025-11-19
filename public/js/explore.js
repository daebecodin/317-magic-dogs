let currentUser = null;

// Initialize app
document.addEventListener('DOMContentLoaded', async function() {
    await checkAuthStatus();
    await loadPetsFromAPI(); // Load from API instead of cache
    setupEventListeners();
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

// Load pets from API based on current filters
async function loadPetsFromAPI() {
    console.log('Loading pets from API...');
    showLoading(true);
    try {
        const filters = getCurrentFilters();
        console.log('Filters:', filters.toString());
        const response = await fetch(`/api/pets/search?${filters.toString()}`);
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.animals && data.animals.length > 0) {
            displayAnimals(data.animals);
            updateLocationSubtitle(`Found ${data.animals.length} pets`);
            showMessage(`Loaded ${data.animals.length} pets`, 'success');
        } else {
            displayNoResults('No pets found. Try different filters.');
        }
    } catch (error) {
        console.error('Failed to load pets:', error);
        showMessage('Failed to load pets from API', 'error');
        displayNoResults('Failed to load pets. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Get current filter values as URLSearchParams
function getCurrentFilters() {
    const params = new URLSearchParams();
    
    const location = document.getElementById('location-input')?.value?.trim() || '';
    const type = document.getElementById('type-filter')?.value || 'all';
    const age = document.getElementById('age-filter')?.value || 'all';
    const gender = document.getElementById('gender-filter')?.value || 'all';
    const size = document.getElementById('size-filter')?.value || 'all';
    
    if (location) params.append('location', location);
    if (type !== 'all') params.append('type', type.toLowerCase());
    if (age !== 'all') params.append('age', age.toLowerCase());
    if (gender !== 'all') params.append('gender', gender.toLowerCase());
    if (size !== 'all') params.append('size', size.toLowerCase());
    
    params.append('limit', '12');
    
    return params;
}

// Apply filters - reload from API
function applyFilters() {
    loadPetsFromAPI();
}

// Search by location - same as apply filters now
function searchByLocation() {
    loadPetsFromAPI();
}

// Display animals from API response
function displayAnimals(animals) {
    const container = document.getElementById('pets-container');
    
    if (animals.length === 0) {
        displayNoResults('No pets match your current filters.');
        return;
    }

    container.innerHTML = animals.map(animal => `
        <div class="pet-card">
            <img src="${animal.photos?.[0]?.medium || '/placeholder.jpg'}" alt="${animal.name}" class="pet-image" onerror="this.src='/placeholder.jpg'">
            <div class="pet-info">
                <h3 class="pet-name">${animal.name}</h3>
                <p class="pet-details">${animal.breeds?.primary || 'Mixed'} • ${animal.age} • ${animal.gender}</p>
                <p class="pet-location">📍 ${animal.contact?.address?.city || 'Unknown'}</p>
                <div class="pet-actions">
                    <button onclick="viewAnimalDetails('${animal.id}')" class="btn-primary">View Details</button>
                    ${currentUser ? `<button onclick="toggleFavorite('${animal.id}', '${animal.name}')" class="btn-secondary">♥</button>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Display no results message
function displayNoResults(message) {
    const container = document.getElementById('pets-container');
    container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
            <h3 style="color: #6b7280; margin-bottom: 1rem;">No Pets Found</h3>
            <p style="color: #9ca3af;">${message}</p>
        </div>
    `;
}

// View animal details
async function viewAnimalDetails(animalId) {
    try {
        const response = await fetch(`/api/pets/${animalId}`);
        const data = await response.json();
        
        if (data.animal) {
            showAnimalModal(data.animal);
        } else {
            showMessage('Failed to load pet details', 'error');
        }
    } catch (error) {
        console.error('Failed to load pet details:', error);
        showMessage('Failed to load pet details', 'error');
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
            ${currentUser ? `
                <div style="display: flex; gap: 1rem;">
                    <button onclick="submitApplication('${animal.id}', '${animal.name}')" class="btn-primary">Apply for Adoption</button>
                    <button onclick="toggleFavorite('${animal.id}', '${animal.name}')" class="btn-secondary">Add to Favorites</button>
                </div>
            ` : '<p style="color: #6b7280;"><a href="/signup.html">Sign up</a> to apply for adoption!</p>'}
        </div>
    `;
    document.body.appendChild(modal);
}

// Toggle favorite
async function toggleFavorite(animalId, animalName) {
    if (!currentUser) {
        showMessage('Please log in to save favorites', 'error');
        return;
    }

    try {
        const response = await fetch(`/api/pets/${animalId}/favorite`, {
            method: 'POST'
        });

        const result = await response.json();
        
        if (result.success) {
            showMessage(`${animalName} added to favorites!`, 'success');
        } else {
            showMessage(result.error || 'Failed to add to favorites', 'error');
        }
    } catch (error) {
        console.error('Failed to add to favorites:', error);
        showMessage('Failed to add to favorites', 'error');
    }
}

// Submit adoption application
async function submitApplication(animalId, animalName) {
    if (!currentUser) {
        showMessage('Please log in to apply', 'error');
        return;
    }

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
    const container = document.getElementById('pets-container');
    
    if (show) {
        loading.style.display = 'block';
        container.style.display = 'none';
    } else {
        loading.style.display = 'none';
        container.style.display = 'grid';
    }
}

function updateLocationSubtitle(text) {
    document.getElementById('location-subtitle').textContent = text;
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

function setupEventListeners() {
    // Enter key for location search
    document.getElementById('location-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loadPetsFromAPI();
        }
    });
}

// Add to favorites with full pet details
async function addToFavorites(animalId, animalName, breed, age, gender, type) {
    if (!currentUser) {
        showMessage('Please log in to save favorites', 'error');
        return;
    }

    try {
        const response = await fetch(`/api/pets/${animalId}/favorite`, {
            method: 'POST'
        });

        const result = await response.json();
        
        if (result.success) {
            showMessage(`${animalName} added to favorites!`, 'success');
            // Close modal after adding to favorites
            document.querySelector('.modal')?.remove();
        } else {
            showMessage(result.error || 'Failed to add to favorites', 'error');
        }
    } catch (error) {
        console.error('Failed to add to favorites:', error);
        showMessage('Failed to add to favorites', 'error');
    }
}

// Display no results message
function displayNoResults(message) {
    const container = document.getElementById('pets-container');
    container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
            <h3 style="color: #6b7280; margin-bottom: 1rem;">No Pets Found</h3>
            <p style="color: #9ca3af;">${message}</p>
        </div>
    `;
}

// View animal details
async function viewAnimalDetails(animalId) {
    try {
        const response = await fetch(`/api/pets/${animalId}`);
        const data = await response.json();
        
        if (data.animal) {
            showAnimalModal(data.animal);
        } else {
            showMessage('Failed to load pet details', 'error');
        }
    } catch (error) {
        console.error('Failed to load pet details:', error);
        showMessage('Failed to load pet details', 'error');
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
            ${currentUser ? `
                <div style="display: flex; gap: 1rem;">
                    <button onclick="submitApplication('${animal.id}', '${animal.name}')" class="btn-primary">Apply for Adoption</button>
                    <button onclick="toggleFavorite('${animal.id}', '${animal.name}')" class="btn-secondary">Add to Favorites</button>
                </div>
            ` : '<p style="color: #6b7280;"><a href="/signup.html">Sign up</a> to apply for adoption!</p>'}
        </div>
    `;
    document.body.appendChild(modal);
}

// Toggle favorite
async function toggleFavorite(animalId, animalName) {
    if (!currentUser) {
        showMessage('Please log in to save favorites', 'error');
        return;
    }

    try {
        const response = await fetch(`/api/pets/${animalId}/favorite`, {
            method: 'POST'
        });

        const result = await response.json();
        
        if (result.success) {
            showMessage(`${animalName} added to favorites!`, 'success');
        } else {
            showMessage(result.error || 'Failed to add to favorites', 'error');
        }
    } catch (error) {
        console.error('Failed to add to favorites:', error);
        showMessage('Failed to add to favorites', 'error');
    }
}

// Submit adoption application
async function submitApplication(animalId, animalName) {
    if (!currentUser) {
        showMessage('Please log in to apply', 'error');
        return;
    }

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
    const container = document.getElementById('pets-container');
    
    if (show) {
        loading.style.display = 'block';
        container.style.display = 'none';
    } else {
        loading.style.display = 'none';
        container.style.display = 'grid';
    }
}

function updateLocationSubtitle(text) {
    document.getElementById('location-subtitle').textContent = text;
}

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

function setupEventListeners() {
    // Enter key for location search
    document.getElementById('location-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchByLocation();
        }
    });
}

// Test database connection
function testDatabaseConnection() {
    fetch('/api/test-db')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('✅ Full-stack connection working!', data);
            }
        })
        .catch(error => console.error('Database connection failed:', error));
}
