const express = require('express');
const router = express.Router();
const { Image, Point, Campus, PointType, LayoutImage, Room } = require('./models');

// Image routes
router.post('/images', async (req, res) => {
    try {
        const { name, base64 } = req.body;
        const image = new Image({ name, base64 });
        await image.save();
        res.status(201).json(image);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Point routes
router.post('/points', async (req, res) => {
    try {
        const { imageId, pan_offset, tilt_offset, typeId, links, x, y, layout_imageId, campusId } = req.body;
        const point = new Point({ image: imageId, pan_offset, tilt_offset, type: typeId, links, x, y, layout_image: layout_imageId, campus: campusId });
        await point.save();
        res.status(201).json(point);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/points', async (req, res) => {
    try {
        const points = await Point.find().populate('image').populate('type').populate('layout_image').populate('campus').exec();
        res.json(points);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/points/:id', async (req, res) => {
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

router.patch('/points/:id', async (req, res) => {
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

router.delete('/points/:id', async (req, res) => {
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

// Campus routes
router.post('/campuses', async (req, res) => {
    try {
        const { name } = req.body;
        const campus = new Campus({ name });
        await campus.save();
        res.status(201).json(campus);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/campuses', async (req, res) => {
    try {
        const campuses = await Campus.find().exec();
        res.json(campuses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/campuses/:id', async (req, res) => {
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

router.patch('/campuses/:id', async (req, res) => {
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

router.delete('/campuses/:id', async (req, res) => {
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

module.exports = router;
