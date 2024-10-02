// services/users.service.js

const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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

const generateResetToken = async (email) => {
    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour from now

    const sql = 'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ?';
    const params = [token, expires, email];

    try {
        await db.query(sql, params);
        return token;
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

const sendResetEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        // Configure your email service here
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const resetUrl = `http://localhost:4000/reset-password?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
               Please click on the following link, or paste this into your browser to complete the process:\n\n
               ${resetUrl}\n\n
               If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Email sending error:', error);
        throw error;
    }
};

const findUserByResetToken = async (token) => {
    const sql = 'SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()';
    const params = [token];

    try {
        const rows = await db.query(sql, params);
        return rows[0]; // Return the first user found
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

const resetPassword = async (userId, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const sql = 'UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?';
    const params = [hashedPassword, userId];

    try {
        await db.query(sql, params);
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

const getAllUsers = async () => {
    const sql = 'SELECT id, username, email, role, created_at FROM users';
    try {
        return await db.query(sql);
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

const getUsersExceptCustomers = async () => {
    const sql = 'SELECT id, username, email, role, created_at FROM users WHERE role != "customer"';
    try {
        return await db.query(sql);
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

const getOnlyCustomers = async () => {
    const sql = 'SELECT id, username, email, role, created_at FROM users WHERE role = "customer"';
    try {
        return await db.query(sql);
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

const getUserById = async (id) => {
    const sql = 'SELECT id, username, email, role, created_at FROM users WHERE id = ?';
    try {
        const result = await db.query(sql, [id]);
        return result[0]; // Return the first (and should be only) user found
    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
};

const updateUser = async (id, updateData) => {
    const { username, email, role } = updateData;
    const sql = 'UPDATE users SET username = ?, email = ?, role = ? WHERE id = ?';
    const params = [username, email, role, id];

    try {
        const result = await db.query(sql, params);
        if (result.affectedRows === 0) {
            throw new Error('User not found');
        }
        return { id, username, email, role };
    } catch (error) {
        console.error('Database error in updateUser:', error);
        throw error;
    }
};

const deleteUser = async (id) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    const params = [id];

    try {
        const result = await db.query(sql, params);
        if (result.affectedRows === 0) {
            throw new Error('User not found');
        }
        return { message: 'User deleted successfully' };
    } catch (error) {
        console.error('Database error in deleteUser:', error);
        throw error;
    }
};



module.exports = {
    createUser,
    findUserByEmail,
    generateResetToken,
    sendResetEmail,
    findUserByResetToken,
    resetPassword,
    getAllUsers,
    getUsersExceptCustomers,
    getUserById,
    getOnlyCustomers,
    updateUser,
    deleteUser

};