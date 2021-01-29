const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const config = require('./config/index');
const morgan = require('morgan');
const cors = require('cors');
const { SERVER_PORT } = config;
const Routes = require('./routes/routes');

//middleware
app.use(cors({
  origin : true, 
  methods : ['POST', 'GET', 'OPTION'],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser());

//route
app.use('/', Routes);

//test용
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(SERVER_PORT, () => {
  console.log(`Server listening at ${SERVER_PORT}`)
})