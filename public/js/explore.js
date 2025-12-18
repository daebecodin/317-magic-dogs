// currentUser is now available from shared-auth.js

document.addEventListener('DOMContentLoaded', async function() {
    // Wait for shared auth to initialize
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (currentUser) {
        await loadPets();
    } else {
        showLoginRequired();
    }
});

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
    showPetModal(id);
}

async function showPetModal(petId) {
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
        
        // Add to favorites button
        const favoriteBtn = document.getElementById('modal-favorite-btn');
        favoriteBtn.onclick = () => {
            const speciesId = animal.relationships?.species?.data?.[0]?.id;
            const petType = speciesId === '8' ? 'Dog' : speciesId === '3' ? 'Cat' : 'Other';
            
            addToFavorites(petId, {
                name: attrs.name,
                type: petType,
                breed: attrs.breedString
            });
        };
        
        // Show modal
        document.getElementById('pet-modal').style.display = 'block';
        
    } catch (error) {
        console.error('Error loading pet details:', error);
        alert('Error loading pet details. Please try again.');
    }
}

// Modal close functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('pet-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    closeBtn.onclick = () => modal.style.display = 'none';
    
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    // Existing code...
    checkAuthStatus();
    
    if (currentUser) {
        loadPets();
    } else {
        showLoginRequired();
    }
});

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
