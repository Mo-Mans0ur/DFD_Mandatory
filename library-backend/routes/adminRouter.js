// routes/adminRouter.js
import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js';
import authorizeRole from '../middleware/authorizeRole.js';

const router = express.Router();

// Example protected route for admins only
router.get('/admin-dashboard', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'Welcome to the admin dashboard, accessible only to admins.' });
});

export default router;
