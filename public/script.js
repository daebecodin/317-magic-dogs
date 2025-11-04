// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.remove('active');
    }
});

// Pet Cards functionality
class PetCards {
    constructor() {
        this.pets = [];
        this.isLoading = true;
        this.init();
    }

    init() {
        this.showLoading();
        this.fetchPets();
    }

    showLoading() {
        const container = document.getElementById('pets-grid');
        if (!container) return;

        container.innerHTML = '';
        container.className = 'pets-loading';
        
        // Show 6 skeleton cards
        for (let i = 0; i < 6; i++) {
            const skeleton = this.createSkeletonCard();
            container.appendChild(skeleton);
        }
    }

    createSkeletonCard() {
        const card = document.createElement('div');
        card.className = 'pet-card-skeleton';
        card.innerHTML = `
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
                <div class="skeleton-line medium"></div>
                <div class="skeleton-line short"></div>
            </div>
        `;
        return card;
    }

    async fetchPets() {
        try {
            // Simulate API call with sample data
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.pets = this.getSamplePets();
            this.renderPets();
        } catch (error) {
            console.error('Error fetching pets:', error);
            this.showError();
        }
    }

    getSamplePets() {
        return [
            {
                id: '1',
                name: 'Buddy',
                type: 'Dog',
                breed: 'Golden Retriever',
                age: '3 years',
                gender: 'Male',
                description: 'Friendly and energetic dog who loves playing fetch and going on walks.',
                photos: [{ medium: '/placeholder.svg' }],
                shelter: 'Happy Paws Rescue',
                distance: '2.5 miles',
                urgent: false
            },
            {
                id: '2',
                name: 'Luna',
                type: 'Cat',
                breed: 'Siamese',
                age: '2 years',
                gender: 'Female',
                description: 'Sweet and gentle cat who enjoys cuddling and playing with toys.',
                photos: [{ medium: '/placeholder.svg' }],
                shelter: 'Feline Friends',
                distance: '1.8 miles',
                urgent: true
            },
            {
                id: '3',
                name: 'Max',
                type: 'Dog',
                breed: 'German Shepherd',
                age: '5 years',
                gender: 'Male',
                description: 'Loyal and intelligent dog, great with families and children.',
                photos: [{ medium: '/placeholder.svg' }],
                shelter: 'Rescue Haven',
                distance: '3.2 miles',
                urgent: false
            }
        ];
    }

    renderPets() {
        const container = document.getElementById('pets-grid');
        if (!container) return;

        container.className = 'pets-grid';
        container.innerHTML = '';

        this.pets.forEach(pet => {
            const petCard = this.createPetCard(pet);
            container.appendChild(petCard);
        });
    }

    createPetCard(pet) {
        const card = document.createElement('div');
        card.className = 'pet-card';
        
        const imageUrl = pet.photos[0]?.medium || '/placeholder.svg';
        const urgentBadge = pet.urgent ? `
            <div class="pet-urgent-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                Urgent
            </div>
        ` : '';

        card.innerHTML = `
            <div class="pet-card-image">
                <img src="${imageUrl}" alt="${pet.name}" onerror="this.src='/placeholder.svg'">
                ${urgentBadge}
            </div>
            <div class="pet-card-content">
                <div class="pet-card-header">
                    <div>
                        <h3 class="pet-card-title">${pet.name}</h3>
                        <p class="pet-card-subtitle">${pet.breed} • ${pet.age}</p>
                    </div>
                    <span class="pet-type-badge">${pet.type}</span>
                </div>
                <p class="pet-description">${pet.description}</p>
                <div class="pet-location">
                    <svg class="pet-location-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>${pet.shelter} • ${pet.distance}</span>
                </div>
                <a href="/pets/${pet.id}" class="pet-card-button">View Profile</a>
            </div>
        `;

        return card;
    }

    showError() {
        const container = document.getElementById('pets-grid');
        if (!container) return;

        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <p style="color: #6b7280; font-size: 16px;">No pets available right now. Check back soon!</p>
            </div>
        `;
    }
}

// Initialize Pet Cards when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new PetCards();
});
