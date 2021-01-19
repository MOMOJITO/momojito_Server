const express = require('express');
const router = express.Router();

const signin = require('./signin');
const signout = require('./signout');
const signup = require('./signup');
const accessToken = require('./accesstoken');
const navercallback = require('./authcallback/navercallback');
const naverOauth = require('./naver');

router.post('/signin', signin);
router.post('/signout', signout);
router.post('/signup', signup);
router.post('/naver', naverOauth);
router.get('/accesstoken', accessToken);
router.get('/navercallback', navercallback);

module.exports = router;