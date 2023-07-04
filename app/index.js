const express = require('express');
const app = express();
const { Image, Point, Tour } = require('./models');

app.use(express.json());

// Create a new image
app.post('/images', async (req, res) => {
  try {
    const { name, base64 } = req.body;
    const image = new Image({ name, base64 });
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new point
app.post('/points', async (req, res) => {
  try {
    const { x, y, imageId, tourId } = req.body;
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    const point = new Point({ x, y, image, tour: tourId });
    await point.save();
    res.status(201).json(point);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new tour
app.post('/tours', async (req, res) => {
  try {
    const { name } = req.body;
    const tour = new Tour({ name });
    await tour.save();
    res.status(201).json(tour);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all tours
app.get('/tours', async (req, res) => {
  try {
    const tours = await Tour.find().populate('points');
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific tour
app.get('/tours/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id).populate('points');
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a specific point
app.patch('/points/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { x, y, imageId } = req.body;
    const point = await Point.findByIdAndUpdate(id, { x, y, image: imageId }, { new: true });
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    res.json(point);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a specific point
app.delete('/points/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const point = await Point.findByIdAndDelete(id);
    if (!point) {
      return res.status(404).json({ error: 'Point not found' });
    }
    res.json({ message: 'Point deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
