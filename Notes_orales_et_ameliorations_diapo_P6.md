# Soutenance P6 – Fisheye : améliorations diapo + notes orales

Document à utiliser avec votre fichier **Soutenance P6 - Fisheye.pptx**. Pour chaque diapositive, copiez le bloc « **Notes à ajouter** » dans les notes du présentateur (Affichage > Notes dans PowerPoint).

---

## Vérifications générales (améliorations possibles)

- **Cohérence visuelle**  
  Utiliser les couleurs du projet : titres #901C1C, accents #DB8876, fond #FAFAFA ou blanc, texte #525252. Vérifier que le rouge bordeaux et le saumon sont bien présents.

- **Quantité de texte**  
  Rester sobre : 3 à 5 points par slide, pas de paragraphes denses. Les notes sont faites pour le texte à dire, pas les slides.

- **Extraits de code**  
  Courts (5–15 lignes), police monospace (Consolas, Courier New), fond clair. Un seul extrait par slide si possible, ou deux très courts.

- **Nombre de slides**  
  Le plan prévoit 13 slides (titre + contexte + démo + 9 contenus + conclusion). Vérifier que toutes sont présentes et dans le bon ordre.

- **Slide titre**  
  Doit afficher : « Projet P6 – Fisheye », sous-titre « Site accessible pour une plateforme de photographes », et votre prénom/nom.

---

## Diapo 1 – Titre + prénom

**À vérifier sur la diapo :**  
Titre « Projet P6 – Fisheye », sous-titre « Site accessible pour une plateforme de photographes », votre nom.

**Notes à ajouter :**

> Bonjour. Je vais vous présenter mon projet P6 du parcours Front-end OpenClassroom : Fisheye, un site accessible pour une plateforme de photographes. Le livrable comprend une page d’accueil et une page photographe avec galerie, tri et formulaire de contact, en mettant l’accent sur l’accessibilité clavier et lecteur d’écran, ainsi que sur un code maintenable.

---

## Diapo 2 – Contexte et objectifs

**À vérifier sur la diapo :**  
Défi : créer l’accessibilité du site en respectant les normes a11y. Données fournies via un JSON → templates JS qui récupèrent ces données pour un rendu dynamique. Livrable : accueil + page photographe. Mention OpenClassroom.

**Notes à ajouter :**

> Le défi de ce site était double : d’une part créer l’accessibilité en respectant les normes a11y — clavier, lecteur d’écran, ARIA — et d’autre part s’appuyer sur des données fournies via un fichier JSON. Il a donc fallu concevoir des templates en JavaScript qui récupèrent ces données et génèrent le contenu de façon dynamique : les cartes photographes et les cartes médias s’adaptent aux données du JSON. Le livrable comporte la page d’accueil avec la liste des photographes et la page photographe avec la galerie, le tri et le formulaire de contact. C’est un projet du parcours Front-end OpenClassroom.

---

## Diapo 3 – Démonstration du site

**À vérifier sur la diapo :**  
Titre « Démonstration du site ». Capture d’écran ou lien vers le site en local ; optionnel : courte liste de ce que vous montrerez (accueil, page photographe, lightbox, tri, formulaire).

**Notes à ajouter :**

> Je vous propose une courte démonstration du site. Je vais ouvrir la page d’accueil pour montrer la liste des photographes générée à partir du JSON, puis passer sur une page photographe pour montrer la galerie, le tri par popularité, date ou titre, et éventuellement la lightbox et le formulaire de contact. Vous pourrez voir que tout est navigable au clavier et que le contenu s’adapte aux données.

---

## Diapo 4 – Accessibilité – Navigation au clavier

**À vérifier sur la diapo :**  
Lien d’évitement, focus visible `:focus-visible`, Tab sur tous les éléments interactifs. Mettre **1 ou 2 captures** des extraits ci‑dessous.

### Captures à mettre sur la diapo (fichier + lignes)

**Capture 1 – Lien d’évitement (HTML)**  
- **Fichier :** `index.html`  
- **Lignes :** 14–15  

```html
<!-- Skip link pour l'accessibilité -->
<a href="#main" class="skip-link">Passer au contenu</a>
```

**Ce que fait ce code :** Le lien « Passer au contenu » est le premier élément focusable (premier Tab). Il pointe vers `#main` : en l’activant (Entrée), le focus saute directement dans la zone principale, sans parcourir le header. La classe `skip-link` le masque hors focus (`top: -100%`) et l’affiche au focus (voir CSS).

---

**Capture 2 – Focus visible (CSS)**  
- **Fichier :** `css/base/accessibility.css`  
- **Lignes :** 34–38 (bloc `*:focus-visible`)  

```css
*:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 3px;
    border-radius: 2px;
}
```

**Ce que fait ce code :** Juste au-dessus (l. 30–32) on a `*:focus { outline: none }` pour enlever l’outline par défaut. Ici, on ne l’affiche que pour la navigation clavier avec `:focus-visible`. Au Tab, l’utilisateur voit une bordure rouge bordeaux (`--color-primary`) autour de l’élément focusé ; au clic souris, pas d’outline. Recommandation a11y : focus visible au clavier uniquement.

---

**Optionnel – Style du skip-link au focus (CSS)**  
- **Fichier :** `css/base/accessibility.css`  
- **Lignes :** 8–25  

```css
.skip-link {
    position: absolute;
    top: -100%;
    ...
}
.skip-link:focus {
    top: 0;
    outline: 3px solid var(--color-tertiary);
    outline-offset: 2px;
}
```

**Ce que fait ce code :** Le lien est déplacé hors écran (`top: -100%`) au repos. Au focus (premier Tab), `top: 0` le fait apparaître en haut de la page avec un contour visible, pour que l’utilisateur puisse l’activer et aller au contenu.

---

**Comment fonctionne la tabulation :**  
L’ordre de focus suit l’ordre du DOM : 1) « Passer au contenu » (skip link), 2) lien logo, 3) contenu principal (liens des cartes photographes, etc.). Aucun `tabindex` positif : on garde l’ordre naturel. Les éléments focusables sont les liens `<a href>`, les boutons, le `<select>` du tri ; le focus visible (outline) indique l’élément actif. Shift+Tab revient en arrière.

**Notes à ajouter (diapo « Tabulation ») :**

> Tous les éléments interactifs — boutons, liens, select de tri — sont accessibles à la touche Tabulation. L’ordre de focus suit l’ordre de la page : d’abord le lien « Passer au contenu », puis le logo, puis le contenu principal. Je n’utilise pas de tabindex positif pour ne pas casser l’ordre logique. Une outline rouge bordeaux apparaît sur l’élément focusé grâce à :focus-visible, uniquement au clavier. Shift+Tab permet de revenir en arrière.

---

## Diapo 5 – Accessibilité – ARIA et sémantique

**À vérifier sur la diapo :**  
Comme sur ta capture : Landmarks (role="banner", role="main"), aria-label sur boutons iconographiques, aria-live="polite" pour les likes, formulaires (labels, aria-labelledby, champs requis).

### Où se trouve le code ARIA (captures pour la diapo)

**1. Landmarks – page d’accueil**  
- **Fichier :** `index.html`  
- **Lignes :** 17–18 et 23–25  

```html
<header role="banner">
    <a href="index.html" class="logo-link" aria-label="Fisheye Home page">
...
<main id="main" role="main">
    <div class="photographer-section" aria-label="Liste des photographes"></div>
</main>
```

**Ce que ça fait :** `role="banner"` et `role="main"` structurent la page pour le lecteur d’écran (landmarks). Le lien logo n’a que une image : `aria-label="Fisheye Home page"` donne un nom accessible. La zone principale a `aria-label="Liste des photographes"` pour décrire la région.

**2. aria-label sur boutons / liens (ex. lightbox, modale)**  
- **Modale contact :** `scripts/utils/contactForm.js` **lignes 16–18 et 27**  
  - `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`  
  - Bouton fermer : `aria-label="Close Contact form"`  
- **Lightbox :** `scripts/utils/lightbox.js` **lignes 136–137, 143, 150, 164**  
  - `aria-label="Image closeup view"`, bouton `aria-label="Close dialog"`, liens `aria-label="Previous image"` / `"Next image"`  
- **Cartes médias (template) :** `scripts/templates/media.js` **lignes 44 et 99–104**  
  - Lien vers lightbox : `aria-label="${title}, closeup view"`  
  - Zone des likes : `aria-live="polite"` sur le compteur, `aria-label="likes"` sur le bouton like  

**3. aria-live="polite" (annonce des likes)**  
- **Fichier :** `scripts/templates/media.js`  
- **Lignes :** 95–99 et 101–104  

```javascript
const likesCount = document.createElement('span');
likesCount.setAttribute("aria-live", "polite");
// ...
likesIcon.setAttribute("aria-label", "likes");
```

**Ce que ça fait :** Quand le nombre de likes change, le lecteur d’écran annonce la mise à jour sans interrompre (polite). Le bouton like est une icône : `aria-label="likes"` permet de l’annoncer.

**4. Formulaires – labels et aria-labelledby**  
- **Fichier :** `scripts/utils/contactForm.js`  
- **Lignes :** 15–18 (dialog), 35–55 (champs)  

```javascript
modal.setAttribute('aria-labelledby', 'modal-title');
// Dans le HTML de la modale :
// <label for="firstname" id="label-firstname">Prénom</label>
// <input ... aria-labelledby="label-firstname" ... required />
```

**Ce que ça fait :** La modale est annoncée avec le titre (aria-labelledby). Chaque champ a un `<label for="...">` et `aria-labelledby` qui pointe vers l’id du label ; les champs ont l’attribut `required` pour les obligatoires.

---

**Notes à ajouter (diapo « ARIA et sémantique ») :**

> **Landmarks — à quoi ça sert :** J’utilise des landmarks dans index.html : le header a `role="banner"` et le main a `role="main"`. Ça sert à structurer la page pour le lecteur d’écran : l’utilisateur peut sauter directement d’une région à l’autre — par exemple « aller au contenu principal » — au lieu de parcourir tout le contenu linéairement.
>
> **aria-label — le logo lien vers l’accueil :** Le lien du header ne contient qu’une image. Sans texte visible, le lecteur d’écran annoncerait seulement « image » ou le contenu de l’attribut alt. Avec `aria-label="Fisheye Home page"` sur le lien, il annonce clairement que c’est un lien vers la page d’accueil. Ça sert à donner un nom accessible à un élément interactif qui n’a pas de libellé visible.
>
> **aria-live polite et aria-label pour les likes :** Sur les cartes médias, le compteur de likes est dans un élément qui a `aria-live="polite"`. Ça sert à ce que le lecteur d’écran annonce automatiquement quand le nombre change — par exemple après un clic sur like — sans interrompre ce que l’utilisateur est en train d’écouter. Le bouton like est une icône sans texte : `aria-label="likes"` sert à ce que le lecteur d’écran annonce « bouton, likes » au lieu de « bouton » tout seul, pour que l’action soit compréhensible.
>
> **Labels et aria-labelledby pour le formulaire :** Chaque champ du formulaire de contact a un `<label>` avec `for` qui pointe vers l’id du champ, et les inputs ont `aria-labelledby` qui pointe vers l’id du label. Ça sert à associer explicitement le libellé au champ : le lecteur d’écran annonce « Prénom, champ de saisie » et non pas juste « champ de saisie ». Pour la modale, `aria-labelledby="modal-title"` donne un titre accessible à la fenêtre, donc le lecteur d’écran annonce « Fenêtre de dialogue, Contactez-moi » à l’ouverture.

---

## Diapo 6 – Modale et lightbox – Gestion du focus

**À vérifier sur la diapo :**  
role="dialog", aria-modal="true", focus trap, Escape, retour du focus. Mettre **1 ou 2 captures** des extraits ci‑dessous.

### Captures à mettre sur la diapo (fichier + lignes)

**1. role="dialog" et aria-modal (modale)**  
- **Fichier :** `scripts/utils/contactForm.js` — **lignes 15–19**

```javascript
// #1 - Dialog avec aria-labelledby pointant vers le titre
modal.setAttribute('role', 'dialog');
modal.setAttribute('aria-modal', 'true');
modal.setAttribute('aria-labelledby', 'modal-title');
modal.setAttribute('aria-hidden', 'true');
```

**Ce que ça fait :** Le lecteur d’écran annonce « fenêtre de dialogue » et traite la zone comme modale (contexte isolé). Même idée dans `lightbox.js` lignes 134–137 avec `role="dialog"`, `aria-modal="true"`, `aria-label="Image closeup view"`.

---

**2. Focus trap (garder le focus dans la fenêtre)**  
- **Fichier :** `scripts/utils/contactForm.js` — **lignes 87–104**

```javascript
// Focus trap - garder le focus dans la modale
modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
            'button:not([disabled]), input:not([disabled]), textarea:not([disabled])'
        );
        const focusArray = Array.from(focusableElements);
        const firstElement = focusArray[0];
        const lastElement = focusArray[focusArray.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});
```

**Ce que ça fait :** On écoute Tab sur la modale. Si on est sur le premier élément et qu’on fait Shift+Tab, on envoie le focus sur le dernier ; si on est sur le dernier et qu’on fait Tab, on renvoie sur le premier. Ainsi le focus ne sort jamais de la modale. Même logique dans `lightbox.js` lignes 182–198 avec `button, a[href]`.

---

**3. Touche Escape pour fermer**  
- **Modale :** `scripts/utils/contactForm.js` — **lignes 208–215**

```javascript
// Fermer la modale avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('contact_modal');
        if (modal && modal.style.display === 'flex') {
            closeModal();
        }
    }
});
```

- **Lightbox :** `scripts/utils/lightbox.js` — **lignes 112–116** (dans `handleLightboxKeydown`)

```javascript
switch (e.key) {
    case 'Escape':
        closeLightbox();
        break;
    // ...
}
```

**Ce que ça fait :** Dès qu’on appuie sur Escape et que la modale (ou la lightbox) est ouverte, on appelle `closeModal()` ou `closeLightbox()`. Comportement attendu pour une fenêtre modale.

---

**4. Retour du focus à la fermeture**  
- **Modale (focus sur le bouton « Contactez-moi ») :** `scripts/utils/contactForm.js` — **lignes 148–152**

```javascript
// Remettre le focus sur le bouton qui a ouvert la modale
const contactBtn = document.querySelector('.contact_button:not([type="submit"])');
if (contactBtn) {
    contactBtn.focus();
}
```

- **Lightbox (focus sur le lien du média) :** `scripts/utils/lightbox.js` — **lignes 46–52**

```javascript
// Remettre le focus sur le média qui a ouvert la lightbox
const mediaCards = document.querySelectorAll('.media-card');
if (mediaCards[currentMediaIndex]) {
    const link = mediaCards[currentMediaIndex].querySelector('.media-link');
    if (link) link.focus();
}
```

**Ce que ça fait :** À la fermeture, on replace le focus sur l’élément qui a ouvert la fenêtre. L’utilisateur au clavier retrouve sa position logique et peut continuer à naviguer sans repartir du début de la page.

---

**5. Focus à l’ouverture (modale et lightbox)**  
- **Modale :** `contactForm.js` lignes 132–135 — focus sur le premier champ.  
- **Lightbox :** `lightbox.js` lignes 21–23 — focus sur le bouton fermer.

---

### Notes à ajouter (texte à dire pour la diapo)

> **role dialog et aria-modal :** Sur la modale de contact et la lightbox, j’ai mis `role="dialog"` et `aria-modal="true"`. Ça permet au lecteur d’écran d’annoncer « fenêtre de dialogue » et de traiter la zone comme modale, donc de ne pas lire le contenu en arrière-plan.
>
> **Focus trap :** Le focus est piégé à l’intérieur. J’écoute la touche Tab sur la modale — ou sur la lightbox — et je récupère tous les éléments focusables. Si on est sur le premier et qu’on fait Shift+Tab, j’envoie le focus sur le dernier ; si on est sur le dernier et qu’on fait Tab, je le renvoie sur le premier. Comme ça on ne sort jamais de la fenêtre avec le clavier. Le code est dans contactForm.js vers les lignes 87–104, et la même logique dans lightbox.js vers 182–198.
>
> **Escape :** La touche Escape ferme la modale ou la lightbox. Pour la modale c’est un écouteur global qui vérifie si la modale est affichée puis appelle closeModal ; pour la lightbox c’est géré dans handleLightboxKeydown avec un case 'Escape'.
>
> **Retour du focus :** À la fermeture, je remets le focus sur l’élément qui a ouvert : pour la modale sur le bouton « Contactez-moi », pour la lightbox sur le lien du média qu’on venait de regarder. Comme ça l’utilisateur au clavier retrouve sa position et peut enchaîner avec Tab sans repartir du haut de la page.

---

## Diapo 7 – Lightbox – Ouverture, contenu et données (image / vidéo)

**À vérifier sur la diapo :**  
Ouverture (clic/clavier depuis la galerie), mise à jour du contenu de la lightbox (updateLightboxContent), récupération des données : comment savoir si c’est une image ou une vidéo (structure JSON : `media.image` / `media.video`). Mettre **1 ou 2 captures** des extraits ci‑dessous.

### Captures à mettre sur la diapo (fichier + lignes)

**1. Ouverture depuis la galerie (clic ou clavier)**  
- **Fichier :** `scripts/pages/photographer.js` — **lignes 67–74**

```javascript
const mediaLink = mediaCard.querySelector('.media-link');
if (mediaLink) {
    mediaLink.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(currentMediaList, index);
    });
}
```

**Ce que ça fait :** Chaque carte média contient un lien `.media-link`. Au clic, on empêche la navigation (href="#") et on ouvre la lightbox avec la liste des médias et l’index de la carte. Comme c’est un vrai lien, il est focusable au Tab et activable avec Entrée : ouverture au clic ou au clavier.

---

**2. Ouverture et mise à jour du contenu**  
- **Fichier :** `scripts/utils/lightbox.js` — **lignes 8–26**

```javascript
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
```

**Ce que ça fait (pour l’oral – ouverture de la lightbox) :**
- **mediaList / currentMediaIndex :** On stocke la liste des médias et l’index du média cliqué pour pouvoir afficher le bon contenu et naviguer (Précédent/Suivant) plus tard.
- **updateLightboxContent() :** On met à jour le contenu de la lightbox tout de suite (image ou vidéo + titre) avant d’afficher la fenêtre.
- **display = 'flex' / aria-hidden = 'false' :** On rend la lightbox visible et on signale aux lecteurs d’écran qu’elle est affichée.
- **overflow = 'hidden' sur body :** On bloque le défilement de la page derrière.
- **closeBtn.focus() :** On place le focus sur le bouton fermer pour l’accessibilité clavier (fermer tout de suite ou Tab pour naviguer).
- **addEventListener('keydown', handleLightboxKeydown) :** On active les raccourcis clavier (Escape, flèches) dès l’ouverture.

---

**3. Récupération des données : image ou vidéo ?**  
- **Structure dans le JSON** (`data/photographers.json`) : chaque objet média a soit une propriété **`image`** (nom du fichier), soit **`video`** (nom du fichier), jamais les deux.

- **Fichier :** `scripts/utils/lightbox.js` — **lignes 78–107** (dans `updateLightboxContent`)

```javascript
mediaContainer.innerHTML = '';

if (media.image) {
    const img = document.createElement('img');
    const normalizedFileName = normalizeFileName(media.image);
    img.src = `assets/photos/${photographerFolder}/${normalizedFileName}`;
    img.alt = media.title;
    img.className = 'lightbox-image';
    mediaContainer.appendChild(img);
} else if (media.video) {
    const video = document.createElement('video');
    const normalizedFileName = normalizeFileName(media.video);
    video.src = `assets/photos/${photographerFolder}/${normalizedFileName}`;
    video.className = 'lightbox-video';
    video.controls = true;
    video.autoplay = true;
    video.setAttribute('aria-label', media.title);
    mediaContainer.appendChild(video);
}

if (titleElement) {
    titleElement.textContent = media.title;
}
```

**Ce que ça fait :** On vide le conteneur. Ensuite on regarde les données du média : si `media.image` existe, on crée une balise `img` avec la source déduite du nom de fichier ; sinon si `media.video` existe, on crée une balise `video` avec contrôles et autoplay. Le titre vient de `media.title` (commun aux deux). Donc **la distinction image / vidéo vient des données JSON** : un média a soit la clé `image`, soit la clé `video`.

---

### Notes à ajouter (texte à dire pour la diapo 7)

> **Ouverture :** La lightbox s’ouvre au clic ou à la touche Entrée sur un média de la galerie. Dans photographer.js, sur chaque carte média on récupère le lien .media-link et on attache un écouteur click qui appelle openLightbox avec la liste des médias et l’index de la carte. Comme c’est un lien, il est dans l’ordre de tabulation : ouverture possible au clavier.
>
> **Mise à jour du contenu :** Dès l’ouverture, openLightbox appelle updateLightboxContent. Cette fonction vide le conteneur de la lightbox, puis crée soit une image soit une vidéo selon les données du média, et met à jour le titre en figcaption.
>
> **Récupération des données – image ou vidéo :** Dans le JSON, chaque média a soit une propriété `image` (nom du fichier), soit `video`, pas les deux. Dans updateLightboxContent on teste donc `if (media.image)` : on crée une balise img avec la source. Sinon `else if (media.video)` : on crée une balise video avec contrôles et autoplay. Le titre est toujours dans `media.title`. Donc c’est bien la structure des données qui indique le type de média.

---

## Diapo 8 – Lightbox – Navigation et fermeture

**À vérifier sur la diapo :**  
Navigation (boutons Précédent/Suivant, flèches clavier), fermeture (overlay, bouton fermer, Escape), retour du focus. Mettre **1 ou 2 captures** des extraits ci‑dessous.

### Captures à mettre sur la diapo (fichier + lignes)

**1. Navigation clavier (Escape, flèches)**  
- **Fichier :** `scripts/utils/lightbox.js` — **lignes 111–124**

```javascript
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
```

**Ce que ça fait :** Escape ferme la lightbox. Flèche gauche appelle `previousMedia()` (index - 1, rebouclage, puis `updateLightboxContent()`). Flèche droite appelle `nextMedia()`. L’écouteur est attaché à l’ouverture et retiré à la fermeture.

---

**2. Fermeture – les 3 façons (chacune à un endroit différent)**

Les trois façons de fermer ne sont pas dans le même bloc ; chacune est implémentée ici :

| Façon de fermer | Où c’est dans le code | Lignes |
|------------------|------------------------|--------|
| **1. Clic sur l’overlay** | `lightbox.addEventListener('click', …)` dans `createLightboxHTML` | **174–179** |
| **2. Bouton fermer** | Dans le HTML de la lightbox : `onclick="closeLightbox()"` sur le bouton `.lightbox-close` | **143** |
| **3. Touche Escape** | Dans `handleLightboxKeydown` : `case 'Escape': closeLightbox()` | **114–116** |

**Extrait overlay uniquement** (`scripts/utils/lightbox.js` — **lignes 174–179**) :

```javascript
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});
```

**Ce que ça fait :** Ce bloc gère **uniquement** le clic sur l’overlay (la div lightbox elle‑même, pas sur le contenu ni sur le bouton). Si le clic est sur la zone sombre autour, `e.target === lightbox` est vrai et on appelle closeLightbox. Le bouton fermer et Escape sont gérés ailleurs (l. 143 et 114–116).

---

**3. Retour du focus à la fermeture**  
- **Fichier :** `scripts/utils/lightbox.js` — **lignes 46–52**

```javascript
// Remettre le focus sur le média qui a ouvert la lightbox
const mediaCards = document.querySelectorAll('.media-card');
if (mediaCards[currentMediaIndex]) {
    const link = mediaCards[currentMediaIndex].querySelector('.media-link');
    if (link) link.focus();
}
```

**Ce que ça fait :** À la fermeture, le focus revient sur le lien du média qu’on regardait, pour que l’utilisateur au clavier retrouve sa position.

---

### Notes à ajouter (texte à dire pour la diapo 8)

> **Navigation :** On peut aller au média précédent ou suivant avec les boutons dans la lightbox, ou avec les flèches gauche et droite du clavier. C’est géré dans handleLightboxKeydown : ArrowLeft appelle previousMedia, ArrowRight appelle nextMedia ; les deux mettent à jour currentMediaIndex et rappellent updateLightboxContent pour afficher le bon média.
>
> **Fermeture :** Trois façons de fermer : clic sur l’overlay — on vérifie que le clic est sur la div lightbox avec e.target === lightbox —, clic sur le bouton fermer, ou touche Escape dans handleLightboxKeydown qui appelle closeLightbox.
>
> **Retour du focus :** Dans closeLightbox, après avoir masqué la lightbox et retiré l’écouteur clavier, on remet le focus sur le lien .media-link de la carte correspondant à currentMediaIndex. Comme ça l’utilisateur au clavier retrouve sa position dans la galerie.

---

## Diapo 9 – Secteur de tri des médias

**À vérifier sur la diapo :**  
Select « Trier par », label + aria-labelledby, options (Popularité, Date, Titre), événement change et ré-affichage. Mettre **1 ou 2 captures** des extraits ci‑dessous.

### Captures à mettre sur la diapo (fichier + lignes)

**1. HTML – Label, select et options (accessibilité)**  
- **Fichier :** `photographer.html` — **lignes 28–35**

```html
<div class="media-sorter">
  <label for="sort-select" class="sort-label" id="sort-label">Trier par</label>
  <select id="sort-select" class="sort-select" aria-labelledby="sort-label">
    <option value="popularity">Popularité</option>
    <option value="date">Date</option>
    <option value="title">Titre</option>
  </select>
</div>
```

**Ce que ça fait :** Le `<label for="sort-select">` associe le texte « Trier par » au select pour le clic et pour le lecteur d’écran. `aria-labelledby="sort-label"` renforce le nom accessible du select (pointe vers l’id du label). Les trois options correspondent aux valeurs envoyées au JS : `popularity`, `date`, `title`.

---

**2. Fonction sortMedia (tri selon le critère)**  
- **Fichier :** `scripts/pages/photographer.js` — **lignes 80–99**

```javascript
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
```

**Ce que ça fait :** On copie le tableau avec le spread pour ne pas modifier l’original. Selon `sortBy` : **popularity** = tri par likes décroissant ; **date** = tri par date décroissante (plus récent d’abord) ; **title** = tri alphabétique avec `localeCompare`. La fonction retourne le tableau trié sans toucher aux données chargées.

---

**3. Événement change – ré-affichage et mise à jour des likes**  
- **Fichier :** `scripts/pages/photographer.js` — **lignes 169–177**

```javascript
// Gestion du tri
const sortSelect = document.getElementById("sort-select");
if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        const sorted = sortMedia(photographerMedia, e.target.value);
        displayMedia(sorted);
        updateTotalLikes();
    });
}
```

**Ce que ça fait :** Au changement de valeur du select (`change`), on récupère la valeur choisie (`e.target.value` = `"popularity"`, `"date"` ou `"title"`). On appelle `sortMedia` avec les médias du photographe (déjà en mémoire) et ce critère, puis `displayMedia(sorted)` pour réafficher la galerie dans le nouvel ordre, et `updateTotalLikes()` pour mettre à jour le total affiché dans le footer. Tout se fait en JS, sans rechargement.

---

### Notes à ajouter (texte à dire pour la diapo 9)

> **HTML et accessibilité :** Le secteur de tri est dans photographer.html : un label « Trier par » avec `for="sort-select"` et un select avec `aria-labelledby="sort-label"`, pour que le lecteur d’écran annonce correctement le champ. Les options sont Popularité, Date et Titre, avec les valeurs popularity, date et title.
>
> **Fonction sortMedia :** Elle prend le tableau des médias et le critère de tri. Elle travaille sur une copie du tableau. Pour la popularité on trie par likes décroissant, pour la date par date décroissante, pour le titre avec localeCompare. Elle retourne le tableau trié.
>
> **Événement change :** Dans init, on attache un écouteur `change` sur le select. À chaque changement, on appelle sortMedia avec les médias du photographe et la valeur du select, puis displayMedia pour réafficher la galerie et updateTotalLikes pour le total dans le footer. Les données viennent du fetch initial, on ne recharge pas la page.

---

## Diapo 10 – Templates – Rôle

**À vérifier sur la diapo :**  
Factories photographerTemplate et mediaTemplate, entrée données → sortie méthode (getUserCardDOM, getMediaCardDOM), séparation données/rendu. Mettre **1 ou 2 captures** des extraits ci‑dessous.

### Captures à mettre sur la diapo (fichier + lignes)

**1. photographerTemplate – factory et retour**  
- **Fichier :** `scripts/templates/photographer.js` — **lignes 1–8 et 52–55**

```javascript
/* exported photographerTemplate */
function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        // ... construction du DOM (lien, img, h2, paragraphes) ...
        return (article);
    }
    return { name, picture, getUserCardDOM };
}
```

**Ce que ça fait :** En **entrée** : un objet `data` (un photographe du JSON). On déstructure les champs utiles. En **sortie** : un objet qui expose `getUserCardDOM`. Cette méthode crée l’`article`, le lien, l’image, le h2, les paragraphes (lieu, tagline, prix), assemble le tout et **retourne** l’élément DOM. Les données et le rendu sont séparés : les données viennent du paramètre, le DOM est construit à l’appel de `getUserCardDOM()`.

---

**2. mediaTemplate – même principe**  
- **Fichier :** `scripts/templates/media.js` — **lignes 23–29 et 29–36 (début de getMediaCardDOM)**

```javascript
function mediaTemplate(data) {
    const { id, photographerId, title, image, video, likes, date } = data;

    const photographerFolder = photographerFolderMap[photographerId] || photographerId;

    function getMediaCardDOM() {
        const article = document.createElement('article');
        article.className = "media-card";
        article.setAttribute("role", "listitem");
        // ... lien lightbox, image ou vidéo, titre, likes, bouton like ...
        return article;
    }
    return { getMediaCardDOM };  // ou l'objet exposé par le template
}
```

**Ce que ça fait :** Même logique : **entrée** = un objet média (id, title, image ou video, likes, etc.). La factory retourne un objet avec une méthode `getMediaCardDOM()` qui crée et retourne l’élément DOM de la carte (article, lien, image/vidéo, titre, likes). Séparation données / rendu, code réutilisable pour chaque média.

---

**3. Utilisation (page d’accueil)**  
- **Fichier :** `scripts/pages/index.js` — **lignes 18–22**

```javascript
photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
});
```

**Ce que ça fait :** Pour chaque photographe, on appelle le **template** avec les données → on obtient un « modèle » qui expose `getUserCardDOM`. On appelle cette méthode pour obtenir l’élément DOM, puis on l’ajoute à la section. Données (photographer) → template → DOM → insertion. Même idée côté page photographe avec `mediaTemplate(media)` et `getMediaCardDOM()`.

---

### Notes à ajouter (texte à dire pour la diapo 10)

> **Pattern Factory :** J’utilise deux templates : photographerTemplate et mediaTemplate. Une **entrée** = un objet de données (un photographe ou un média). Une **sortie** = un objet qui a une méthode, par exemple getUserCardDOM. Donc : tu donnes les données, tu reçois un objet avec une méthode qui sait construire le DOM.
>
> **Séparation données / rendu :** Les données brutes restent d’un côté (le JSON), le rendu de l’autre. Le template reçoit les données et la méthode getUserCardDOM (ou getMediaCardDOM) construit l’article, le lien, l’image, les textes, puis retourne l’élément. La page n’a pas à savoir comment la carte est faite : elle appelle le template et insère le résultat. Code modulaire et réutilisable.
>
> **Utilisation :** Comme sur la diapo : dans displayData on fait un forEach sur les photographes. Pour chacun on appelle photographerTemplate(photographer), on récupère le modèle, puis .getUserCardDOM() pour avoir l’élément DOM, et appendChild pour l’ajouter dans la div photographer-section. Même principe pour les médias avec mediaTemplate et getMediaCardDOM.

---

## Diapo 11 – Récupération des données

**À vérifier sur la diapo :**  
Une seule source (fetch photographers.json), données photographers + media, ID dans l’URL (getPhotographerId), find + filter pour la page photographe. Mettre **1 ou 2 captures** des extraits ci‑dessous.

### Captures à mettre sur la diapo (fichier + lignes)

**1. Fetch – une seule source de données**  
- **Fichier :** `scripts/pages/photographer.js` — **lignes 14–26** (identique dans `index.js` lignes 2–13)

```javascript
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
```

**Ce que ça fait :** Un seul `fetch` sur le fichier JSON. Le JSON contient deux tableaux : **photographers** (liste des photographes) et **media** (tous les médias). On retourne l’objet tel quel. En cas d’erreur (réseau ou HTTP), on retourne des tableaux vides pour éviter un plantage. Page d’accueil et page photographe utilisent la même fonction.

---

**2. ID du photographe depuis l’URL**  
- **Fichier :** `scripts/pages/photographer.js` — **lignes 1–6**

```javascript
// Récupération de l'ID du photographe depuis l'URL
function getPhotographerId() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'));
}
```

**Ce que ça fait :** L’URL de la page photographe est du type `photographer.html?id=82`. `window.location.search` donne `?id=82`. `URLSearchParams` permet de lire le paramètre `id`. On le convertit en nombre avec `parseInt` pour le comparer aux `id` du JSON. Si l’URL n’a pas d’`id`, `params.get('id')` vaut `null` et `parseInt(null)` donne `NaN` (géré dans init).

---

**3. Init – find photographe, filter médias, affichage**  
- **Fichier :** `scripts/pages/photographer.js` — **lignes 135–166**

```javascript
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

    currentPhotographer = photographer;

    // Filtrer les médias du photographe
    const photographerMedia = media.filter(m => m.photographerId === photographerId);

    // Afficher le header
    displayPhotographerHeader(photographer);
    displayStickyFooter(photographer);

    // Trier et afficher les médias
    const sortedMedia = sortMedia(photographerMedia, 'popularity');
    displayMedia(sortedMedia);
    updateTotalLikes();
    // + écouteur change sur le select de tri
}
```

**Ce que ça fait :** On récupère l’ID dans l’URL. On charge toutes les données avec `getPhotographers()`. On **trouve** le photographe dont l’`id` correspond avec `find()`. On **filtre** les médias pour ne garder que ceux dont `photographerId` est égal à cet ID. Ensuite on affiche le header, le footer, la galerie (tri par popularité par défaut) et on met à jour le total des likes. Les données sont chargées une fois ; le tri réutilise le tableau `photographerMedia` en mémoire.

---

### Notes à ajouter (texte à dire pour la diapo 11)

> **Une seule source :** Les données viennent d’un seul fichier : data/photographers.json. La fonction getPhotographers fait un fetch dessus et retourne l’objet parsé, qui contient les tableaux photographers et media. La page d’accueil et la page photographe utilisent la même fonction.
>
> **ID dans l’URL :** Sur la page photographe, l’URL contient un paramètre id (par exemple photographer.html?id=82). getPhotographerId utilise URLSearchParams pour lire ce paramètre et le convertir en nombre avec parseInt. C’est cet ID qui permet de savoir quel photographe afficher.
>
> **Find et filter :** Dans init, après avoir chargé les données, on cherche le photographe avec find(p => p.id === photographerId), puis on filtre les médias avec filter(m => m.photographerId === photographerId). Comme ça on n’affiche que le bon photographe et ses médias. Tout se fait en mémoire après le fetch initial, sans rechargement.

---

## Diapo 12 – Stack et qualité du code

**À vérifier sur la diapo :**  
HTML/CSS/JS vanilla, structure scripts (pages, templates, utils), ESLint et npm run lint. Optionnel : arborescence ou .eslintrc.json.

**Notes à ajouter :**

> Le projet est en HTML, CSS et JavaScript vanilla, sans framework. La partie scripts est organisée en dossiers : pages pour index et photographe, templates pour les factories de cartes, et utils pour la lightbox, le formulaire de contact et l’accessibilité. ESLint est configuré et je lance npm run lint pour vérifier la base de code. Ça garantit un style cohérent et moins d’erreurs.

---

## Diapo 13 – Conclusion

**À vérifier sur la diapo :**  
Synthèse (accessible, code structuré), remerciements, questions.

**Notes à ajouter :**

> Pour conclure : le livrable respecte les objectifs d’accessibilité au clavier et avec ARIA, et le code est structuré avec les templates, le fetch des données et le tri. Merci de votre attention. Je suis à votre disposition pour vos questions.

---

## Récapitulatif des améliorations à vérifier sur votre .pptx

| Élément | À faire |
|--------|---------|
| **Couleurs** | Titres #901C1C, accents #DB8876, fond #FAFAFA ou blanc, texte #525252 |
| **Slide 1** | Titre + sous-titre + votre nom |
| **Slide 3** | Démonstration : capture d’écran ou lien, optionnel liste (accueil, galerie, lightbox, tri, formulaire) |
| **Slides 4–8** | Extraits de code selon les diapos (skip link, ARIA, focus trap, lightbox ouverture/contenu, lightbox navigation/fermeture, tri, etc.) |
| **Slides 9–11** | Tri, templates, récupération des données : un extrait par slide si possible |
| **Slide 12** | Arborescence scripts ou config ESLint |
| **Slide 13** | Conclusion |
| **Texte** | 3–5 points par slide, pas de blocs de paragraphes |
| **Notes** | Copier chaque bloc « Notes à ajouter » dans les notes du présentateur de la diapo correspondante |

Une fois les notes ajoutées, vous pouvez vous entraîner en lisant à voix haute chaque bloc pour caler le débit sur les 15 minutes de soutenance.
