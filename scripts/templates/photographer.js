function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        // Image
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);
        
        // Nom
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        
        // Localisation (ville, pays)
        const location = document.createElement( 'p' );
        location.textContent = `${city}, ${country}`;
        location.className = "location";
        
        // Tagline
        const taglineElement = document.createElement( 'p' );
        taglineElement.textContent = tagline;
        taglineElement.className = "tagline";
        
        // Prix
        const priceElement = document.createElement( 'p' );
        priceElement.textContent = `${price}€/jour`;
        priceElement.className = "price";
        
        // Assemblage des éléments
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}