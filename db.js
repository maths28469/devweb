const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',         // Selectionne ton utilisateur PostgreSQL
    host: 'localhost',        // Adresse du serveur PostgreSQL
    database: 'postgres', //  Selectionne la base de données
    password: '23012004',     // Mot de passe dans le serveur
    port: 5432,               // Port par défaut pour PostgreSQL
});

module.exports = pool;