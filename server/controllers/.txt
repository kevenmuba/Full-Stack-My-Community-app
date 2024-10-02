// controllers/users.controller.js

const usersService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 

const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    // Validation rules...
    
    try {
        const user = await usersService.createUser({ username, email, password, role });
        
        // Optionally issue a JWT here if immediate login is desired
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(201).json({ message: 'User created successfully', user, token });
    } catch (error) {
        // Error handling...
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validation rules
    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }
    if (!password) {
        return res.status(400).json({ error: 'Password is required.' });
    }

    try {
        const user = await usersService.findUserByEmail(email);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, username: user.username, email: user.email } // Return relevant user data
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createUser,
    loginUser,
};