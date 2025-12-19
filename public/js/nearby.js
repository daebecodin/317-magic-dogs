async function searchOrganizations() {
    const zipcode = document.getElementById('zipcode').value.trim();
    const distance = document.getElementById('distance').value;
    
    if (!zipcode) {
        alert('Please enter a zip code');
        return;
    }
    
    if (!/^\d{5}$/.test(zipcode)) {
        alert('Please enter a valid 5-digit zip code');
        return;
    }
    
    const loading = document.getElementById('loading');
    const container = document.getElementById('organizations-container');
    const noResults = document.getElementById('no-results');
    
    // Show loading state
    loading.style.display = 'block';
    container.innerHTML = '';
    noResults.style.display = 'none';
    
    try {
        // Get organizations using GET request (no radius filtering available)
        const response = await fetch('https://onlypets-api-wrapper.onrender.com/rescuegroups/organizations?limit=100');
        
        const data = await response.json();
        const organizations = data.data || [];
        
        // Filter organizations by state/region (simple filtering since we can't do radius)
        const stateFromZip = getStateFromZipcode(zipcode);
        const filteredOrgs = organizations.filter(org => {
            const attrs = org.attributes;
            // Filter by state if we can determine it from zipcode
            if (stateFromZip && attrs.state) {
                return attrs.state.toLowerCase() === stateFromZip.toLowerCase();
            }
            // Otherwise show all organizations
            return true;
        });
        
        loading.style.display = 'none';
        
        if (filteredOrgs.length > 0) {
            displayOrganizations(filteredOrgs.slice(0, 20)); // Show first 20 results
        } else {
            noResults.style.display = 'block';
        }
        
    } catch (error) {
        console.error('Error searching organizations:', error);
        loading.style.display = 'none';
        container.innerHTML = '<div style="text-align: center; padding: 2rem; color: #ef4444;">Error searching organizations. Please try again.</div>';
    }
}

// Simple function to get state from zipcode (basic mapping for common states)
function getStateFromZipcode(zipcode) {
    const zip = parseInt(zipcode);
    
    // Basic zipcode to state mapping for major ranges
    if (zip >= 10001 && zip <= 14999) return 'NY'; // New York
    if (zip >= 90001 && zip <= 96699) return 'CA'; // California  
    if (zip >= 60001 && zip <= 62999) return 'IL'; // Illinois
    if (zip >= 77001 && zip <= 79999) return 'TX'; // Texas
    if (zip >= 33001 && zip <= 34999) return 'FL'; // Florida
    if (zip >= 20001 && zip <= 20599) return 'DC'; // Washington DC
    if (zip >= 20600 && zip <= 21999) return 'MD'; // Maryland
    if (zip >= 22001 && zip <= 24699) return 'VA'; // Virginia
    
    // Return null if we can't determine state
    return null;
}

function displayOrganizations(organizations) {
    const container = document.getElementById('organizations-container');
    
    container.innerHTML = organizations.map(org => {
        const attrs = org.attributes;
        const orgType = attrs.type || 'Organization';
        const location = `${attrs.city || ''}, ${attrs.state || ''}`.replace(/^,\s*|,\s*$/g, '');
        const phone = attrs.phone ? `<a href="tel:${attrs.phone}">${attrs.phone}</a>` : 'Not available';
        const email = attrs.email ? `<a href="mailto:${attrs.email}">${attrs.email}</a>` : 'Not available';
        const website = attrs.url ? `<a href="${attrs.url}" target="_blank">Visit Website</a>` : 'Not available';
        
        return `
            <div class="org-card">
                <div class="org-header">
                    <h3 class="org-name">${attrs.name || 'Unknown Organization'}</h3>
                    <span class="org-type">${orgType}</span>
                </div>
                <div class="org-details">
                    <div class="org-location">
                        <strong>📍 Location:</strong> ${location || 'Not available'}
                    </div>
                    ${attrs.street ? `<div class="org-address">${attrs.street}</div>` : ''}
                    <div class="org-contact">
                        <div><strong>📞 Phone:</strong> ${phone}</div>
                        <div><strong>✉️ Email:</strong> ${email}</div>
                        <div><strong>🌐 Website:</strong> ${website}</div>
                    </div>
                    ${attrs.serveAreas ? `<div class="org-service"><strong>Service Areas:</strong> ${attrs.serveAreas}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

// Allow Enter key to trigger search
document.addEventListener('DOMContentLoaded', function() {
    const zipcodeInput = document.getElementById('zipcode');
    if (zipcodeInput) {
        zipcodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchOrganizations();
            }
        });
    }
});
