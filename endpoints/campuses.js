const express = require('express');
const router = express.Router();
const { Image, Point, Campus, PointType, Area, Room } = require('../models');

router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        const campus = new Campus({ name });
        await campus.save();
        res.status(201).json(campus);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const campuses = await Campus.find().exec();
        res.json(campuses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const campus = await Campus.findById(req.params.id).exec();

        if (!campus) {
            return res.status(404).json({ error: 'Campus not found' });
        }

        res.json(campus);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const campus = await Campus.findByIdAndUpdate(req.params.id, { name }, { new: true }).exec();

        if (!campus) {
            return res.status(404).json({ error: 'Campus not found' });
        }

        res.json(campus);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const campus = await Campus.findByIdAndDelete(req.params.id).exec();

        if (!campus) {
            return res.status(404).json({ error: 'Campus not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router