function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.className = "card-home";
        
        // Lien vers la page du photographe (englobe toute la carte)
        const link = document.createElement( 'a' );
        link.href = `photographer.html?id=${id}`;
        link.setAttribute("aria-label", `Voir le profil de ${name}`);
        link.className = "card-link";
        
        // Image circulaire (photographer-portrait)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);
        img.className = "photographer-portrait";
        
        // Nom (photographe-name)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.className = "photographer-name";
        
        // Localisation (ville, pays - photographer-location)
        const location = document.createElement( 'p' );
        location.textContent = `${city}, ${country}`;
        location.className = "photographer-location";
        
        // Tagline (photographer-tagline)
        const taglineElement = document.createElement( 'p' );
        taglineElement.textContent = tagline;
        taglineElement.className = "photographer-tagline";
        
        // Prix (photographer-price)
        const priceElement = document.createElement( 'p' );
        priceElement.textContent = `${price}€/jour`;
        priceElement.className = "photographer-price";
        
        // Assemblage des éléments
        link.appendChild(h2);
        article.appendChild(img);
        article.appendChild(link);
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}