const express = require('express');
const router = express.Router();
const { Image, Point, Campus, PointType, LayoutImage, Room } = require('./models');

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: API endpoints for managing images
 */

/**
 * @swagger
 * tags:
 *   name: Points
 *   description: API endpoints for managing points
 */

/**
 * @swagger
 * tags:
 *   name: Campuses
 *   description: API endpoints for managing campuses
 */

// Image routes

/**
 * @swagger
 * /images:
 *   post:
 *     tags: [Images]
 *     description: Create a new image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               base64:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Image'
 */
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

// Other routes for images (update, delete)...

// Point routes

/**
 * @swagger
 * /points:
 *   post:
 *     tags: [Points]
 *     description: Create a new point
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               imageId:
 *                 type: string
 *               pan_offset:
 *                 type: number
 *               tilt_offset:
 *                 type: number
 *               typeId:
 *                 type: string
 *               links:
 *                 type: array
 *                 items:
 *                   type: string
 *               x:
 *                 type: number
 *               y:
 *                 type: number
 *               layout_imageId:
 *                 type: string
 *               campusId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Point'
 */
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

/**
 * @swagger
 * /points:
 *   get:
 *     tags: [Points]
 *     description: Get all points
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Point'
 */
router.get('/points', async (req, res) => {
    try {
        const points = await Point.find().populate('image').populate('type').populate('layout_image').populate('campus').exec();
        res.json(points);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Other routes for points (get by ID, update, delete)...

// Campus routes

/**
 * @swagger
 * /campuses:
 *   post:
 *     tags: [Campuses]
 *     description: Create a new campus
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Campus'
 */
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

/**
 * @swagger
 * /campuses:
 *   get:
 *     tags: [Campuses]
 *     description: Get all campuses
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Campus'
 */
router.get('/campuses', async (req, res) => {
    try {
        const campuses = await Campus.find().exec();
        res.json(campuses);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Other routes for campuses (get by ID, update, delete)...

module.exports = router;
