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
    const { id, photographerId, title, image, video, likes, date, price } = data;

    // Récupérer le nom du dossier du photographe
    const photographerFolder = photographerFolderMap[photographerId] || photographerId;

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.className = "media-card";
        article.setAttribute("data-id", id);
        article.setAttribute("data-date", date);
        article.setAttribute("data-title", title.toLowerCase());
        article.setAttribute("data-likes", likes);

        // Lien vers la lightbox
        const link = document.createElement('a');
        link.href = "#";
        link.className = "media-link";
        link.setAttribute("aria-label", `Voir ${title} en grand format`);

        // Conteneur pour l'image ou la vidéo
        const mediaContainer = document.createElement('div');
        mediaContainer.className = "media-container";

        if (image) {
            const img = document.createElement('img');
            const normalizedFileName = normalizeFileName(image);
            img.src = `assets/photos/${photographerFolder}/${normalizedFileName}`;
            img.alt = title;
            img.className = "media-image";
            mediaContainer.appendChild(img);
        } else if (video) {
            const videoElement = document.createElement('video');
            const normalizedFileName = normalizeFileName(video);
            videoElement.src = `assets/photos/${photographerFolder}/${normalizedFileName}`;
            videoElement.className = "media-video";
            videoElement.setAttribute("aria-label", title);
            mediaContainer.appendChild(videoElement);
        }

        link.appendChild(mediaContainer);
        article.appendChild(link);

        // Informations du média
        const mediaInfo = document.createElement('div');
        mediaInfo.className = "media-info";

        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        titleElement.className = "media-title";

        const likesContainer = document.createElement('div');
        likesContainer.className = "media-likes";

        const likesCount = document.createElement('span');
        likesCount.textContent = likes;
        likesCount.className = "likes-count";

        const likesIcon = document.createElement('button');
        likesIcon.className = "likes-button";
        likesIcon.setAttribute("aria-label", `Aimer ${title}`);
        likesIcon.innerHTML = '<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/></svg>';
        
        likesIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const currentLikes = parseInt(likesCount.textContent);
            likesCount.textContent = currentLikes + 1;
            article.setAttribute("data-likes", currentLikes + 1);
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
