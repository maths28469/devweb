const apiUrl = 'http://localhost:3000/recipes';

// Charger toutes les recettes
function loadRecipes() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('recipes-list');
            list.innerHTML = '';

            data.forEach(recipe => {
                const div = document.createElement('div');
                div.className = 'recipe-item';
                div.innerHTML = `
                    <h3>${recipe.title}</h3>
                    <p><strong>Description :</strong> ${recipe.description}</p>
                    <p><strong>Ingrédients :</strong> ${recipe.ingredients}</p>
                    <p><strong>Étapes :</strong> ${recipe.steps}</p>
                    <p><strong>Durée :</strong> ${recipe.duration} min</p>
                    <p><strong>Difficulté :</strong> ${recipe.difficulty}</p>
                    <button onclick="editRecipe('${recipe.id}')">Modifier</button>
                    <button onclick="deleteRecipe('${recipe.id}')">Supprimer</button>
                `;
                list.appendChild(div);
            });
        });
}

// Ajouter ou modifier une recette
document.getElementById('recipe-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('recipe-id').value;
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const ingredients = document.getElementById('ingredients').value;
    const steps = document.getElementById('steps').value;
    const duration = document.getElementById('duration').value;
    const difficulty = document.getElementById('difficulty').value;

    const recipe = { title, description, ingredients, steps, duration, difficulty };

    if (id) {
        // Modifier une recette existante
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe)
        }).then(() => {
            resetForm();
            loadRecipes();
        });
    } else {
        // Ajouter une nouvelle recette
        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe)
        }).then(() => {
            resetForm();
            loadRecipes();
        });
    }
});

// Supprimer une recette
function deleteRecipe(id) {
    if (confirm('Voulez-vous vraiment supprimer cette recette ?')) {
        fetch(`${apiUrl}/${id}`, { method: 'DELETE' }).then(() => loadRecipes());
    }
}

// Modifier une recette
function editRecipe(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(recipe => {
            document.getElementById('recipe-id').value = recipe.id;
            document.getElementById('title').value = recipe.title;
            document.getElementById('description').value = recipe.description;
            document.getElementById('ingredients').value = recipe.ingredients;
            document.getElementById('steps').value = recipe.steps;
            document.getElementById('duration').value = recipe.duration;
            document.getElementById('difficulty').value = recipe.difficulty;
        });
}

// Réinitialiser le formulaire
function resetForm() {
    document.getElementById('recipe-form').reset();
    document.getElementById('recipe-id').value = '';
}

// Charger les recettes au démarrage
loadRecipes();


//option de connection
const API_URL = 'http://localhost:3000';
let token = '';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const message = await response.text();
    document.getElementById('responseMessage').textContent = message;
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        token = data.token;
        document.getElementById('responseMessage').textContent = 'Connexion réussie !';
    } else {
        document.getElementById('responseMessage').textContent = data;
    }
});

document.getElementById('changePasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    const response = await fetch(`${API_URL}/change-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
    });

    const message = await response.text();
    document.getElementById('responseMessage').textContent = message;
});
