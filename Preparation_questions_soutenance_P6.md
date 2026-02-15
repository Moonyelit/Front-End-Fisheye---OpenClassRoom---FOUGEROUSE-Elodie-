# Préparation aux questions – Soutenance P6 Fisheye

Document mémo pour répondre aux questions de l’évaluateur (rôle Amanda) pendant la soutenance.  
Pour chaque thème : réponses + **où trouver le code** (fichier et numéros de lignes).

---

## 1. Accessibilité

### Pourquoi un lien d’évitement ?
- Permet aux utilisateurs au clavier (et aux lecteurs d’écran) d’**éviter de tabuler** tout le header à chaque visite.
- Au premier Tab, le lien « Passer au contenu » apparaît ; en activant, le focus va directement au `<main id="main">`.
- Bonne pratique WCAG pour les sites avec blocs de navigation répétitifs.

**Où trouver le code :**
- **HTML (skip link)** : `index.html` lignes **14–15** (idem dans `photographer.html` 14–15).
- **CSS (apparence au focus)** : `css/base/accessibility.css` lignes **8–26** (`.skip-link`, `.skip-link:focus`).

---

### Pourquoi un focus trap dans la modale / lightbox ?
- Quand un dialogue est ouvert, le focus ne doit **pas** aller aux éléments en arrière-plan (conformité avec les pratiques WCAG pour les dialogs).
- Le focus reste à l’intérieur de la modale/lightbox : Tab et Shift+Tab font boucler entre les éléments focusables (boutons, liens, champs).
- Implémentation : écouteur `keydown` sur Tab, détection du premier/dernier élément focusable, `preventDefault()` + `focus()` sur l’élément opposé.

**Où trouver le code :**
- **Modale contact (focus trap)** : `scripts/utils/contactForm.js` lignes **87–104** (`modal.addEventListener('keydown', ...)`, firstElement, lastElement, preventDefault, focus).
- **Lightbox (focus trap)** : `scripts/utils/lightbox.js` lignes **181–196** (même logique sur la lightbox).

---

### Pourquoi fermer avec Escape ?
- **Convention utilisateur** : la touche Escape ferme les fenêtres modales (dialogs) dans la plupart des applications et sites.
- **Accessibilité clavier** : permet de fermer sans chercher le bouton « Fermer » à la souris.

**Où trouver le code :**
- **Modale** : `scripts/utils/contactForm.js` lignes **208–216** (`document.addEventListener('keydown'`, `e.key === 'Escape'`, `closeModal()`).
- **Lightbox** : `scripts/utils/lightbox.js` lignes **111–123** (`handleLightboxKeydown`, case `'Escape'` : `closeLightbox()`).

---

### Où sont les `aria-label` et pourquoi ?
- **Boutons sans texte visible** : « Close dialog », « Close Contact form », « Send », « likes » — le lecteur d’écran annonce le rôle et l’action.
- **Liens lightbox** : « Previous image », « Next image » — sens de la navigation.
- **Liens médias** : « [titre], closeup view » — contexte pour ouvrir la lightbox.
- **Icônes** : SVG avec `aria-hidden="true"` et parent avec `aria-label` pour éviter la redondance.

**Où trouver le code :**
- **Lightbox** : `scripts/utils/lightbox.js` lignes **142** (Close dialog), **149** (Previous image), **164** (Next image), **137** (aria-label du dialog « Image closeup view »).
- **Modale contact** : `scripts/utils/contactForm.js` lignes **27** (Close Contact form), **55** (Send).
- **Carte média** : `scripts/templates/media.js` ligne **43** (`aria-label` du lien lightbox), **104** (bouton likes).
- **Footer likes** : `scripts/pages/photographer.js` ligne **127** (`aria-label="likes"` sur l’icône).

---

### Préférences utilisateur
- **Fichier :** `css/base/accessibility.css`
- `@media (prefers-reduced-motion: reduce)` : animations et transitions réduites à 0.01ms pour les utilisateurs qui demandent moins de mouvement.
- `@media (prefers-contrast: high)` : outline au focus avec `currentColor` pour respecter un contraste élevé.

**Où trouver le code :**
- **Réduction des animations** : `css/base/accessibility.css` lignes **94–103** (`prefers-reduced-motion`).
- **Contraste élevé** : `css/base/accessibility.css` lignes **78–89** (`prefers-contrast: high`).
- **Focus visible (base)** : `css/base/accessibility.css` lignes **31–45** (`:focus-visible`).

---

## 2. Lightbox

- **Fichier principal :** `scripts/utils/lightbox.js`

### Création et ouverture
- Création au `DOMContentLoaded` via `createLightboxHTML()` : un seul `<div id="lightbox">` est injecté dans le body.
- Ouverture : `openLightbox(mediaList, index)` — enregistre la liste et l’index, affiche la lightbox, met à jour le contenu, place le focus sur le bouton fermer, ajoute l’écouteur clavier (Escape, flèches).

**Où trouver le code :**
- **Création du HTML** : `scripts/utils/lightbox.js` lignes **126–172** (`createLightboxHTML`), appel ligne **201** (`DOMContentLoaded`).
- **Ouverture** : `scripts/utils/lightbox.js` lignes **8–26** (`openLightbox`).
- **ARIA (role, aria-modal, aria-label)** : lignes **134–137**.

### Mise à jour du contenu
- `updateLightboxContent()` : lit `mediaList[currentMediaIndex]`, affiche image ou vidéo (avec `photographerFolderMap` et `normalizeFileName` pour les chemins), met à jour le titre dans le figcaption.

**Où trouver le code :**
- **Mise à jour** : `scripts/utils/lightbox.js` lignes **65–109** (`updateLightboxContent`).
- **Mapping dossiers** : `scripts/templates/media.js` lignes **4–9** (`photographerFolderMap`), utilisé dans lightbox pour les chemins.

### Gestion du focus
- À l’ouverture : focus sur le bouton `.lightbox-close`.
- À la fermeture : focus remis sur le lien `.media-link` du média qui a ouvert la lightbox (pour reprendre la navigation au clavier au bon endroit).

**Où trouver le code :**
- **Focus à l’ouverture** : `scripts/utils/lightbox.js` lignes **20–22** (closeBtn.focus()).
- **Retour du focus à la fermeture** : `scripts/utils/lightbox.js` lignes **46–51** (mediaCards[currentMediaIndex], link.focus()).

### Raccourcis clavier
- **Escape** : fermer la lightbox.
- **Flèche gauche** : média précédent.
- **Flèche droite** : média suivant.
- **Tab** : focus trap (reste dans la lightbox).

**Où trouver le code :**
- **Gestion clavier** : `scripts/utils/lightbox.js` lignes **111–123** (`handleLightboxKeydown`), **54–62** (`previousMedia`), **59–62** (`nextMedia`).
- **Focus trap** : `scripts/utils/lightbox.js` lignes **181–196**.

---

## 3. Tri

### Logique (JavaScript)
- **Fichier :** `scripts/pages/photographer.js`
- **Fonction :** `sortMedia(mediaArray, sortBy)` — prend la liste des médias et la clé de tri (`'popularity'`, `'date'`, `'title'`), retourne une copie triée (sans modifier l’original).
- **Popularité** : `sort((a, b) => b.likes - a.likes)`.
- **Date** : `sort((a, b) => new Date(b.date) - new Date(a.date))`.
- **Titre** : `sort((a, b) => a.title.localeCompare(b.title))`.
- Écouteur `change` sur `#sort-select` : appelle `sortMedia(photographerMedia, e.target.value)`, puis `displayMedia(sorted)` et `updateTotalLikes()`.

**Où trouver le code :**
- **Fonction sortMedia** : `scripts/pages/photographer.js` lignes **80–99**.
- **Écouteur change** : `scripts/pages/photographer.js` lignes **172–178** (sortSelect.addEventListener('change', ...)).

### HTML (accessibilité)
- **Fichier :** `photographer.html`
- `<label for="sort-select" id="sort-label">Trier par</label>` et `<select id="sort-select" aria-labelledby="sort-label">` pour lier le label au select et annoncer correctement au lecteur d’écran.

**Où trouver le code :**
- **Label + select** : `photographer.html` lignes **28–34**.

---

## 4. Templates

### Rôle des templates
- **Factories** : une fonction par type de carte (photographe, média). Elles reçoivent les **données** (objet) et retournent un **objet** avec une méthode qui **crée le DOM** (élément(s) à insérer dans la page).
- Intérêt : réutilisation, séparation données / rendu, lisibilité du code des pages (les pages appellent le template et font un `appendChild`).

### photographerTemplate
- **Fichier :** `scripts/templates/photographer.js`
- `photographerTemplate(data)` — reçoit `{ name, id, city, country, tagline, price, portrait }`.
- Retourne `{ name, picture, getUserCardDOM }`.
- `getUserCardDOM()` crée un `<article class="card-home">` avec : lien (href vers `photographer.html?id=...`), image (portrait), h2 (nom), paragraphes (lieu, tagline, prix). Utilisé sur la page d’accueil.

**Où trouver le code :**
- **Signature et retour** : `scripts/templates/photographer.js` lignes **1–5** et **52–55** (return { name, picture, getUserCardDOM }).
- **Construction du DOM** : `scripts/templates/photographer.js` lignes **7–52** (getUserCardDOM : article, link, img, h2, location, tagline, price).
- **Utilisation** : `scripts/pages/index.js` lignes **18–22** (forEach, photographerTemplate(photographer), getUserCardDOM(), appendChild).

### mediaTemplate
- **Fichier :** `scripts/templates/media.js`
- `mediaTemplate(data)` — reçoit les champs du média (id, photographerId, title, image, video, likes, date, etc.).
- Retourne `{ getMediaCardDOM }`.
- `getMediaCardDOM()` crée un `<article class="media-card">` avec : lien (ouvre la lightbox), image ou vidéo, bloc infos (titre, likes, bouton like). Le bouton like appelle `updateTotalLikes()` (définie dans `photographer.js`, exposée en global pour ce besoin).

**Où trouver le code :**
- **Signature et getMediaCardDOM** : `scripts/templates/media.js` lignes **23–29** (mediaTemplate, getMediaCardDOM), **29–135** (création article, link, image/vidéo, infos, bouton like).
- **Appel updateTotalLikes** : `scripts/templates/media.js` ligne **116** (dans le clic sur le bouton like).
- **Utilisation** : `scripts/pages/photographer.js` lignes **59–76** (displayMedia : mediaTemplate(media), getMediaCardDOM(), événement clic lightbox, appendChild).

---

## 5. Données

### Source
- **Fichier :** `data/photographers.json`
- Contient deux tableaux : `photographers` (id, name, portrait, city, country, tagline, price, etc.) et `media` (id, photographerId, title, image ou video, likes, date, etc.).

### Récupération
- **Fonction :** `getPhotographers()` (dans `scripts/pages/index.js` et `scripts/pages/photographer.js`).
- `fetch("data/photographers.json")` → `response.json()` → retourne `{ photographers, media }`.
- Gestion d’erreur : en cas d’échec, retour de `{ photographers: [], media: [] }` (et éventuellement `console.error`).

**Où trouver le code :**
- **getPhotographers (page accueil)** : `scripts/pages/index.js` lignes **2–14**.
- **getPhotographers (page photographe)** : `scripts/pages/photographer.js` lignes **15–27**.
- **Structure JSON** : ouvrir `data/photographers.json` (objets photographers et media).

### Page photographe
- **ID** : récupéré via `URLSearchParams(window.location.search).get('id')` (fonction `getPhotographerId()`).
- **Photographe** : `photographers.find(p => p.id === photographerId)`.
- **Médias** : `media.filter(m => m.photographerId === photographerId)`.
- Ces données sont ensuite passées aux templates et à la lightbox.

**Où trouver le code :**
- **getPhotographerId** : `scripts/pages/photographer.js` lignes **2–5**.
- **init (récupération, find, filter, affichage)** : `scripts/pages/photographer.js` lignes **136–179** (getPhotographers, find photographer, filter media, displayPhotographerHeader, displayStickyFooter, sortMedia, displayMedia, updateTotalLikes, écouteur tri).

---

## 6. Organisation du code

- **`scripts/pages/`** : logique de page — `index.js` (init, affichage des cartes photographes), `photographer.js` (init, header, galerie, tri, likes, appels aux templates et à la lightbox).
- **`scripts/templates/`** : construction du DOM des cartes — `photographer.js` (carte photographe), `media.js` (carte média).
- **`scripts/utils/`** : lightbox (`lightbox.js`), modale de contact (`contactForm.js`), loader (`loader.js`).

### Ordre de chargement des scripts (HTML)
- Templates avant pages (les pages appellent les fonctions des templates).
- Utils chargés selon besoin : lightbox et contactForm sur la page photographe ; loader sur les deux pages.

**Où trouver le code :**
- **Page d’accueil** : `index.html` lignes **27–30** (loader, template photographer, page index).
- **Page photographe** : `photographer.html` lignes **49–55** (loader, template photographer, template media, lightbox, page photographer, contactForm).

---

## 7. Linter

- **Configuration :** `.eslintrc.json` à la racine du projet (dossier Front-End-Fisheye---OpenClassRoom---FOUGEROUSE-Elodie-).
- **Commande :** `npm run lint` (depuis le dossier du projet ou depuis la racine du repo avec le script défini dans le `package.json` parent).
- **Règles :** `eslint:recommended`, environnement `browser` et `es2021`, règles optionnelles (ex. `no-unused-vars` en warning, `no-console` off).
- **Résultat attendu :** 0 erreur, 0 avertissement pour une base de code prête à la livraison.

**Où trouver le code :**
- **Config ESLint** : `.eslintrc.json` (racine du dossier Fisheye) — contenu complet du fichier.
- **Scripts npm** : `package.json` dans le dossier Fisheye, clé `"scripts"` : `"lint": "eslint scripts --ext .js"`, `"lint:fix": "eslint scripts --ext .js --fix"`.
