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
  AWSSecretKey: process.env.AWSSecretKey,
  KAKAO_API_KEY: process.env.KAKAO_API_KEY,
  NAVER_API_KEY: process.env.NAVER_API_KEY,
  NAVER_SECRET: process.env.NAVER_SECRET,
  NAVER_REDIRECT_URI: process.env.NAVER_REDIRECT_URI,
  KAKAO_REDIRECT_URI: process.env.KAKAO_REDIRECT_URI,
  SERVICE_URI: process.env.SERVICE_URI,
};