const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();
const PORT = 3000;

// Middleware pour CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middleware pour parser les corps JSON et URL-encodés
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour récupérer toutes les recettes
app.get('/api/recettes', async (req, res) => {
    try {
        const query = 'SELECT * FROM Recette';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des recettes' });
    }
});

// Route pour ajouter une recette
app.post('/api/recettes', async (req, res) => {
    try {
        const { nom_recette, description, categorie, temps_preparation, photo, difficulte, id_utilisateur } = req.body;

        const query = `
            INSERT INTO Recette (nom_recette, description, categorie, temps_preparation, photo, difficulte, id_utilisateur)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [nom_recette, description, categorie, temps_preparation, photo, difficulte, id_utilisateur];

        await pool.query(query, values);
        res.status(201).json({ message: 'Recette ajoutée avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de la recette' });
    }
});

// Route pour récupérer les recettes filtrées
app.get('/api/recettes/filtre', async (req, res) => {
    try {
        const { search, categorie, difficulte } = req.query;
        let query = 'SELECT * FROM Recette WHERE 1=1';
        const params = [];

        if (search) {
            query += ` AND nom_recette ILIKE $${params.length + 1}`;
            params.push(`%${search}%`);
        }
        if (categorie) {
            query += ` AND categorie = $${params.length + 1}`;
            params.push(categorie);
        }
        if (difficulte) {
            query += ` AND difficulte = $${params.length + 1}`;
            params.push(difficulte);
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors du filtrage des recettes' });
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});