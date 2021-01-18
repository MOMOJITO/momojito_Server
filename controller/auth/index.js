const express = require('express');
const router = express.Router();

const signin = require('./signin');
const signout = require('./signout');
const signup = require('./signup');
const accessToken = require('./accesstoken');

router.post('/signin', signin);
router.post('/signout', signout);
router.post('/signup', signup);
router.get('/accesstoken', accessToken)

module.exports = router;