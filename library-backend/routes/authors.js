import express from 'express';
import Author from '../models/Author.js';

const router = express.Router();

// Create a new author
router.post('/', async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all authors
router.get('/', async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an author
router.put('/:id', async (req, res) => {
    try {
        await Author.update(req.body, { where: { AuthorID: req.params.id } });
        res.json({ message: 'Author updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an author
router.delete('/:id', async (req, res) => {
    try {
        await Author.destroy({ where: { AuthorID: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
