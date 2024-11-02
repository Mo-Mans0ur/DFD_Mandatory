import express from 'express';
import Loan from '../models/Loan.js';

const router = express.Router();

// Create a new loan
router.post('/', async (req, res) => {
    try {
        const loan = await Loan.create(req.body);
        res.status(201).json(loan);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all loans
router.get('/', async (req, res) => {
    try {
        const loans = await Loan.findAll();
        res.json(loans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a loan (e.g., return date)
router.put('/:id', async (req, res) => {
    try {
        await Loan.update(req.body, { where: { LoanID: req.params.id } });
        res.json({ message: 'Loan updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a loan
router.delete('/:id', async (req, res) => {
    try {
        await Loan.destroy({ where: { LoanID: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
