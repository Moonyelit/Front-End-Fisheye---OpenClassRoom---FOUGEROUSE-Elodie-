// Gestion de la Lightbox pour les médias (images et vidéos)

let currentMediaIndex = 0;
let mediaList = [];

// Ouvrir la lightbox
function openLightbox(mediaData, index) {
    mediaList = mediaData;
    currentMediaIndex = index;
    
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    updateLightboxContent();
    lightbox.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus sur la lightbox pour l'accessibilité
    const closeBtn = lightbox.querySelector('.lightbox-close');
    if (closeBtn) closeBtn.focus();
    
    // Ajouter les événements clavier
    document.addEventListener('keydown', handleLightboxKeydown);
}

// Fermer la lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    
    // Arrêter la vidéo si elle est en cours de lecture
    const video = lightbox.querySelector('.lightbox-video');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Retirer les événements clavier
    document.removeEventListener('keydown', handleLightboxKeydown);
    
    // Remettre le focus sur le média qui a ouvert la lightbox
    const mediaCards = document.querySelectorAll('.media-card');
    if (mediaCards[currentMediaIndex]) {
        const link = mediaCards[currentMediaIndex].querySelector('.media-link');
        if (link) link.focus();
    }
}

// Navigation vers le média précédent
function previousMedia() {
    currentMediaIndex = (currentMediaIndex - 1 + mediaList.length) % mediaList.length;
    updateLightboxContent();
}

// Navigation vers le média suivant
function nextMedia() {
    currentMediaIndex = (currentMediaIndex + 1) % mediaList.length;
    updateLightboxContent();
}

// Mise à jour du contenu de la lightbox
function updateLightboxContent() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !mediaList[currentMediaIndex]) return;
    
    const media = mediaList[currentMediaIndex];
    const mediaContainer = lightbox.querySelector('.lightbox-media-container');
    const titleElement = lightbox.querySelector('.lightbox-title');
    
    if (!mediaContainer) return;
    
    // Nettoyer le contenu précédent
    mediaContainer.innerHTML = '';
    
    // Récupérer le dossier du photographe
    const photographerFolder = photographerFolderMap[media.photographerId] || media.photographerId;
    
    if (media.image) {
        // Afficher une image
        const img = document.createElement('img');
        const normalizedFileName = normalizeFileName(media.image);
        img.src = `assets/photos/${photographerFolder}/${normalizedFileName}`;
        img.alt = media.title;
        img.className = 'lightbox-image';
        mediaContainer.appendChild(img);
    } else if (media.video) {
        // Afficher une vidéo avec contrôles
        const video = document.createElement('video');
        const normalizedFileName = normalizeFileName(media.video);
        video.src = `assets/photos/${photographerFolder}/${normalizedFileName}`;
        video.className = 'lightbox-video';
        video.controls = true;
        video.autoplay = true;
        video.setAttribute('aria-label', media.title);
        mediaContainer.appendChild(video);
    }
    
    // Mettre à jour le titre
    if (titleElement) {
        titleElement.textContent = media.title;
    }
}

// Gestion des événements clavier
function handleLightboxKeydown(e) {
    switch (e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            previousMedia();
            break;
        case 'ArrowRight':
            nextMedia();
            break;
    }
}

// Création du HTML de la lightbox (appelé au chargement)
function createLightboxHTML() {
    // Vérifier si la lightbox existe déjà
    if (document.getElementById('lightbox')) return;
    
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox-overlay';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Visionneuse de médias');
    lightbox.setAttribute('aria-hidden', 'true');
    
    lightbox.innerHTML = `
        <div class="lightbox-content" role="document">
            <button class="lightbox-close" onclick="closeLightbox()" aria-label="Fermer la visionneuse">
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="#901C1C"/>
                </svg>
            </button>
            
            <button class="lightbox-nav lightbox-prev" onclick="previousMedia()" aria-label="Image précédente">
                <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M29.6399 42.36L11.3199 24L29.6399 5.64L23.9999 0L-0.000106812 24L23.9999 48L29.6399 42.36Z" fill="#901C1C"/>
                </svg>
            </button>
            
            <figure class="lightbox-figure">
                <div class="lightbox-media-container" role="img" aria-live="polite"></div>
                <figcaption class="lightbox-title" id="lightbox-title"></figcaption>
            </figure>
            
            <button class="lightbox-nav lightbox-next" onclick="nextMedia()" aria-label="Image suivante">
                <svg width="30" height="48" viewBox="0 0 30 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M0.360107 42.36L18.6801 24L0.360107 5.64L6.00011 0L30.0001 24L6.00011 48L0.360107 42.36Z" fill="#901C1C"/>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Fermer la lightbox en cliquant sur l'overlay
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Focus trap - garder le focus dans la lightbox
    lightbox.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const focusableElements = lightbox.querySelectorAll('button:not([disabled])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// Initialiser la lightbox au chargement du DOM
document.addEventListener('DOMContentLoaded', createLightboxHTML);
