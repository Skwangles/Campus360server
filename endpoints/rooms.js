const express = require('express');
const router = express.Router();
const { Image, Point, Campus, PointType, Area, Room } = require('../models');

// Room routes
router.post('/', async (req, res) => {
    try {
        const { name, occupants, points } = req.body;
        const room = new Room({ name, occupants, points });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate('points').exec();

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.json(room);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});


router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find().populate('points').exec();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const { name, occupants, points } = req.body;
        const updateFields = {};

        if (name) {
            updateFields.name = name;
        }

        if (occupants) {
            updateFields.occupants = occupants;
        }

        if (points) {
            updateFields.points = points;
        }

        const room = await Room.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        )
            .populate('points')
            .exec();

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.json(room);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id).exec();

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

module.exports = router