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
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

router.get('/', async (req, res) => {
    try {
        const { image, type, area, campus } = req.query;
        const query = {};

        if (image) {
            query.image = image
        }

        if (type) {
            query.type = type
        }

        if (area) {
            query.area = area;
        }

        if (campus) {
            query.campus = campus;
        }

        const points = await Point.find(query)
            .populate('image')
            .populate('type')
            .populate('area')
            .populate('campus')
            .exec();

        res.json(points);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const point = await Point.findById(req.params.id)
            .populate('image')
            .populate('type')
            .populate('area')
            .populate('campus')
            .exec();

        if (!point) {
            return res.status(404).json({ error: 'Point not found' });
        }

        res.json(point);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { imageId, pan_offset, tilt_offset, typeId, links, x, y, layout_imageId, campusId } = req.body;
        const updateFields = {};

        if (imageId) {
            updateFields.image = imageId;
        }
        if (pan_offset) {
            updateFields.pan_offset = pan_offset;
        }
        if (tilt_offset) {
            updateFields.tilt_offset = tilt_offset;
        }
        if (typeId) {
            updateFields.type = typeId;
        }
        if (links) {
            updateFields.links = links;
        }
        if (x) {
            updateFields.x = x;
        }
        if (y) {
            updateFields.y = y;
        }
        if (layout_imageId) {
            updateFields.layout_image = layout_imageId;
        }

        if (campusId) {
            updateFields.campus = campusId;
        }

        const point = await Point.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        ).exec();

        if (!point) {
            return res.status(404).json({ error: 'Point not found' });
        }

        res.json(point);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
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
        res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
    }
});

module.exports = router