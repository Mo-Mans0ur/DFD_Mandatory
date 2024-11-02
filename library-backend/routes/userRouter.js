import express from 'express';
import authenticateToken from '../middleware/authentificationToken.js';

const router = express.Router();

// Protected route to access the user profile
router.get('/profile', authenticateToken, (req, res) => {
    res.json({ message: 'This is your profile', user: req.user });
});

export default router;
