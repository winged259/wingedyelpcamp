const express = require('express');
const router = express.Router();
const catchAsync = require('../helper/catchAsync')
const campground = require('../controllers/campground')
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware')

const multer = require('multer');
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })
    // const upload = multer({ dest: 'uploads/' })


router.route('/')
    .get(catchAsync(campground.renderCampIndex))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campground.makeNewCamp))

router.get('/new', isLoggedIn, campground.renderCampNew)

router.route('/:id')
    .get(catchAsync(campground.renderCampShow))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campground.editCamp))
    .delete(isLoggedIn, isAuthor, catchAsync(campground.deleteCamp))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campground.renderEdit))

module.exports = router;