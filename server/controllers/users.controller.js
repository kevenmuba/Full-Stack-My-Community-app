// controllers/users.controller.js

const usersService = require('../services/users.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 


const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    // Basic validation
    if (!username || !email || !password || !role) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Password strength validation
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    // Role validation
    const validRoles = ['admin', 'social_media_manager', 'salesman', 'writer', 'hr', 'customer', 'accountant'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ error: 'Invalid role.' });
    }
    
    try {
        // Check if the email is unique
        const isUnique = await usersService.checkEmailUniqueness(email);
        if (!isUnique) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        const user = await usersService.createUser({ username, email, password, role });
        
        // Optionally issue a JWT here if immediate login is desired
        const token = jwt.sign({ id: user.id, username: user.username,role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.status(201).json({ message: 'User created successfully', user, token });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email is already in use.' });
        }
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
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
        const token = jwt.sign({ id: user.id, username: user.username,role:user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            // user: { id: user.id, username: user.username, email: user.email,role:user.role }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    try {
        const user = await usersService.findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const resetToken = await usersService.generateResetToken(email);
        await usersService.sendResetEmail(email, resetToken);

        res.status(200).json({ message: 'Password reset email sent successfully.' });
    } catch (error) {
        console.error('Error in forgot password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token and new password are required.' });
    }

    try {
        const user = await usersService.findUserByResetToken(token);

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired reset token.' });
        }

        // Password validation
        if (newPassword.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
        }

        await usersService.resetPassword(user.id, newPassword);

        res.status(200).json({ message: 'Password has been reset successfully.' });
    } catch (error) {
        console.error('Error in reset password:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAllUsers();
        console.log('Users in controller:', users);
        if (!users || !Array.isArray(users)) {
            throw new Error('Invalid data returned from database');
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};

const getUsersExceptCustomers = async (req, res) => {
    try {
        const users = await usersService.getUsersExceptCustomers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users except customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOnlyCustomers = async (req, res) => {
    try {
        const customers = await usersService.getOnlyCustomers();
        res.status(200).json(customers);
    } catch (error) {
        console.error('Error getting only customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usersService.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;

    try {
        // Basic validation
        if (!username || !email || !role) {
            return res.status(400).json({ error: 'Username, email, and role are required' });
        }

        const updatedUser = await usersService.updateUser(id, { username, email, role });
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.message === 'User not found') {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await usersService.deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        if (error.message === 'User not found') {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const checkEmailUniqueness = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
    }

    try {
        const isUnique = await usersService.checkEmailUniqueness(email);
        console.log('Is email unique:', isUnique);
        
        if (isUnique) {
            console.log('Sending unique email response');
            return res.json({ isUnique: true, message: 'Email is available' });
        } else {
            console.log('Sending non-unique email response');
            return res.json({ isUnique: false, message: 'Email is already in use' });
        }
    } catch (error) {
        console.error('Error checking email uniqueness:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};


module.exports = {
    createUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getAllUsers,
    getUsersExceptCustomers,
    getOnlyCustomers,
    getUserById,
    updateUser,
    deleteUser,
    checkEmailUniqueness
   

};