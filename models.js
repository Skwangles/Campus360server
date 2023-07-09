const mongoose = require('mongoose');

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/virtualtour', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the Image schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: true
 *         base64:
 *           type: string
 *           required: true
 */

const imageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  base64: { type: String, required: true },
});


// Define the Area schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Area:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: true
 *         base64:
 *           type: string
 *           required: true
 */

const areaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  campus: { type: mongoose.Schema.Types.ObjectId, ref: "Campus" },
  base64: { type: String, required: true },
});


// Define the PointType schema
/**
 * @swagger
 * components:
 *   schemas:
 *     PointType:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *           required: true
 */

const pointTypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
});


// Define the Point schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Point:
 *       type: object
 *       properties:
 *         image:
 *           type: string
 *           format: uuid
 *           required: true
 *         pan_offset:
 *           type: number
 *           default: 0
 *         tilt_offset:
 *           type: number
 *           default: 0
 *         type:
 *           type: string
 *           format: uuid
 *           required: true
 *         links:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *         x:
 *           type: number
 *           required: true
 *         y:
 *           type: number
 *           required: true
 *         area:
 *           type: string
 *           format: uuid
 *           required: true
 *         campus:
 *           type: string
 *           format: uuid
 *           required: true
 */

const pointSchema = new mongoose.Schema({
  image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
  pan_offset: { type: Number, default: 0 },
  tilt_offset: { type: Number, default: 0 },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'PointType', required: true },
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Point' }],
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  area: { type: mongoose.Schema.Types.ObjectId, ref: 'Area', required: true },
  campus: { type: mongoose.Schema.Types.ObjectId, ref: 'Campus', required: true },
});


// Define the Campus schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Campus:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: true
 */

const campusSchema = new mongoose.Schema({
  name: { type: String, required: true },
});


// Office/Room Locations
/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         name```javascript
 *           type: string
 *           required: true
 *         occupants:
 *           type: array
 *           items:
 *             type: string
 *         points:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 */

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  occupants: [{ type: String }],
  points: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Point' }]
});


// Define models based on the schemas
const Image = mongoose.model('Image', imageSchema);
const Area = mongoose.model('Area', areaSchema);
const Room = mongoose.model('Room', roomSchema);
const PointType = mongoose.model('PointType', pointTypeSchema);
const Point = mongoose.model('Point', pointSchema);
const Campus = mongoose.model('Campus', campusSchema);

// Export the models
module.exports = { Image, Point, Campus, PointType, Area, Room };

