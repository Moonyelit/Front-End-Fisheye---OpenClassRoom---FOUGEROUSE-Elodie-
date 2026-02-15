/* exported displayModal */
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
    // #1 - Dialog avec aria-labelledby pointant vers le titre
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'modal-title');
    modal.setAttribute('aria-hidden', 'true');
    
    modal.innerHTML = `
        <div class="modal" role="document">
            <header>
                <!-- #2 - Heading: Titre avec le nom du photographe -->
                <h2 id="modal-title">Contactez-moi</h2>
                <!-- #12 - Button: Ferme la modale - "Close Contact form" -->
                <button class="modal-close" aria-label="Close Contact form">
                    <svg width="24" height="24" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="currentColor"/>
                    </svg>
                </button>
            </header>
            <form id="contact-form">
                <!-- #3 - Label: Prénom, #4 - Text field: Input Prénom -->
                <div class="form-group">
                    <label for="firstname" id="label-firstname">Prénom</label>
                    <input type="text" id="firstname" name="firstname" aria-labelledby="label-firstname" autocomplete="given-name" required />
                </div>
                <!-- #5 - Label: Nom, #6 - Text field: Input Nom -->
                <div class="form-group">
                    <label for="lastname" id="label-lastname">Nom</label>
                    <input type="text" id="lastname" name="lastname" aria-labelledby="label-lastname" autocomplete="family-name" required />
                </div>
                <!-- #7 - Label: Email, #8 - Text field: Input Email -->
                <div class="form-group">
                    <label for="email" id="label-email">Email</label>
                    <input type="email" id="email" name="email" aria-labelledby="label-email" autocomplete="email" required />
                </div>
                <!-- #9 - Label: Message, #10 - Text field: Input Message -->
                <div class="form-group">
                    <label for="message" id="label-message">Votre message</label>
                    <textarea id="message" name="message" aria-labelledby="label-message" rows="5" required></textarea>
                </div>
                <!-- #11 - Button: Envoie le formulaire - "Send" -->
                <button type="submit" class="contact_button button" aria-label="Send">Envoyer</button>
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
}

// Afficher la modale
function displayModal(recipientName = '') {
    // Créer la modale si elle n'existe pas
    createContactModal();
    
    const modal = document.getElementById('contact_modal');
    if (!modal) return;
    
    // Stocker le nom du destinataire (pour l'envoi du formulaire)
    contactRecipientName = recipientName;
    
    // #2 - Mettre à jour le titre avec le nom du photographe
    const modalTitle = modal.querySelector('#modal-title');
    if (modalTitle && recipientName) {
        modalTitle.textContent = `Contactez-moi ${recipientName}`;
    } else if (modalTitle) {
        modalTitle.textContent = 'Contactez-moi';
    }
    
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
    
    // Affichage des champs dans la console
    console.log('Contact form submitted:', {
        prénom: data.firstname,
        nom: data.lastname,
        email: data.email,
        message: data.message,
        destinataire: data.recipient || ''
    });

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
