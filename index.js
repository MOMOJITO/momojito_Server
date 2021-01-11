const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const config = require('./config/index');
const morgan = require('morgan');
const cors = require('cors');
const { SERVER_PORT } = config;


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true}))
app.use(cookieParser())

//test용
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`)
})