document.addEventListener("DOMContentLoaded", function() {
    loadComponent('header', 'components/header');
    loadComponent('footer', 'components/footer');
});

function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id + '-container').innerHTML = data;

            if (id === 'header') {
                setupMobileMenu();
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

function setupMobileMenu() {
    const menuIcon = document.querySelector('.mobile-menu-icon');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    menuIcon.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.toggle('open');
        body.classList.toggle('menu-open'); // Blocca lo scroll del body

        // Cambia l'icona da + a X e viceversa
        menuIcon.querySelector('.menu-icon').style.display = isOpen ? 'none' : 'block';
        menuIcon.querySelector('.close-icon').style.display = isOpen ? 'block' : 'none';
    });

    // Aggiungi un evento per chiudere il menu quando si clicca all'esterno del menu
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !menuIcon.contains(event.target)) {
            if (mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
                body.classList.remove('menu-open');
                menuIcon.querySelector('.menu-icon').style.display = 'block';
                menuIcon.querySelector('.close-icon').style.display = 'none';
            }
        }
    });
}
