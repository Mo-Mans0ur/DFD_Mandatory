// routes/bookRoutes.js

import express from 'express';
import Book from '../models/Book.js';
import authenticateJWT from '../middleware/auth.js';
import authorizeRole from '../middleware/authorizeRole.js';

const router = express.Router();

// Create a new book (admin only)
router.post('/', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const { title, author, publishedDate } = req.body;

    // Validate required fields
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required.' });
    }

    const book = await Book.create({ title, author, publishedDate });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all books (public)
router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a book (admin only)
router.put('/:id', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    const { title, author, publishedDate } = req.body;

    // Validate required fields
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and author are required.' });
    }

    await Book.update(
      { title, author, publishedDate },
      { where: { id: req.params.id } }
    );
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a book (admin only)
router.delete('/:id', authenticateJWT, authorizeRole('admin'), async (req, res) => {
  try {
    await Book.destroy({ where: { id: req.params.id } });
    res.status(204).send(); // Send only one response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
