// Route configuration
const routes = {
    '/': { page: 'home', title: 'Tanarouge' },
    '/home': { page: 'home', title: 'Tanarouge' },
    '/music': { page: 'music', title: 'Music | Tanarouge' },
    '/live': { page: 'live', title: 'Live | Tanarouge' },
    '/info': { page: 'info', title: 'Info | Tanarouge' }
};

document.addEventListener("DOMContentLoaded", function() {
    loadComponent('header', 'components/header.html');
    loadComponent('footer', 'components/footer.html');

    // Load page based on current URL
    handleRoute();

    // Handle browser back/forward buttons
    window.addEventListener('popstate', handleRoute);
});

// Handle routing based on current URL
function handleRoute() {
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];

    loadPage(route.page, route.title);
}

// Navigate to a new route
function navigateTo(path) {
    window.history.pushState({}, '', path);
    handleRoute();
}

// Load page content
function loadPage(pageName, pageTitle) {
    fetch(`pages/${pageName}.html`)
        .then(response => response.text())
        .then(data => {
            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.innerHTML = data;
            }
            document.title = pageTitle;

            // Close mobile menu if open
            closeMobileMenu();

            // Handle special page initializations
            if (pageName === 'live') {
                if (window.Bandsintown && typeof window.Bandsintown.loadWidget === 'function') {
                    window.Bandsintown.loadWidget();
                }
            }
        })
        .catch(error => console.error('Error loading page:', error));
}

// Carica un componente HTML
function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById(id + '-container');
            if (container) {
                container.innerHTML = data;
            } else {
                console.warn(`Elemento ${id}-container non trovato.`);
            }

            if (id === 'header') {
                setupMobileMenu();
                setupHeaderLinks();
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

// Close mobile menu
function closeMobileMenu() {
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        body.classList.remove('menu-open');
        if (menuIcon) {
            menuIcon.querySelector('.menu-icon').style.display = 'block';
            menuIcon.querySelector('.close-icon').style.display = 'none';
        }
    }
}

// Setup mobile menu
function setupMobileMenu() {
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    if (menuIcon && mobileMenu) {
        menuIcon.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.toggle('open');
            body.classList.toggle('menu-open');

            // Toggle icon between + and X
            menuIcon.querySelector('.menu-icon').style.display = isOpen ? 'none' : 'block';
            menuIcon.querySelector('.close-icon').style.display = isOpen ? 'block' : 'none';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !menuIcon.contains(event.target)) {
                closeMobileMenu();
            }
        });
    }
}

// Setup header links for SPA navigation
function setupHeaderLinks() {
    const headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    const links = headerContainer.querySelectorAll('a[data-page]');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const pageName = this.getAttribute('data-page');

            // Map page name to route path
            let path = '/';
            if (pageName === 'home') path = '/';
            else if (pageName) path = `/${pageName}`;

            navigateTo(path);
        });
    });
}
