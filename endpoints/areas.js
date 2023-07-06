const express = require('express');
const router = express.Router();
const { Image, Point, Campus, PointType, Area, Room } = require('../models');


router.post('/', async (req, res) => {
  try {
    const { name, base64 } = req.body;
    const area = new Area({ name, base64 });
    await area.save();
    res.status(201).json(area);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/', async (req, res) => {
  try {
    const areas = await Area.find().exec();
    res.json(areas);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const area = await Area.findById(req.params.id).exec();

    if (!area) {
      return res.status(404).json({ error: 'Area not found' });
    }

    res.json(area);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const { name, base64 } = req.body;
    const area = await Area.findByIdAndUpdate(req.params.id, { name, base64 }, { new: true }).exec();

    if (!area) {
      return res.status(404).json({ error: 'Area not found' });
    }

    res.json(area);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const area = await Area.findByIdAndDelete(req.params.id).exec();

    if (!area) {
      return res.status(404).json({ error: 'Area not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
