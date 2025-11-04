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

// Hero Section - Spline 3D Viewer
class SplineViewer {
    constructor() {
        this.isReady = false;
        this.intervalId = null;
        this.timeoutId = null;
        this.init();
    }

    init() {
        const scriptId = "spline-viewer-script";
        
        if (document.getElementById(scriptId)) {
            this.isReady = true;
            this.loadSplineViewer();
            this.attemptLogoRemoval();
        } else {
            this.loadSplineScript(scriptId);
        }
    }

    loadSplineScript(scriptId) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.type = "module";
        script.src = "https://unpkg.com/@splinetool/viewer@1.10.33/build/spline-viewer.js";
        script.async = true;

        script.onload = () => {
            console.log("Spline script loaded.");
            this.isReady = true;
            this.loadSplineViewer();
            this.startLogoRemoval();
        };

        script.onerror = () => {
            console.error("Failed to load Spline script.");
        };

        document.body.appendChild(script);
    }

    loadSplineViewer() {
        const container = document.getElementById('spline-container');
        if (container && this.isReady) {
            const viewer = document.createElement('spline-viewer');
            viewer.setAttribute('url', 'https://prod.spline.design/SKxVlf1Budt1XkBJ/scene.splinecode');
            viewer.className = 'spline-container';
            container.appendChild(viewer);
        }
    }

    startLogoRemoval() {
        this.intervalId = setInterval(() => this.attemptLogoRemoval(), 500);
        this.timeoutId = setTimeout(() => {
            if (this.intervalId) clearInterval(this.intervalId);
        }, 10000);
    }

    attemptLogoRemoval() {
        const viewer = document.querySelector("spline-viewer");
        if (viewer?.shadowRoot) {
            const branding = 
                viewer.shadowRoot.querySelector('[part="branding"]') ||
                viewer.shadowRoot.querySelector('a[href*="spline.design"]') ||
                viewer.shadowRoot.querySelector('div[class*="branding"]');

            if (branding) {
                console.log("Spline branding found, removing...");
                branding.remove();
                if (this.intervalId) clearInterval(this.intervalId);
                if (this.timeoutId) clearTimeout(this.timeoutId);
                return true;
            }
        }
        return false;
    }

    destroy() {
        if (this.intervalId) clearInterval(this.intervalId);
        if (this.timeoutId) clearTimeout(this.timeoutId);
    }
}

// Initialize Spline viewer when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new SplineViewer();
});
