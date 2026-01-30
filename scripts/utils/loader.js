// Gestion de l'écran de chargement

// Afficher le loader
function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.remove('hidden');
        document.body.classList.add('loading');
    }
}

// Masquer le loader avec animation
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
    }
}

// Créer le HTML du loader
function createLoader() {
    // Vérifier si le loader existe déjà
    if (document.getElementById('loader')) return;
    
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.className = 'loader-overlay';
    loader.setAttribute('role', 'status');
    loader.setAttribute('aria-label', 'Chargement en cours');
    
    loader.innerHTML = `
        <div class="loader-content">
            <img src="assets/images/logo.png" alt="" class="loader-logo" aria-hidden="true" />
            <div class="loader-spinner"></div>
            <p class="loader-text">Chargement</p>
        </div>
    `;
    
    document.body.insertBefore(loader, document.body.firstChild);
}

// Gérer la navigation entre pages
function handlePageNavigation() {
    // Intercepter les clics sur les liens internes
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        
        if (!link || !link.href || link.target) return;
        
        // Ignorer les liens de la lightbox/médias
        if (link.classList.contains('media-link')) return;
        
        // Ignorer les liens avec juste un hash (#)
        const linkHref = link.getAttribute('href');
        if (!linkHref || linkHref === '#' || linkHref.startsWith('#')) return;
        
        // Vérifier si c'est un lien interne vers une autre page
        const currentHost = window.location.host;
        const linkUrl = new URL(link.href);
        
        // Vérifier que c'est bien une navigation vers une autre page (pas juste un hash)
        const issamePage = linkUrl.pathname === window.location.pathname && linkUrl.search === window.location.search;
        if (issamePage) return;
        
        if (linkUrl.host === currentHost) {
            e.preventDefault();
            showLoader();
            
            // Délai pour l'animation puis navigation
            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    createLoader();
    
    // Afficher le loader initialement
    document.body.classList.add('loading');
    
    // Masquer le loader après un court délai (pour l'effet visuel)
    setTimeout(() => {
        hideLoader();
    }, 800);
    
    // Activer la gestion de navigation
    handlePageNavigation();
});

// Afficher le loader avant de quitter la page
window.addEventListener('beforeunload', () => {
    showLoader();
});
