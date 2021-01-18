const { User } = require('../../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = async (req, res) => {
  const { email, password, nickname } = req.body;

  let userInfo = await User.findOne({
    where: { email: email },
  });

  let getAllNickname = await User.findAll().then((data) =>
        data.map((el) => el.dataValues.nickname),
      );
      
  let nicknameCheck = getAllNickname.includes(nickname);

  if (!userInfo && !nicknameCheck) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.log('hash', err);
          res.send('hash error');
        }
        await User.create({
          email: email,
          password: hash,
          nickname: nickname,
          profile: 'https://avatars1.githubusercontent.com/u/47313528?s=88&v=4',
        });
        res.status(200).json({ message: 'complete sign up', nickname : nickname });
      });
    });
  } else {
    res.status(400).json({ message: 'Fail to Sign up(ID or nickname overlap)' });
  }
};
