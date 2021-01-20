const express = require('express');
const router = express.Router();

const signin = require('./signin');
const signout = require('./signout');
const signup = require('./signup');
const accessToken = require('./accesstoken');
const navercallback = require('./authcallback/navercallback');
const kakaocallback = require('./authcallback/kakaocallback');
const naverOauth = require('./naver');
const kakaoOauth = require('./kakao');

router.post('/signin', signin);
router.post('/signout', signout);
router.post('/signup', signup);
router.post('/naver', naverOauth);
router.post('/kakao', kakaoOauth)
router.get('/accesstoken', accessToken);
router.get('/navercallback', navercallback);
router.get('/kakaocallback', kakaocallback);

module.exports = router;