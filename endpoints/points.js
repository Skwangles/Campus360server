const express = require('express');
const router = express.Router();
const { Image, Point, Campus, PointType, Area, Room } = require('../models');

router.post('/', async (req, res) => {
    try {
        const { imageId, pan_offset, tilt_offset, typeId, links, x, y, layout_imageId, campusId } = req.body;
        const point = new Point({ image: imageId, pan_offset, tilt_offset, type: typeId, links, x, y, layout_image: layout_imageId, campus: campusId });
        await point.save();
        res.status(201).json(point);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const points = await Point.find()
            .populate('image')
            .populate('type')
            .populate('layout_image')
            .populate('campus')
            .exec();

        res.json(points);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const point = await Point.findById(req.params.id)
            .populate('image')
            .populate('type')
            .populate('layout_image')
            .populate('campus')
            .exec();

        if (!point) {
            return res.status(404).json({ error: 'Point not found' });
        }

        res.json(point);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { imageId, pan_offset, tilt_offset, typeId, links, x, y, layout_imageId, campusId } = req.body;
        const point = await Point.findByIdAndUpdate(
            req.params.id,
            { image: imageId, pan_offset, tilt_offset, type: typeId, links, x, y, layout_image: layout_imageId, campus: campusId },
            { new: true }
        )
            .populate('image')
            .populate('type')
            .populate('layout_image')
            .populate('campus')
            .exec();

        if (!point) {
            return res.status(404).json({ error: 'Point not found' });
        }

        res.json(point);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const point = await Point.findByIdAndDelete(req.params.id).exec();

        if (!point) {
            return res.status(404).json({ error: 'Point not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router