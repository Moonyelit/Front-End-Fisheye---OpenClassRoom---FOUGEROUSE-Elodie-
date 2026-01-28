function displayModal() {
    const modal = document.getElementById("contact_modal");
    if (modal) {
        modal.style.display = "flex";
        // Focus sur le premier champ du formulaire
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Fermer la modale avec la touche Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Fermer la modale en cliquant en dehors
document.addEventListener('click', (e) => {
    const modal = document.getElementById("contact_modal");
    if (modal && e.target === modal) {
        closeModal();
    }
});

// Gestion de la soumission du formulaire
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contact_modal form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            console.log('Données du formulaire:', Object.fromEntries(formData));
            // Ici vous pouvez ajouter la logique pour envoyer les données
            alert('Message envoyé avec succès!');
            form.reset();
            closeModal();
        });
    }
});
