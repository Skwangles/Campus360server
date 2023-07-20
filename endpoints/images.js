const express = require('express');
const router = express.Router();
const { Image, Point, Campus, PointType, Area, Room } = require('../models');

// Image routes
router.post('/', async (req, res) => {
    try {
        const { base64 } = req.body;
        const image = new Image({ base64 });
        await image.save();
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id).exec();

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.json(image);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

router.get('/', async (req, res) => {
    try {
        const { base64 } = req.params;

        // securely query only by specified params
        const query = {};
        if (base64) {
            query.base64 = base64;
        }

        const images = await Image.find(query).exec();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});



router.patch('/:id', async (req, res) => {
    try {
        const { base64 } = req.body;
        const updateFields = {};

        if (base64) {
            updateFields.base64 = base64;
        }

        const image = await Image.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        ).exec();

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.json(image);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id).exec();

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

module.exports = router