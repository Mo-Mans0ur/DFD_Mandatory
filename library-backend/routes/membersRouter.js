import express from 'express';
import Member from '../models/Member.js';

const router = express.Router();

// Create a new member
router.post('/', async (req, res) => {
    try {
        const member = await Member.create(req.body);
        res.status(201).json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all members
router.get('/', async (req, res) => {
    try {
        const members = await Member.findAll();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a member
router.put('/:id', async (req, res) => {
    try {
        await Member.update(req.body, { where: { MemberID: req.params.id } });
        res.json({ message: 'Member updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a member
router.delete('/:id', async (req, res) => {
    try {
        await Member.destroy({ where: { MemberID: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
