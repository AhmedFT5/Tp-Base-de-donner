import * as SQLite from 'expo-sqlite';

let db = null;

// Ouvrir la base de données (comme page 12 du TP)
const openDB = async () => {
    db = await SQLite.openDatabaseAsync('sportapp.db');
};

// Initialiser la table users 
export const initDB = async () => {
    if (!db) await openDB();
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            password TEXT
        );
    `);
    console.log("Table 'users' initialisée");
};

// Inscription : Ajouter un utilisateur (INSERT)
export const registerUser = async (name, email, password) => {
    if (!db) await openDB();
    try {
        // Utilisation de runAsync comme dans le cours [cite: 368]
        await db.runAsync(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Connexion : Vérifier l'utilisateur (SELECT)
export const loginUser = async (email, password) => {
    if (!db) await openDB();
    try {
        // Utilisation de getAllAsync comme dans le cours [cite: 376]
        const result = await db.getAllAsync(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [email, password]
        );
        // Si la liste contient un élément, l'utilisateur existe
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        return null;
    }
};