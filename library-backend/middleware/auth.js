import express from 'express';
import Book from '../models/Book.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.js';

const router = express.Router();

// create a new book (admin only)
router.post('/', authenticateJWT, authorizeRole('admin'), async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all books (public)
router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Update a book (admin only)
router.put('/:id', authenticateJWT, authorizeRole('admin'), async (req, res) => {
    try {
        await Book.update(req.body, { where: { id: req.params.id } });
        res.json({ message: 'Book updated successfully' });
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Delete a book (admin only)
router.delete('/:id', authenticateJWT, authorizeRole('admin'), async (req, res) => {
    try {
        await Book.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Book deleted successfully' });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;