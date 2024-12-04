// Script pour gérer les interactions avec le formulaire de recette
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    const imageInput = document.getElementById('photo');
    const imagePreview = document.getElementById('image-preview');
    const recipeIdInput = document.getElementById('recipe-id');

    // Fonction pour prévisualiser l'image
    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
            imagePreview.src = '';
        }
    });

    // Fonction pour valider les champs obligatoires
    const validateForm = () => {
        const title = document.getElementById('title').value.trim();
        const ingredients = document.getElementById('ingredients').value.trim();
        const steps = document.getElementById('steps').value.trim();

        if (!title || !ingredients || !steps) {
            alert('Veuillez remplir tous les champs obligatoires (Titre, Ingrédients, Étapes).');
            return false;
        }
        return true;
    };

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        if (!validateForm()) return;

        // Création de l'objet recette
        const recipe = {
            id: recipeIdInput.value || Date.now().toString(),
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            ingredients: document.getElementById('ingredients').value,
            steps: document.getElementById('steps').value,
            duration: document.getElementById('duration').value,
            difficulty: document.getElementById('difficulty').value,
            image: imagePreview.src || null
        };

        console.log('Recette enregistrée :', recipe);

        // Simuler l'enregistrement ou envoyer les données à un serveur
        alert('Recette enregistrée avec succès !');

        // Réinitialiser le formulaire
        form.reset();
        imagePreview.style.display = 'none';
    });
});
