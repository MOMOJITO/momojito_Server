const express = require('express');
const router = express.Router();

const deleteFavorite = require('./deleteFavorite');
const favorite = require('./favorite');
const getBarData = require('./getBarData');
const rating = require('./rating');

router.post('/deleteFavorite', deleteFavorite);
router.post('/favorite', favorite);
router.get('/getBarData', getBarData);
router.post('/rating', rating);

module.exports = router;