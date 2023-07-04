const mongoose = require('mongoose');

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/virtualtour', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Image schema
const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  base64: { type: String, required: true },
});

// Define the Point schema
const pointSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
});

// Define the Tour schema
const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Point' }],
});

// Define models based on the schemas
const Image = mongoose.model('Image', imageSchema);
const Point = mongoose.model('Point', pointSchema);
const Tour = mongoose.model('Tour', tourSchema);

// Export the models
module.exports = { Image, Point, Tour };
