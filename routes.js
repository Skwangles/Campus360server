const express = require('express');
const router = express.Router();

const images = require('./endpoints/images')
const campuses = require('./endpoints/campuses')
const areas = require('./endpoints/areas')
const points = require('./endpoints/points')
const pointtypes = require('./endpoints/pointtypes')
const rooms = require('./endpoints/rooms')


router.use('/images', images);
router.use('/campuses', campuses);
router.use('/areas', areas);
router.use('/points', points);
router.use('/pointtypes', pointtypes);
router.use('/rooms', rooms);

module.exports = router;
