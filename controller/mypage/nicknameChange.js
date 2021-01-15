const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const { TOKEN_SECRET } = config;

module.exports = async (req, res) => {
  const token = req.cookies.token;
  const { nickname } = req.body;

  if (!token) {
    res
      .status(400)
      .json({ messsage: 'Fail to change your ickname(not token)' });
  } else {
    try {
      let tokenData = jwt.verify(token, TOKEN_SECRET);
      let getAllNickname = await User.findAll().then((data) =>
        data.map((el) => el.dataValues.nickname),
      );

      //닉네임 중복검사
      if (getAllNickname.includes(nickname)) {
        res
          .status(400)
          .json({ message: 'Fail to change your nickname(already exists)' });
      } else {
        await User.update(
          {
            nickname,
          },
          {
            where: { email: tokenData.email },
          },
        );
        res.status(200).json({ message: 'complete change your nickname' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Fail to change your nickname' });
    }
  }
};
