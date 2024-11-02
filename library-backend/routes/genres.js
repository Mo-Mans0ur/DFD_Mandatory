import express from 'express';
import Genre from '../models/Genre.js';

const router = express.Router();

// Create a new genre
router.post('/', async (req, res) => {
    try {
        const genre = await Genre.create(req.body);
        res.status(201).json(genre);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all genres
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a genre
router.put('/:id', async (req, res) => {
    try {
        await Genre.update(req.body, { where: { GenreID: req.params.id } });
        res.json({ message: 'Genre updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a genre
router.delete('/:id', async (req, res) => {
    try {
        await Genre.destroy({ where: { GenreID: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
