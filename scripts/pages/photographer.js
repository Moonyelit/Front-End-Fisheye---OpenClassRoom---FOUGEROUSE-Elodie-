// Récupération de l'ID du photographe depuis l'URL
function getPhotographerId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}

// Variable globale pour stocker les médias (utilisée par la lightbox)
let currentMediaList = [];

// Récupération des données
async function getPhotographers() {
    try {
        const response = await fetch("data/photographers.json");
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return { photographers: [], media: [] };
    }
}

// Affichage du header du photographe
function displayPhotographerHeader(photographer) {
    const headerSection = document.getElementById("photograph-header");
    if (!headerSection) return;

    const { name, city, country, tagline, price, portrait } = photographer;
    // Les portraits sont dans assets/photographers/
    const picture = `assets/photographers/${portrait}`;

    headerSection.innerHTML = `
        <div class="photographer-info">
            <h1 class="photographer-name">${name}</h1>
            <div class="photographer-details">
                <p class="photographer-location">${city}, ${country}</p>
                <p class="photographer-tagline">${tagline}</p>
            </div>
        </div>
        <button class="contact_button button " onclick="displayModal()">Contactez-moi</button>
        <img src="${picture}" alt="${name}" class="photographer-portrait" />
    `;
}

// Affichage des médias
function displayMedia(mediaArray) {
    const gallery = document.getElementById("media-gallery");
    if (!gallery) return;

    gallery.innerHTML = "";
    currentMediaList = mediaArray; // Stocker pour la lightbox

    mediaArray.forEach((media, index) => {
        const mediaModel = mediaTemplate(media);
        const mediaCard = mediaModel.getMediaCardDOM();
        
        // Ajouter l'événement de clic pour ouvrir la lightbox
        const mediaLink = mediaCard.querySelector('.media-link');
        if (mediaLink) {
            mediaLink.addEventListener('click', (e) => {
                e.preventDefault();
                openLightbox(currentMediaList, index);
            });
        }
        
        gallery.appendChild(mediaCard);
    });
}

// Tri des médias
function sortMedia(mediaArray, sortBy) {
    const sortedMedia = [...mediaArray];

    switch (sortBy) {
        case 'popularity':
            sortedMedia.sort((a, b) => b.likes - a.likes);
            break;
        case 'date':
            sortedMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'title':
            sortedMedia.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            break;
    }

    return sortedMedia;
}

// Mise à jour du total de likes
function updateTotalLikes() {
    const mediaCards = document.querySelectorAll('.media-card');
    let totalLikes = 0;
    
    mediaCards.forEach((card) => {
        const likes = parseInt(card.getAttribute('data-likes'));
        totalLikes += likes;
    });

    const totalLikesElement = document.querySelector('.total-likes-count');
    if (totalLikesElement) {
        totalLikesElement.textContent = totalLikes.toLocaleString('fr-FR');
    }
}

// Affichage de la barre fixe
function displayStickyFooter(photographer) {
    const footer = document.getElementById("sticky-footer");
    if (!footer) return;

    const { price } = photographer;
    
    footer.innerHTML = `
        <div class="total-likes">
            <span class="total-likes-count">0</span>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#FFFFFF"/>
            </svg>
        </div>
        <div class="photographer-price-footer">${price}€ / jour</div>
    `;
}

// Initialisation
async function init() {
    const photographerId = getPhotographerId();
    if (!photographerId) {
        console.error("Aucun ID de photographe trouvé dans l'URL");
        return;
    }

    const { photographers, media } = await getPhotographers();
    
    // Trouver le photographe
    const photographer = photographers.find(p => p.id === photographerId);
    if (!photographer) {
        console.error("Photographe non trouvé");
        return;
    }

    // Filtrer les médias du photographe
    const photographerMedia = media.filter(m => m.photographerId === photographerId);

    // Afficher le header
    displayPhotographerHeader(photographer);

    // Afficher la barre fixe
    displayStickyFooter(photographer);

    // Trier et afficher les médias
    const sortedMedia = sortMedia(photographerMedia, 'popularity');
    displayMedia(sortedMedia);
    updateTotalLikes();

    // Gestion du tri
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sorted = sortMedia(photographerMedia, e.target.value);
            displayMedia(sorted);
            updateTotalLikes();
        });
    }

    // Mettre à jour le titre de la modale
    const modalTitle = document.getElementById("modal-title");
    if (modalTitle) {
        modalTitle.textContent = `Contactez-moi ${photographer.name}`;
    }
}

init();