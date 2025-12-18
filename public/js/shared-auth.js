// Shared authentication functionality for all pages
let currentUser = null;

async function initializeAuth() {
    await checkAuthStatus();
    updateAuthUI();
}

async function checkAuthStatus() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            currentUser = null;
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
        } else {
            currentUser = null;
            localStorage.removeItem('token');
        }
    } catch (error) {
        console.log('Auth error:', error);
        currentUser = null;
    }
}

function updateAuthUI() {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer) return;
    
    if (currentUser) {
        authContainer.innerHTML = `
            <span style="margin-right: 1rem; color: #333;">Welcome, ${currentUser.first_name || currentUser.username}!</span>
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
    currentUser = null;
    window.location.href = '/html/login.html';
}

// Initialize auth when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
});
