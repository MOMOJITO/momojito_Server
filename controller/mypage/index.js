const express = require('express');
const router = express.Router();

const getMyCocktail = require('./getMyCocktail');
const getUserData = require('./getUserData');
const nicknameChange = require('./nicknameChange');
const passwordChange = require('./passwordChange');
const profileChange = require('./profileChange');

router.get('/getMyCocktail', getMyCocktail);
router.get('/getUserData', getUserData);
router.post('/nicknameChange', nicknameChange);
router.post('/passwordChange', passwordChange);
router.post('/profileChange', profileChange);

module.exports = router;