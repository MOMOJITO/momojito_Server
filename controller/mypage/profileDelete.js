const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const config = require('../../config/index');
const { TOKEN_SECRET } = config;
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: config.AWSAccessKeyId,
    secretAccessKey: config.AWSSecretKey,
    region : 'ap-northeast-2'
  });

const s3 = new AWS.S3();

router.post('/profileDelete', async (req, res) => {
    const token = req.cookies.token;
  
    if (!token) {
      res.status(400).json({ message: 'Fail to delete your profile(not token)' });
    } else {
      try {
          let tokenData = jwt.verify(token, TOKEN_SECRET);
          let userInfo = await User.findOne({
            where : { email: tokenData.email }
          });

          const params = {
            Bucket: 'momojito',
            Key: `User/${userInfo.dataValues.email.split('.')[0]}`
          }
          s3.deleteObject(params, async (err, data) => {
            if (err) {
              console.log(err, err.stack);
            } else {
              await User.update(
                {
                  profile : "https://avatars1.githubusercontent.com/u/47313528?s=88&v=4"
                },
                {
                  where : {email : tokenData.email}
                }
              )
              res.status(200).json({ imageUrl: "https://avatars1.githubusercontent.com/u/47313528?s=88&v=4" });
            }
          })
      } catch (err) {
        res.status(500).json({ message : 'Fail to delete your image' });
      }
    }
  });

module.exports = router