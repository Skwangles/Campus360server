const express = require('express');
const router = express.Router();
const { Image, Point, Campus, PointType, Area, Room } = require('../models');


router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const { name, image, campus } = req.body;
    const area = new Area({ name, campus, image });
    await area.save();
    res.status(201).json(area);
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

router.get('/', async (req, res) => {
  try {

    const { name, campus, image } = req.query;
    const query = {};

    if (name) {
      query.name = name;
    }
    if (campus) {
      query.campus = campus;
    }
    if (image) {
      query.image = image;
    }

    const areas = await Area.find(query).exec();
    res.json(areas);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error: ' + JSON.stringify(error) });
  }
});



router.patch('/:id', async (req, res) => {
  try {
    const { name, image, campus } = req.body;
    const updateFields = {};

    if (name) {
      updateFields.name = name;
    }

    if (image) {
      updateFields.image = image;
    }

    if (campus) {
      updateFields.campus = campus;
    }

    const area = await Area.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    ).exec();

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