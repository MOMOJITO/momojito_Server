const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
const config = require('../../config/index');
const { TOKEN_SECRET } = config;
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: config.AWSAccessKeyId,
    secretAccessKey: config.AWSSecretKey,
    region : 'ap-northeast-2'
  });

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "momojito", 
        acl: 'public-read-write', 
        key: async (req, file, cb) => {
            let token = req.cookies.token;
            let tokenData = jwt.verify(token, TOKEN_SECRET);
            let userInfo = await User.findOne({
               where : { email: tokenData.email } 
            })
             cb(null, `User/${userInfo.dataValues.email.split('.')[0]}`)
        },
    }),
  });

router.post('/profileChange', upload.single('uploadImg'), async (req, res) => {
    let token = req.cookies.token;
    let tokenData = jwt.verify(token, TOKEN_SECRET);
    await User.update(
        {
            profile : req.file.location
        },
        {
            where : { email : tokenData.email }
        }
    )
    res.status(200).json({ imageUrl : req.file.location, message : 'complete change your profile'});
});

module.exports = router