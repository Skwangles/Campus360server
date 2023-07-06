const express = require('express');
const router = express.Router();
const { Image, Point, Campus, PointType, Area, Room } = require('../models');

router.post('/', async (req, res) => {
    try {
        const { type } = req.body;
        const pointType = new PointType({ type });
        await pointType.save();
        res.status(201).json(pointType);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

router.get('/', async (req, res) => {
    try {
        const pointTypes = await PointType.find().exec();
        res.json(pointTypes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error)  });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const pointType = await PointType.findById(req.params.id).exec();

        if (!pointType) {
            return res.status(404).json({ error: 'PointType not found' });
        }

        res.json(pointType);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { type } = req.body;
        const pointType = await PointType.findByIdAndUpdate(req.params.id, { type }, { new: true }).exec();

        if (!pointType) {
            return res.status(404).json({ error: 'PointType not found' });
        }

        res.json(pointType);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const pointType = await PointType.findByIdAndDelete(req.params.id).exec();

        if (!pointType) {
            return res.status(404).json({ error: 'PointType not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

module.exports = router