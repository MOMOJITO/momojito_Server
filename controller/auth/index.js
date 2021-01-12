const express = require('express');
const router = express.Router();

const signin = require('./signin');
const signout = require('./signout');
const signup = require('./signup');

router.post('/signin', signin);
router.post('/signout', signout);
router.post('/signup', signup);

module.exports = router;