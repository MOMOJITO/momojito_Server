const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_HOST : process.env.DATABASE_HOST,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  AWSAccessKeyId: process.env.AWSAccessKeyId,
  AWSSecretKey: process.env.AWSSecretKey
};