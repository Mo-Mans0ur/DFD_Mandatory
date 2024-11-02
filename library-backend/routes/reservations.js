import express from 'express';
import Reservation from '../models/Reservation.js';

const router = express.Router();

// Create a new reservation
router.post('/', async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all reservations
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a reservation
router.put('/:id', async (req, res) => {
    try {
        await Reservation.update(req.body, { where: { ReservationID: req.params.id } });
        res.json({ message: 'Reservation updated successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a reservation
router.delete('/:id', async (req, res) => {
    try {
        await Reservation.destroy({ where: { ReservationID: req.params.id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
