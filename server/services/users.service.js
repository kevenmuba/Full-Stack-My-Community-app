// services/users.service.js

const db = require('../config/db.config');
const bcrypt = require('bcrypt');

const createUser = async ({ username, email, password, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    const params = [username, email, hashedPassword, role];

    try {
        const result = await db.query(sql, params);
        return { id: result.insertId, username, email, role }; 
    } catch (error) {
        console.error('Database error:', error);
        throw error; 
    }
};

const findUserByEmail = async (email) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const params = [email];

    try {
        const rows = await db.query(sql, params);
        return rows[0]; // Return the first user found
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

module.exports = {
    createUser,
    findUserByEmail,
};