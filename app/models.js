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

// Define the Image schema
const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  base64: { type: String, required: true },
});

// Define the Tour schema
const pointTypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
});

// Define the Point schema
const pointSchema = new mongoose.Schema({
  // POV 
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
  pan_offset: { type: Number, default: 0 },
  tilt_offset: { type: Number, default: 0 },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'PointType', required: true },

  // Connections to others
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Point' }],

  // Map appearance
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  layout_image: { type: mongoose.Schema.Types.ObjectId, ref: 'LayoutImage', required: true },

  // Which campus of points are we building
  campus: { type: mongoose.Schema.Types.ObjectId, ref: 'Campus', required: true },
});

// Define the Tour schema
const campusSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Office/Room Locations
const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  occupants: [{ type: String }],
  points: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Point' }]
});



// Define models based on the schemas
const Image = mongoose.model('Image', imageSchema);
const LayoutImage = mongoose.model('LayoutImage', planSchema);
const Room = mongoose.model('Room', roomSchema);
const PointType = mongoose.model('PointType', pointTypeSchema);
const Point = mongoose.model('Point', pointSchema);
const Campus = mongoose.model('Campus', campusSchema);

// Export the models
module.exports = { Image, Point, Campus, PointType, Plan, LayoutImage, Room };
