let currentUser = null;

document.addEventListener('DOMContentLoaded', async function() {
    await checkAuthStatus();
    
    if (currentUser) {
        await loadFavorites();
    } else {
        showLoginRequired();
    }
    
    // Modal close functionality
    const modal = document.getElementById('pet-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = 'none';
    }
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});

async function checkAuthStatus() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
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
            updateAuthUI();
        } else {
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

async function loadFavorites() {
    const container = document.getElementById('favorites-container');
    const noFavorites = document.getElementById('no-favorites');
    
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Loading favorites...</div>';
    
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/favorites', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.favorites && data.favorites.length > 0) {
            displayFavorites(data.favorites);
            noFavorites.style.display = 'none';
        } else {
            container.innerHTML = '';
            noFavorites.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading favorites:', error);
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Error loading favorites</div>';
    }
}

async function displayFavorites(favorites) {
    const container = document.getElementById('favorites-container');
    
    // Show loading state
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Loading pet photos...</div>';
    
    try {
        // Fetch current data for each favorite pet
        const petPromises = favorites.map(async (favorite) => {
            try {
                const response = await fetch(`https://onlypets-api-wrapper.onrender.com/rescuegroups/animals/${favorite.pet_api_id}`);
                const data = await response.json();
                const animal = data.data[0];
                
                if (animal) {
                    const attrs = animal.attributes;
                    const included = data.included || [];
                    
                    // Get better quality image
                    const pictureId = animal.relationships?.pictures?.data?.[0]?.id;
                    const picture = included.find(item => item.type === 'pictures' && item.id === pictureId);
                    const imageUrl = picture?.attributes?.large?.url || attrs.pictureThumbnailUrl || '/placeholder.jpg';
                    
                    return {
                        ...favorite,
                        imageUrl,
                        currentName: attrs.name || favorite.pet_name,
                        currentBreed: attrs.breedString || favorite.pet_breed
                    };
                }
                return {
                    ...favorite,
                    imageUrl: '/placeholder.jpg',
                    currentName: favorite.pet_name,
                    currentBreed: favorite.pet_breed
                };
            } catch (error) {
                console.error(`Error fetching pet ${favorite.pet_api_id}:`, error);
                return {
                    ...favorite,
                    imageUrl: '/placeholder.jpg',
                    currentName: favorite.pet_name,
                    currentBreed: favorite.pet_breed
                };
            }
        });
        
        const petsWithPhotos = await Promise.all(petPromises);
        
        container.innerHTML = petsWithPhotos.map(pet => {
            return `
                <div class="pet-card">
                    <div class="pet-card-image">
                        <img src="${pet.imageUrl}" alt="${pet.currentName}" onerror="this.src='/placeholder.jpg'">
                    </div>
                    <div class="pet-info">
                        <h3 class="pet-name">${pet.currentName}</h3>
                        <p class="pet-details">${pet.currentBreed || 'Mixed'}</p>
                        <div class="pet-actions">
                            <button onclick="viewPet('${pet.pet_api_id}')" class="btn-primary">View Details</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error displaying favorites:', error);
        container.innerHTML = favorites.map(favorite => {
            return `
                <div class="pet-card">
                    <div class="pet-card-image">
                        <img src="/placeholder.jpg" alt="${favorite.pet_name}" onerror="this.src='/placeholder.jpg'">
                    </div>
                    <div class="pet-info">
                        <h3 class="pet-name">${favorite.pet_name}</h3>
                        <p class="pet-details">${favorite.pet_breed || 'Mixed'}</p>
                        <div class="pet-actions">
                            <button onclick="viewPet('${favorite.pet_api_id}')" class="btn-primary">View Details</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

async function addToFavorites(petId, petData) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                pet_api_id: petId,
                pet_name: petData.name,
                pet_type: petData.type,
                pet_breed: petData.breed
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Added to favorites!');
        } else {
            alert('Already in favorites!');
        }
    } catch (error) {
        console.error('Error adding to favorites:', error);
        alert('Error adding to favorites');
    }
}

async function removeFromFavorites(petId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/favorites/${petId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Removed from favorites!');
            loadFavorites(); // Reload the favorites list
            document.getElementById('pet-modal').style.display = 'none';
        } else {
            alert('Error removing from favorites');
        }
    } catch (error) {
        console.error('Error removing from favorites:', error);
        alert('Error removing from favorites');
    }
}

// Modal functionality (same as explore.js)
async function viewPet(petId) {
    try {
        const response = await fetch(`https://onlypets-api-wrapper.onrender.com/rescuegroups/animals/${petId}`);
        const data = await response.json();
        const animal = data.data[0];
        const included = data.included || [];
        
        if (!animal) return;
        
        const attrs = animal.attributes;
        
        // Get organization info
        const orgId = animal.relationships?.orgs?.data?.[0]?.id;
        const org = included.find(item => item.type === 'orgs' && item.id === orgId);
        
        // Get location info
        const locationId = animal.relationships?.locations?.data?.[0]?.id;
        const location = included.find(item => item.type === 'locations' && item.id === locationId);
        
        // Get better quality image
        const pictureId = animal.relationships?.pictures?.data?.[0]?.id;
        const picture = included.find(item => item.type === 'pictures' && item.id === pictureId);
        const imageUrl = picture?.attributes?.large?.url || attrs.pictureThumbnailUrl || '/placeholder.jpg';
        
        // Populate modal
        document.getElementById('modal-pet-image').src = imageUrl;
        document.getElementById('modal-pet-name').textContent = attrs.name || 'Unknown';
        document.getElementById('modal-pet-fee').textContent = attrs.adoptionFeeString || 'Contact for fee';
        document.getElementById('modal-pet-age').textContent = attrs.ageString || 'Unknown';
        document.getElementById('modal-pet-gender').textContent = attrs.sex || 'Unknown';
        document.getElementById('modal-pet-size').textContent = attrs.sizeGroup || 'Unknown';
        document.getElementById('modal-pet-breed').textContent = attrs.breedString || 'Mixed';
        document.getElementById('modal-pet-description').textContent = attrs.descriptionText || 'No description available.';
        
        // Compatibility tags
        const dogsTag = document.getElementById('modal-dogs-ok');
        const catsTag = document.getElementById('modal-cats-ok');
        const kidsTag = document.getElementById('modal-kids-ok');
        
        dogsTag.className = `tag ${attrs.isDogsOk ? 'active' : 'inactive'}`;
        catsTag.className = `tag ${attrs.isCatsOk ? 'active' : 'inactive'}`;
        kidsTag.className = `tag ${attrs.isKidsOk ? 'active' : 'inactive'}`;
        
        // Location and organization
        const locationText = location ? `${location.attributes.city}, ${location.attributes.state}` : 'Location not available';
        const orgText = org ? org.attributes.name : 'Organization not available';
        
        document.getElementById('modal-pet-location').textContent = locationText;
        document.getElementById('modal-pet-org').textContent = orgText;
        
        // Contact button
        const contactBtn = document.getElementById('modal-contact-btn');
        contactBtn.onclick = () => {
            if (attrs.url) {
                window.open(attrs.url, '_blank');
            }
        };
        
        // Remove from favorites button
        const removeBtn = document.getElementById('modal-remove-favorite-btn');
        removeBtn.onclick = () => removeFromFavorites(petId);
        
        // Show modal
        document.getElementById('pet-modal').style.display = 'block';
        
    } catch (error) {
        console.error('Error loading pet details:', error);
        alert('Error loading pet details. Please try again.');
    }
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
    const container = document.getElementById('favorites-container');
    container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
            <h2 style="margin-bottom: 1rem;">Login Required</h2>
            <p style="color: #6b7280; margin-bottom: 2rem;">Please log in to view your favorites.</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <a href="/html/login.html" class="btn-primary">Login</a>
                <a href="/html/signup.html" class="btn-secondary">Sign Up</a>
            </div>
        </div>
    `;
}
