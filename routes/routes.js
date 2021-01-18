const express = require('express');
const app = express();

const auth = require('../controller/auth/index');
const detailpage = require('../controller/detailpage/index');
const mypage = require('../controller/mypage/index');
const mainpage = require('../controller/mainpage/getTopTen');
const profileChange = require('../controller/mypage/profileChange');
const profileDelete = require('../controller/mypage/profileDelete');

app.use('/auth', auth);
app.use('/detail', detailpage);
app.use('/mypage/profileChage', profileChange);
app.use('/mypage/profileDelete', profileDelete);
app.use('/mypage', mypage);
app.use('/mainpage/getTopTen', mainpage );

module.exports = app;