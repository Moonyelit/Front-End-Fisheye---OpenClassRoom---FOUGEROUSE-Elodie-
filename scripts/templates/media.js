/* global updateTotalLikes, createMediaContent */
/* exported mediaTemplate, photographerFolderMap, normalizeFileName */
// Mapping entre les IDs des photographes et les noms des dossiers dans assets/photos
const photographerFolderMap = {
    82: "Tracy",
    195: "Marcel",
    243: "Mimi",
    527: "Nabeel",
    925: "Rhode",
    930: "Ellie Rose"
};

// Mapping pour les fichiers avec des noms différents dans le dossier
const fileNameMapping = {
    "Architecture_Contrast.jpg": "Architecure_Contrast.jpg",
    "Travel_Adventure_Door.jpg": "Travel _Adventure_Door.jpg" 
};

// Fonction pour normaliser le nom de fichier
function normalizeFileName(fileName) {
    return fileNameMapping[fileName] || fileName;
}

function mediaTemplate(data) {
    const { id, photographerId, title, image, video, likes, date } = data;

    // Récupérer le nom du dossier du photographe
    const photographerFolder = photographerFolderMap[photographerId] || photographerId;

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.className = "media-card";
        article.setAttribute("role", "listitem");
        article.setAttribute("data-id", id);
        article.setAttribute("data-date", date);
        article.setAttribute("data-title", title.toLowerCase());
        article.setAttribute("data-likes", likes);

        // Lien vers la lightbox (#9 - Image link ouvre la lightbox)
        const link = document.createElement('a');
        link.href = "#";
        link.className = "media-link";
        // Nom accessible = titre du média
        link.setAttribute("aria-label", `${title}, closeup view`);

        // Conteneur pour l'image ou la vidéo (factory pattern)
        const mediaContainer = document.createElement('div');
        mediaContainer.className = "media-container";

        const mediaType = image ? 'image' : 'video';
        const fileName = normalizeFileName(image || video);
        const mediaContent = createMediaContent({
            type: mediaType,
            title,
            photographerFolder,
            fileName
        });
        mediaContainer.appendChild(mediaContent);

        link.appendChild(mediaContainer);
        article.appendChild(link);

        // Informations du média (#10 - Texte statique)
        const mediaInfo = document.createElement('div');
        mediaInfo.className = "media-info";

        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        titleElement.className = "media-title";
        titleElement.id = `media-title-${id}`;

        // Conteneur des likes
        const likesContainer = document.createElement('div');
        likesContainer.className = "media-likes";

        const likesCount = document.createElement('span');
        likesCount.textContent = likes;
        likesCount.className = "likes-count";
        likesCount.setAttribute("aria-live", "polite");

        // Bouton like (#11 - Icône avec aria-label="likes")
        const likesIcon = document.createElement('button');
        likesIcon.className = "likes-button";
        likesIcon.setAttribute("aria-label", "likes");
        likesIcon.innerHTML = '<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/></svg>';
        
        likesIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Incrémenter les likes
            const currentLikes = parseInt(likesCount.textContent);
            likesCount.textContent = currentLikes + 1;
            article.setAttribute("data-likes", currentLikes + 1);
            
            // Déclencher l'animation de pulsation
            likesIcon.classList.remove('liked');
            // Force reflow pour relancer l'animation
            void likesIcon.offsetWidth;
            likesIcon.classList.add('liked');
            
            updateTotalLikes();
        });

        likesContainer.appendChild(likesCount);
        likesContainer.appendChild(likesIcon);

        mediaInfo.appendChild(titleElement);
        mediaInfo.appendChild(likesContainer);
        article.appendChild(mediaInfo);

        return article;
    }

    return { getMediaCardDOM };
}
