import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/Roles/User.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const saltRounds = 10;

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the new user
        const user = await User.create({  
            username, 
            password: hashedPassword, 
            role 
        });

        res.status(201).json({ message: 'User registered successfully', user: { username: user.username, role: user.role } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login user and return a JWT
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ userId: user.UserID, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
