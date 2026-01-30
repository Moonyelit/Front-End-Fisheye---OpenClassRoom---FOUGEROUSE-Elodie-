// Gestion de la modale de contact - Réutilisable

// Variable pour stocker le nom du destinataire
let contactRecipientName = '';

// Créer le HTML de la modale de contact
function createContactModal() {
    // Vérifier si la modale existe déjà
    if (document.getElementById('contact_modal')) return;
    
    const modal = document.createElement('div');
    modal.id = 'contact_modal';
    modal.className = 'modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'modal-title');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal">
            <header>
                <h2 id="modal-title">Contactez-moi</h2>
                <button class="modal-close" aria-label="Fermer la modale">
                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="#901C1C"/>
                    </svg>
                </button>
            </header>
            <form id="contact-form">
                <div class="form-group">
                    <label for="firstname">Prénom</label>
                    <input type="text" id="firstname" name="firstname" autocomplete="given-name" required />
                </div>
                <div class="form-group">
                    <label for="lastname">Nom</label>
                    <input type="text" id="lastname" name="lastname" autocomplete="family-name" required />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" autocomplete="email" required />
                </div>
                <div class="form-group">
                    <label for="message">Votre message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="contact_button button">Envoyer</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Ajouter les événements
    setupModalEvents(modal);
}

// Configurer les événements de la modale
function setupModalEvents(modal) {
    // Bouton fermer
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Clic en dehors de la modale
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Soumission du formulaire
    const form = modal.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// Afficher la modale
function displayModal(recipientName = '') {
    // Créer la modale si elle n'existe pas
    createContactModal();
    
    const modal = document.getElementById('contact_modal');
    if (!modal) return;
    
    // Stocker le nom du destinataire (pour l'envoi du formulaire)
    contactRecipientName = recipientName;
    
    // Afficher la modale
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Focus sur le premier champ
    const firstInput = modal.querySelector('input');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

// Fermer la modale
function closeModal() {
    const modal = document.getElementById('contact_modal');
    if (!modal) return;
    
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    // Remettre le focus sur le bouton qui a ouvert la modale
    const contactBtn = document.querySelector('.contact_button:not([type="submit"])');
    if (contactBtn) {
        contactBtn.focus();
    }
}

// Gestion de la soumission du formulaire
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Ajouter le destinataire si disponible
    if (contactRecipientName) {
        data.recipient = contactRecipientName;
    }
    
    // Log des données (pour debug)
    console.log('Données du formulaire:', data);
    
    // Ici vous pouvez ajouter la logique pour envoyer les données à un serveur
    // Par exemple: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
    
    // Message de confirmation
    showConfirmationMessage();
    
    // Réinitialiser et fermer
    form.reset();
    closeModal();
}

// Afficher un message de confirmation
function showConfirmationMessage() {
    // Créer une notification temporaire
    const notification = document.createElement('div');
    notification.className = 'contact-notification';
    notification.setAttribute('role', 'alert');
    notification.innerHTML = `
        <div class="notification-content">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#4CAF50"/>
            </svg>
            <span>Message envoyé avec succès !</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Fermer la modale avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('contact_modal');
        if (modal && modal.style.display === 'flex') {
            closeModal();
        }
    }
});

// Initialisation au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    // Pré-créer la modale pour un chargement plus rapide
    createContactModal();
});
