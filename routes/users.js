const express = require('express');
const passport = require('passport');
const router = express.Router();
const user = require('../controllers/user')
const catchAsync = require('../helper/catchAsync');


router.route('/register')
    .get(user.renderRegister)
    .post(catchAsync(user.register))

router.route('/login')
    .get(user.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.login)

router.get('/logout', user.logout)

module.exports = router;