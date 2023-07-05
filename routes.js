const express = require('express');
const router = express.Router();
const { Image, Point, Campus, PointType, LayoutImage, Room } = require('./models');

//#region Image
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

router.get('/images', async (req, res) => {
    try {
        const images = await Image.find().exec();
        res.json(images);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/images/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id).exec();

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.json(image);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/images/:id', async (req, res) => {
    try {
        const { name, base64 } = req.body;
        const image = await Image.findByIdAndUpdate(req.params.id, { name, base64 }, { new: true }).exec();

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.json(image);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/images/:id', async (req, res) => {
    try {
        const image = await Image.findByIdAndDelete(req.params.id).exec();

        if (!image) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
//#endregion
//#region Point
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
//#endregion
//#region Campus
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
//#endregion
//#region PointType
// PointType routes
router.post('/pointTypes', async (req, res) => {
    try {
        const { type } = req.body;
        const pointType = new PointType({ type });
        await pointType.save();
        res.status(201).json(pointType);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/pointTypes', async (req, res) => {
    try {
        const pointTypes = await PointType.find().exec();
        res.json(pointTypes);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/pointTypes/:id', async (req, res) => {
    try {
        const pointType = await PointType.findById(req.params.id).exec();

        if (!pointType) {
            return res.status(404).json({ error: 'PointType not found' });
        }

        res.json(pointType);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/pointTypes/:id', async (req, res) => {
    try {
        const { type } = req.body;
        const pointType = await PointType.findByIdAndUpdate(req.params.id, { type }, { new: true }).exec();

        if (!pointType) {
            return res.status(404).json({ error: 'PointType not found' });
        }

        res.json(pointType);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/pointTypes/:id', async (req, res) => {
    try {
        const pointType = await PointType.findByIdAndDelete(req.params.id).exec();

        if (!pointType) {
            return res.status(404).json({ error: 'PointType not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
//#endregion
//#region LayoutImage
// LayoutImage routes
router.post('/layoutImages', async (req, res) => {
    try {
        const { name, base64 } = req.body;
        const layoutImage = new LayoutImage({ name, base64 });
        await layoutImage.save();
        res.status(201).json(layoutImage);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/layoutImages', async (req, res) => {
    try {
        const layoutImages = await LayoutImage.find().exec();
        res.json(layoutImages);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/layoutImages/:id', async (req, res) => {
    try {
        const layoutImage = await LayoutImage.findById(req.params.id).exec();

        if (!layoutImage) {
            return res.status(404).json({ error: 'LayoutImage not found' });
        }

        res.json(layoutImage);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/layoutImages/:id', async (req, res) => {
    try {
        const { name, base64 } = req.body;
        const layoutImage = await LayoutImage.findByIdAndUpdate(req.params.id, { name, base64 }, { new: true }).exec();

        if (!layoutImage) {
            return res.status(404).json({ error: 'LayoutImage not found' });
        }

        res.json(layoutImage);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/layoutImages/:id', async (req, res) => {
    try {
        const layoutImage = await LayoutImage.findByIdAndDelete(req.params.id).exec();

        if (!layoutImage) {
            return res.status(404).json({ error: 'LayoutImage not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
//#endregion
//#region Rooms
// Room routes
router.post('/rooms', async (req, res) => {
    try {
        const { name, occupants, points } = req.body;
        const room = new Room({ name, occupants, points });
        await room.save();
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find().populate('points').exec();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate('points').exec();

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.json(room);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.patch('/rooms/:id', async (req, res) => {
    try {
        const { name, occupants, points } = req.body;
        const room = await Room.findByIdAndUpdate(req.params.id, { name, occupants, points }, { new: true })
            .populate('points')
            .exec();

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.json(room);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id).exec();

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
//#endregion

module.exports = router;
