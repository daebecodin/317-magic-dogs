let currentUser = null;

document.addEventListener('DOMContentLoaded', async function() {
    await checkAuthStatus();
    
    if (currentUser) {
        await loadPets();
    } else {
        showLoginRequired();
    }
});

async function checkAuthStatus() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            currentUser = null;
            updateAuthUI();
            return;
        }
        
        const response = await fetch('/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const data = await response.json();
            currentUser = data.user;
            console.log('User logged in:', currentUser);
            updateAuthUI();
        } else {
            console.log('Auth failed');
            currentUser = null;
            localStorage.removeItem('token');
            updateAuthUI();
        }
    } catch (error) {
        console.log('Auth error:', error);
        currentUser = null;
        updateAuthUI();
    }
}

async function loadPets() {
    console.log('loadPets called');
    const container = document.getElementById('pets-container');
    console.log('Container:', container);
    
    if (!container) {
        console.error('pets-container not found!');
        return;
    }
    
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Loading...</div>';
    
    try {
        console.log('Fetching pets...');
        const response = await fetch('https://onlypets-api-wrapper.onrender.com/rescuegroups/animals?limit=50');
        console.log('Response:', response);
        const data = await response.json();
        console.log('Data:', data);
        const animals = data.data || [];
        console.log('Animals:', animals.length);
        
        if (animals.length > 0) {
            displayAnimals(animals);
        } else {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">No pets found</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Error loading pets</div>';
    }
}

function displayAnimals(animals) {
    const container = document.getElementById('pets-container');
    container.innerHTML = animals.map(animal => {
        const attrs = animal.attributes || {};
        const name = attrs.name || 'Unknown';
        const breed = attrs.breedString || 'Mixed';
        const photo = attrs.pictureThumbnailUrl?.replace('?width=100', '?width=500') || '/placeholder.jpg';
        
        return `
            <div class="pet-card">
                <div class="pet-card-image">
                    <img src="${photo}" alt="${name}" onerror="this.src='/placeholder.jpg'">
                </div>
                <div class="pet-info">
                    <h3 class="pet-name">${name}</h3>
                    <p class="pet-details">${breed}</p>
                    <div class="pet-actions">
                        <button onclick="viewPet('${animal.id}')" class="btn-primary">View Details</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function viewPet(id) {
    alert('Pet details for ID: ' + id);
}

function updateAuthUI() {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) return;
    
    if (currentUser) {
        authContainer.innerHTML = `
            <span style="margin-right: 1rem;">Welcome, ${currentUser.username}!</span>
            <button onclick="logout()" class="btn-secondary">Logout</button>
        `;
    } else {
        authContainer.innerHTML = `
            <a href="/html/login.html" class="btn-primary">Login</a>
        `;
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/html/login.html';
}

function showLoginRequired() {
    const container = document.getElementById('pets-container');
    container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <h2 style="margin-bottom: 1rem;">Login Required</h2>
            <p style="color: #6b7280; margin-bottom: 2rem;">Please log in to search for adoptable pets.</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <a href="/html/login.html" class="btn-primary">Login</a>
                <a href="/html/signup.html" class="btn-secondary">Sign Up</a>
            </div>
        </div>
    `;
}

function applyFilters() {
    const typeFilter = document.getElementById('type-filter').value;
    const ageFilter = document.getElementById('age-filter').value;
    const genderFilter = document.getElementById('gender-filter').value;
    const sizeFilter = document.getElementById('size-filter').value;
    
    loadPetsWithFilters(typeFilter, ageFilter, genderFilter, sizeFilter);
}

function searchByLocation() {
    const location = document.getElementById('location-input').value;
    loadPetsWithLocation(location);
}

async function loadPetsWithFilters(type, age, gender, size) {
    const container = document.getElementById('pets-container');
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Loading...</div>';
    
    try {
        let url = 'https://onlypets-api-wrapper.onrender.com/rescuegroups/animals?limit=50';
        
        const response = await fetch(url);
        const data = await response.json();
        let animals = data.data || [];
        
        // Client-side filtering
        if (type && type !== 'all') {
            animals = animals.filter(animal => {
                if (type === 'dog') return animal.relationships?.species?.data?.[0]?.id === '8';
                if (type === 'cat') return animal.relationships?.species?.data?.[0]?.id === '3';
                return true;
            });
        }
        
        if (age && age !== 'all') {
            animals = animals.filter(animal => 
                animal.attributes?.ageString?.toLowerCase().includes(age.toLowerCase())
            );
        }
        
        if (gender && gender !== 'all') {
            animals = animals.filter(animal => 
                animal.attributes?.sex === gender
            );
        }
        
        if (size && size !== 'all') {
            animals = animals.filter(animal => 
                animal.attributes?.sizeGroup === size
            );
        }
        
        if (animals.length > 0) {
            displayAnimals(animals);
        } else {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">No pets found matching your filters</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Error loading pets</div>';
    }
}

async function loadPetsWithLocation(location) {
    const container = document.getElementById('pets-container');
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Loading...</div>';
    
    try {
        let url = 'https://onlypets-api-wrapper.onrender.com/petfinder/animals?limit=50';
        if (location) {
            url += `&location=${encodeURIComponent(location)}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        const animals = data.data || [];
        
        if (animals.length > 0) {
            displayAnimals(animals);
            document.getElementById('location-subtitle').textContent = `Showing pets near ${location}`;
        } else {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">No pets found in this location</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Error loading pets</div>';
    }
}

function loadPetsFromAPI() {
    // Reset all filters
    document.getElementById('type-filter').value = 'all';
    document.getElementById('age-filter').value = 'all';
    document.getElementById('gender-filter').value = 'all';
    document.getElementById('size-filter').value = 'all';
    
    // Load fresh pets
    loadPets();
}

function showLoading() {}
function updateLocationSubtitle() {}
function showMessage() {}
