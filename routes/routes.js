const express = require('express');
const app = express();

const auth = require('../controller/auth/index');
const detailpage = require('../controller/detailpage/index');
const mypage = require('../controller/mypage/index');
const mainpage = require('../controller/mainpage/getTopTen');

app.use('/auth', auth);
app.use('/detail', detailpage);
app.use('/mypage', mypage);
app.use('/mainpage', mainpage );

module.exports = app;