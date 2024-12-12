const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Stockage temporaire des recettes
let recipes = [];

// Créer une recette
app.post('/recipes', (req, res) => {
    const { title, description, ingredients, steps, duration, difficulty } = req.body;
    const id = Date.now().toString();
    const recipe = { id, title, description, ingredients, steps, duration, difficulty };
    recipes.push(recipe);
    res.status(201).json(recipe);
});

// Lire toutes les recettes
app.get('/recipes', (req, res) => {
    res.json(recipes);
});

// Lire une recette par ID
app.get('/recipes/:id', (req, res) => {
    const recipe = recipes.find(r => r.id === req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recette non trouvée' });
    res.json(recipe);
});

// Modifier une recette
app.put('/recipes/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, ingredients, steps, duration, difficulty } = req.body;

    //recherche de la recette a modifier
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return res.status(404).json({ error: 'Recette non trouvée' });

    //maj des champs
    recipe.title = title;
    recipe.description = description;
    recipe.ingredients = ingredients;
    recipe.steps = steps;
    recipe.duration = duration;
    recipe.difficulty = difficulty;

    res.json(recipe);
});

// Supprimer une recette
app.delete('/recipes/:id', (req, res) => {
    const { id } = req.params;
    const index = recipes.findIndex(r => r.id === id);
    if (index === -1) return res.status(404).json({ error: 'Recette non trouvée' });

    recipes.splice(index, 1);
    res.status(204).send();
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

