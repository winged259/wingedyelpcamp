const express = require('express');
const router = express.Router({ mergeParams: true });

const catchAsync = require('../helper/catchAsync')
const review = require('../controllers/review')
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')



router.post('/', validateReview, isLoggedIn, catchAsync(review.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.deleteReview))

module.exports = router;