/* exported photographerTemplate */
function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.className = "card-home";
        
        // Lien vers la page du photographe (contient l'image ET le h2)
        // Selon les specs d'accessibilité : le lien est une zone focusable contenant le h2 et l'image
        const link = document.createElement('a');
        link.href = `photographer.html?id=${id}`;
        link.className = "card-link";
        // Le nom accessible est fourni par le h2 à l'intérieur du lien
        
        // Image circulaire - alt = nom du photographe (requis WCAG)
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.className = "photographer-portrait";
        
        // Nom (photographer-name) - fournit le nom accessible au lien
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.className = "photographer-name";
        
        // Assemblage du lien (image + h2)
        link.appendChild(img);
        link.appendChild(h2);
        
        // Localisation (texte statique)
        const location = document.createElement('p');
        location.textContent = `${city}, ${country}`;
        location.className = "photographer-location";
        
        // Tagline (texte statique)
        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;
        taglineElement.className = "photographer-tagline";
        
        // Prix (texte statique)
        const priceElement = document.createElement('p');
        priceElement.textContent = `${price}€/jour`;
        priceElement.className = "photographer-price";
        
        // Assemblage de l'article
        article.appendChild(link);
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}