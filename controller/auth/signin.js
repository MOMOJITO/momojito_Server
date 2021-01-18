const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const { TOKEN_SECRET } = config;

module.exports = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'lack of information' });
  } else {
    let userInfo = await User.findOne({
      where: { email },
    });

    if (!userInfo) {
      res.status(401).json({ message: 'no exist Id' });
    } else {
      let passwordCheck = await bcrypt.compare(
        password,
        userInfo.dataValues.password,
      );

      if (passwordCheck) {
        let token = jwt.sign({ email: email }, TOKEN_SECRET);
        res
          .status(200)
          .cookie('token', token)
          .json({ message: 'Sign In completed', token : token });
      } else {
        res.status(402).json({ message: 'wrong password' });
      }
    }
  }
};
