const express = require('express');
const router = express.Router();
const { Image, Point, Campus, PointType, Area, Room } = require('../models');


router.post('/', async (req, res) => {
  try {
    const { name, image } = req.body;
    const area = new Area({ name, image });
    await area.save();
    res.status(201).json(area);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
  }
});


router.get('/', async (req, res) => {
  try {

    const { name, campus } = req.query;
    const query = {};

    if (name) {
      query.name = name;
    }
    if (campus) {
      query.campus = campus;
    }

    const areas = await Area.find(query).exec();
    res.json(areas);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
  }
});

// GET /areas/:id
router.get('/:id', async (req, res) => {
  try {
    const area = await Area.findById(req.params.id).populate('image').exec();

    if (!area) {
      return res.status(404).json({ error: 'Area not found' });
    }

    res.json(area);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
  }
});

// PATCH /areas/:id
router.patch('/:id', async (req, res) => {
  try {
    const { name, base64 } = req.body;
    const area = await Area.findByIdAndUpdate(req.params.id, { name, image }, { new: true }).exec();

    if (!area) {
      return res.status(404).json({ error: 'Area not found' });
    }

    res.json(area);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
  }
});

// DELETE /areas/:id
router.delete('/:id', async (req, res) => {
  try {
    const area = await Area.findByIdAndDelete(req.params.id).exec();

    if (!area) {
      return res.status(404).json({ error: 'Area not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
  }
});

module.exports = router