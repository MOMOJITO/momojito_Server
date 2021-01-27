const { Comment, User } = require('../../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const { TOKEN_SECRET } = config;
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

module.exports = async (req, res) => {
  let token = req.cookies.token;
  const { text } = req.body;
  const { contents } = req.query;

  if (!token) {
      res.status(400).json({ message: 'Fail to create comment(not token)' });
  } else {
    try {
      let tokenData = jwt.verify(token, TOKEN_SECRET);
      
      let userInfo = await User.findOne({
        where: { email: tokenData.email },
      });

      const date = moment().format('YYYY년 MM월 DD일');

      await Comment.create({
        userId: userInfo.dataValues.id,
        nickname : userInfo.dataValues.nickname,
        text,
        contents,
        profile: userInfo.dataValues.profile,
        date
      });
    } catch (err) {
      res.status(500).json({ message: 'Fail to create comment' });
    }
  }
};
