const express = require('express');
const router = express.Router();

const signin = require('./signin');
const signout = require('./signout');
const signup = require('./signup');
const accessToken = require('./accesstoken');
const navercallback = require('./oAuth/oauthcallback/navercallback');
const kakaocallback = require('./oAuth/oauthcallback/kakaocallback');
const naverOauth = require('./oAuth/naver');
const kakaoOauth = require('./oAuth/kakao');

router.post('/signin', signin);
router.post('/signout', signout);
router.post('/signup', signup);
router.post('/naver', naverOauth);
router.post('/kakao', kakaoOauth);
router.get('/accesstoken', accessToken);
router.get('/navercallback', navercallback);
router.get('/kakaocallback', kakaocallback);

module.exports = router;