const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');

const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgrounds.index))
    // after create new campground
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createNew))

// create new campground
router.get('/new', isLoggedIn, campgrounds.renderNew)

// show page for every campground
router.route('/:id')
    .get(catchAsync(campgrounds.show))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.update))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEdit))


module.exports = router;