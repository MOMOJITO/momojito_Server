const { User, Favorite } = require('../../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const { TOKEN_SECRET } = config;

module.exports = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(400).json({ message: 'not token' });
  } else {
    try {
      let tokenData = jwt.verify(token, TOKEN_SECRET);
      if (!tokenData) {
        res.state(400).json({ message: 'This is not valid token(not token)' });
      } else {
        let userInfo = await User.findOne({
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
          where: { email: tokenData.email },
        });
        console.log("aa",userInfo.dataValues);
        let cocktailList = await Favorite.findAll({
          where: { userId: userInfo.dataValues.id },
        });
        cocktailList = cocktailList.map((el) => el.dataValues.cocktailId);
        console.log("bb",cocktailList);
        res.status(200).json({
          data: {
            accessToken : token,
            userInfo : userInfo.dataValues,
            cocktailList
          },
        });
      }
    } catch (err) {
      res.status(400).json({ message: 'This is not valid token' });
    }
  }
};
