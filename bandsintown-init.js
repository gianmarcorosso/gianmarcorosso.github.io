// Inizializza il widget Bandsintown subito
document.addEventListener("DOMContentLoaded", function() {
    const widget = document.querySelector('.bit-widget-initializer');
    if(widget && window.Bandsintown && typeof window.Bandsintown.loadWidget === 'function') {
        window.Bandsintown.loadWidget(widget);
    }
});