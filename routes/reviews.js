const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');

// create reviews
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.create));

// delete review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.delete));

module.exports = router;