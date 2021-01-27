const express = require('express');
const router = express.Router();

const create = require('./create');
const get = require('./get');

router.post('/create', create);
router.get('/get', get);

module.exports = router;
