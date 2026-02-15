/* exported createMediaContent */

/**
 * Factory : crée l'élément DOM pour une image (titre, chemin, nom de fichier).
 * @param {Object} params
 * @param {string} params.title - Titre du média (alt / accessibilité)
 * @param {string} params.photographerFolder - Dossier du photographe
 * @param {string} params.fileName - Nom du fichier (déjà normalisé)
 * @returns {HTMLImageElement}
 */
function createImageMedia({ title, photographerFolder, fileName }) {
    const img = document.createElement('img');
    img.src = `assets/photos/${photographerFolder}/${fileName}`;
    img.alt = title;
    img.className = "media-image";
    return img;
}

/**
 * Factory : crée les éléments DOM pour une vidéo (titre, chemin, nom de fichier).
 * @param {Object} params
 * @param {string} params.title - Titre du média (aria-label / accessibilité)
 * @param {string} params.photographerFolder - Dossier du photographe
 * @param {string} params.fileName - Nom du fichier (déjà normalisé)
 * @returns {DocumentFragment}
 */
function createVideoMedia({ title, photographerFolder, fileName }) {
    const fragment = document.createDocumentFragment();

    const videoElement = document.createElement('video');
    videoElement.src = `assets/photos/${photographerFolder}/${fileName}`;
    videoElement.className = "media-video";
    videoElement.setAttribute("aria-label", title);
    videoElement.setAttribute("title", title);
    fragment.appendChild(videoElement);

    const playIcon = document.createElement('div');
    playIcon.className = "video-play-icon";
    playIcon.innerHTML = `
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="30" fill="rgba(255, 255, 255, 0.8)"/>
            <path d="M24 18L44 30L24 42V18Z" fill="#901C1C"/>
        </svg>
    `;
    playIcon.setAttribute("aria-hidden", "true");
    fragment.appendChild(playIcon);

    return fragment;
}

/**
 * Factory principale : retourne le contenu DOM (image ou vidéo) selon le type.
 * @param {Object} params
 * @param {'image'|'video'} params.type - Type de média
 * @param {string} params.title - Titre du média
 * @param {string} params.photographerFolder - Dossier du photographe
 * @param {string} params.fileName - Nom du fichier (déjà normalisé)
 * @returns {HTMLImageElement|DocumentFragment}
 */
function createMediaContent({ type, title, photographerFolder, fileName }) {
    const factories = {
        image: createImageMedia,
        video: createVideoMedia
    };
    const factory = factories[type];
    return factory({ title, photographerFolder, fileName });
}
