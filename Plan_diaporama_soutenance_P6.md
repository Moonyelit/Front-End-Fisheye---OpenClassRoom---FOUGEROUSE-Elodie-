# Plan diaporama soutenance P6 — À utiliser avec Gemini pour Google Slides

**Si Gemini refuse ou ne peut pas t’aider :** tout le texte des 12 slides est déjà dans ce document (section « Structure du diaporama » ci-dessous). Tu peux copier-coller directement chaque bloc « Texte à mettre dans Google Slides » dans tes slides ; les couleurs sont dans le tableau plus bas.

---

## Couleurs du projet (à donner à Gemini / Google Slides pour cohérence visuelle)

Utilise ces couleurs dans le diaporama pour rester cohérent avec le site Fisheye (définies dans `css/base/variable.css`) :

| Usage dans Google Slides | Couleur | Code hex |
|--------------------------|---------|----------|
| **Principal (titres, accents, boutons)** | Rouge bordeaux | `#901C1C` |
| **Secondaire (fond de blocs, texte sur fond sombre)** | Blanc | `#FFFFFF` |
| **Tertiaire (surlignage, focus, CTA)** | Saumon / terracotta | `#DB8876` |
| **Fond de page** | Gris très clair | `#FAFAFA` |
| **Texte courant** | Gris | `#525252` |
| **Texte sur fond rouge** | Blanc | `#FFFFFF` |

**Consigne pour Gemini :** « Pour la charte graphique du diaporama Google Slides, utilise principalement le rouge bordeaux #901C1C pour les titres et éléments importants, le saumon #DB8876 pour les accents ou surlignages, le fond #FAFAFA ou blanc #FFFFFF, et le gris #525252 pour le texte secondaire. Style sobre et professionnel, cohérent avec un site de photographes. »

---

## Prompt à copier-coller dans Gemini

« J’ai besoin que tu rédiges le **texte** d’un diaporama de soutenance (10 à 12 slides). Je copierai ensuite ce texte moi-même dans Google Slides.

**Contexte :** soutenance orale de 15 minutes sur un projet de site web accessible (plateforme de photographes “Fisheye”). Le public attend un exposé clair et professionnel.

**Ce que je veux :** pour chaque slide, écris uniquement :
- le **titre** de la slide ;
- 3 à 5 **points à puces** ou une courte phrase (ce que je dois afficher à l’écran, pas un script oral).

**Thèmes à couvrir dans l’ordre :**
1. Slide titre (projet P6 Fisheye, site accessible pour photographes).
2. Contexte et objectifs (livrable : page d’accueil + page photographe ; objectifs : accessibilité, code maintenable, linter).
3. Accessibilité – navigation clavier (lien d’évitement, focus visible, Tab).
4. Accessibilité – ARIA et sémantique (landmarks, aria-label, aria-live, formulaire).
5. Modale et lightbox – gestion du focus (role dialog, focus trap, Escape, retour du focus).
6. Lightbox – fonctionnement (ouverture, contenu, navigation clavier, fermeture).
7. Secteur de tri (select “Trier par”, options, événement change).
8. Templates – rôle (factories, getUserCardDOM / getMediaCardDOM, séparation données / rendu).
9. Templates – exemples (carte photographe, carte média).
10. Récupération des données (fetch JSON, photographers + media, filtrage par ID).
11. Stack et qualité (HTML/CSS/JS vanilla, structure scripts, ESLint).
12. Conclusion (synthèse, remerciements, questions).

**Style :** sobre, professionnel, peu de texte par slide. Tu ne fais que rédiger le contenu des slides, sans créer de fichier ni d’outil externe. »

---

## Structure du diaporama (10–12 diapos) — Texte exact + morceaux de code

---

### Diapo 1 — Titre + prénom

**Texte à mettre dans Google Slides :**
- **Titre :** Projet P6 – Fisheye
- **Sous-titre :** Site accessible pour une plateforme de photographes
- [Votre prénom / nom]

**Image de code dans Google Slides :** Aucune.

---

### Diapo 2 — Contexte et objectifs

**Texte à mettre dans Google Slides :**
- **Titre :** Contexte et objectifs
- Livrable : page d’accueil (liste des photographes) + page photographe (galerie, tri, contact)
- Objectifs : accessibilité clavier + lecteur d’écran, code maintenable, linter
- Projet OpenClassroom – Parcours Front-end

**Image de code dans Google Slides :** Aucune (ou capture du site : accueil + page photographe).

---

### Diapo 3 — Accessibilité – navigation clavier

**Texte à mettre dans Google Slides :**
- **Titre :** Accessibilité – Navigation au clavier
- Lien d’évitement « Passer au contenu » : premier Tab, puis aller au contenu principal
- Focus visible avec `:focus-visible` (outline rouge bordeaux)
- Tous les éléments interactifs accessibles au Tab (sans souris)

**Morceau de code à montrer (où / pourquoi) :**
- **Skip link (HTML)** : `index.html` lignes 14–15. Permet d’éviter de tabuler tout le header.
- **Focus visible (CSS)** : `css/base/accessibility.css` lignes 31–38. Outline au focus pour voir où on est au clavier.

**À mettre dans Google Slides :** Une capture ou un bloc « code » avec par exemple :
```html
<a href="#main" class="skip-link">Passer au contenu</a>
```
et/ou :
```css
*:focus-visible {
    outline: 3px solid var(--color-primary);
    outline-offset: 3px;
}
```

---

### Diapo 4 — Accessibilité – ARIA et sémantique

**Texte à mettre dans Google Slides :**
- **Titre :** Accessibilité – ARIA et sémantique
- Landmarks : `role="banner"` (header), `role="main"` (contenu principal)
- `aria-label` sur boutons et liens sans texte visible (lecteur d’écran)
- `aria-live="polite"` pour les mises à jour dynamiques (likes)
- Formulaire de contact : labels, `aria-labelledby`, champs requis

**Morceau de code à montrer (où / pourquoi) :**
- **Landmarks** : `index.html` lignes 17 et 23. Structure sémantique pour le lecteur d’écran.
- **aria-label** : ex. `scripts/utils/lightbox.js` ligne 142 `aria-label="Close dialog"` — annonce du bouton fermer.

**À mettre dans Google Slides :** Un extrait HTML (index.html 17–24) avec `role="banner"` et `role="main"`, ou un extrait lightbox avec `aria-label="Close dialog"` et `aria-label="Previous image"` / `"Next image"`.

---

### Diapo 5 — Modale et lightbox – focus

**Texte à mettre dans Google Slides :**
- **Titre :** Modale et lightbox – Gestion du focus
- `role="dialog"` et `aria-modal="true"` pour annoncer la fenêtre modale
- Focus trap : Tab reste dans la fenêtre (pas de focus en arrière-plan)
- Touche Escape pour fermer
- À la fermeture : retour du focus sur l’élément qui a ouvert (bouton ou lien)

**Morceau de code à montrer (où / pourquoi) :**
- **ARIA dialog** : `scripts/utils/contactForm.js` lignes 15–18 (modale) ; `scripts/utils/lightbox.js` lignes 134–137 (lightbox). Annonce du rôle pour le lecteur d’écran.
- **Focus trap** : `scripts/utils/contactForm.js` lignes 87–104. Détection Tab / Shift+Tab, focus sur premier/dernier élément.
- **Retour du focus (lightbox)** : `scripts/utils/lightbox.js` lignes 46–51. Remet le focus sur le lien du média à la fermeture.

**À mettre dans Google Slides :** Un extrait du focus trap (contactForm.js 88–102) : `keydown` Tab, `firstElement` / `lastElement`, `preventDefault()` et `focus()`.

---

### Diapo 6 — Lightbox – fonctionnement

**Texte à mettre dans Google Slides :**
- **Titre :** Lightbox – Fonctionnement
- Ouverture au clic (ou au clavier) sur un média de la galerie
- Contenu mis à jour : image ou vidéo + titre (figcaption)
- Navigation : Précédent / Suivant (boutons + flèches clavier)
- Fermeture : overlay, bouton fermer, ou touche Escape

**Morceau de code à montrer (où / pourquoi) :**
- **Ouverture + focus** : `scripts/utils/lightbox.js` lignes 8–26. `openLightbox(mediaData, index)`, mise à jour du contenu, focus sur le bouton fermer.
- **Raccourcis clavier** : `scripts/utils/lightbox.js` lignes 111–123. `handleLightboxKeydown` : Escape, ArrowLeft, ArrowRight.
- **Structure lightbox (role, aria)** : `scripts/utils/lightbox.js` lignes 131–138 et 139–146 (bouton close, liens prev/next avec aria-label).

**À mettre dans Google Slides :** Extraits courts : `openLightbox` (l. 8–22) et `handleLightboxKeydown` (l. 111–123) pour montrer ouverture + clavier.

---

### Diapo 7 — Secteur de tri

**Texte à mettre dans Google Slides :**
- **Titre :** Secteur de tri des médias
- `<select>` « Trier par » avec `<label for="sort-select">` et `aria-labelledby` (accessibilité)
- Options : Popularité, Date, Titre
- Au `change` : re-tri de la liste puis ré-affichage de la galerie et mise à jour du total de likes

**Morceau de code à montrer (où / pourquoi) :**
- **HTML (label + select)** : `photographer.html` lignes 28–34. Lien explicite label / select pour le lecteur d’écran.
- **Fonction de tri** : `scripts/pages/photographer.js` lignes 80–99. `sortMedia(mediaArray, sortBy)` : popularity (likes), date, title.
- **Écouteur change** : `scripts/pages/photographer.js` lignes 172–178. Appel à `sortMedia`, puis `displayMedia` et `updateTotalLikes`.

**À mettre dans Google Slides :** Extraits : (1) HTML tri (photographer.html 28–34), (2) `sortMedia` (photographer.js 81–98), (3) écouteur `change` (l. 174–177).

---

### Diapo 8 — Templates – rôle

**Texte à mettre dans Google Slides :**
- **Titre :** Templates – Rôle
- Factories : `photographerTemplate`, `mediaTemplate`
- Entrée : données (objet) → Sortie : objet avec une méthode (ex. `getUserCardDOM()`, `getMediaCardDOM()`)
- Cette méthode crée et retourne les éléments DOM (article, lien, image, etc.)
- Séparation données / rendu, code réutilisable

**Morceau de code à montrer (où / pourquoi) :**
- **Signature + retour** : `scripts/templates/photographer.js` lignes 1–7 et 52–54. `photographerTemplate(data)` → `getUserCardDOM()` qui retourne l’article.
- **Même idée** : `scripts/templates/media.js` lignes 23–29. `mediaTemplate(data)` → `getMediaCardDOM()`.

**À mettre dans Google Slides :** Extrait photographerTemplate : début de la fonction + `getUserCardDOM()` et `return (article)` (photographer.js templates, lignes 2–7 et 52–54).

---

### Diapo 9 — Templates – exemples

**Texte à mettre dans Google Slides :**
- **Titre :** Templates – Exemples
- Page d’accueil : une carte par photographe (image, nom, lieu, tagline, prix) — `getUserCardDOM()`
- Page photographe : une carte média (lien lightbox, image/vidéo, titre, likes, bouton like) — `getMediaCardDOM()`
- Même logique : données → template → DOM ; rendus différents selon le type de carte

**Morceau de code à montrer (où / pourquoi) :**
- **Utilisation page accueil** : `scripts/pages/index.js` lignes 18–22. `photographerTemplate(photographer)` puis `getUserCardDOM()` et `appendChild`.
- **Structure carte photographe** : `scripts/templates/photographer.js` lignes 7–30 (création lien, img, h2, paragraphes).
- **Structure carte média** : `scripts/templates/media.js` lignes 29–45 (lien lightbox, aria-label, image ou vidéo).

**À mettre dans Google Slides :** Extrait index.js (l. 18–22) : boucle forEach, appel au template, getUserCardDOM(), appendChild. Option : un extrait de getUserCardDOM (l. 7–30) pour montrer la construction du DOM.

---

### Diapo 10 — Récupération des données

**Texte à mettre dans Google Slides :**
- **Titre :** Récupération des données
- Une seule source : `fetch("data/photographers.json")`
- Données : `photographers` (liste) et `media` (liste)
- Page photographe : ID dans l’URL (`URLSearchParams`), puis filtrage des médias par `photographerId`

**Morceau de code à montrer (où / pourquoi) :**
- **Fetch** : `scripts/pages/index.js` lignes 2–13 ou `scripts/pages/photographer.js` lignes 15–26. `getPhotographers()` : fetch, json(), retour `{ photographers, media }`.
- **ID + filtrage** : `scripts/pages/photographer.js` lignes 2–5 (`getPhotographerId`), puis 137–159 (init : getPhotographers, find photographe, filter media par photographerId).

**À mettre dans Google Slides :** (1) Extrait getPhotographers (l. 16–26 photographer.js) avec fetch et return data. (2) Extrait init (l. 145–159) : getPhotographerId, find, filter, displayMedia.

---

### Diapo 11 — Stack et qualité

**Texte à mettre dans Google Slides :**
- **Titre :** Stack et qualité du code
- HTML / CSS / JavaScript vanilla (pas de framework)
- Structure : `scripts/pages/`, `scripts/templates/`, `scripts/utils/`
- ESLint configuré ; `npm run lint` — base de code vérifiée

**Morceau de code à montrer (où / pourquoi) :**
- **Structure dossiers** : arborescence `scripts/` (pages, templates, utils).
- **ESLint** : `.eslintrc.json` (env browser, es2021, rules).

**À mettre dans Google Slides :** Liste ou schéma des dossiers scripts ; ou capture du contenu de `.eslintrc.json`.

---

### Diapo 12 — Conclusion / remerciements

**Texte à mettre dans Google Slides :**
- **Titre :** Conclusion
- Synthèse : livrable accessible (clavier + ARIA), code structuré (templates, fetch, tri)
- Remerciements
- Ouverture aux questions

**Image de code dans Google Slides :** Aucune.

---

## Récap : quelles images de code mettre dans Google Slides

| Diapo | Fichier(s) | Lignes / contenu suggéré |
|-------|------------|---------------------------|
| 3 | index.html, accessibility.css | Skip link HTML ; règle :focus-visible |
| 4 | index.html ou lightbox.js | role="banner"/"main" ou aria-label lightbox |
| 5 | contactForm.js | Focus trap (keydown Tab, first/last, focus()) |
| 6 | lightbox.js | openLightbox (8–22) ; handleLightboxKeydown (111–123) |
| 7 | photographer.html, photographer.js (pages) | Label + select ; sortMedia ; écouteur change |
| 8 | templates/photographer.js | photographerTemplate + getUserCardDOM return |
| 9 | index.js (pages) | forEach, photographerTemplate, getUserCardDOM, appendChild |
| 10 | photographer.js (pages) | getPhotographers (16–26) ; init getPhotographerId + filter (145–159) |
| 11 | .eslintrc.json ou arborescence scripts/ | Config ESLint ou liste dossiers |

**Conseil Google Slides :** utiliser une zone de texte en police monospace (ex. Consolas, Courier New), fond clair (#FAFAFA), texte #525252 ou #901C1C pour les mots-clés. Éviter les extraits trop longs : 5–15 lignes par bloc.

---

## Consignes pour Google Slides
- Fond sobre (#FAFAFA ou blanc), titres en #901C1C, accents #DB8876
- Listes à puces courtes, une idée forte par slide
- 1 slide titre + 1 conclusion = 12 slides au total
- Images de code : courts extraits, police monospace, fond clair
