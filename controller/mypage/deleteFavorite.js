const { User, Favorite } = require('../../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const { TOKEN_SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.token;
  const { cocktailId } = req.body;

  if (!token) {
    res.json({ message: 'Fail to remove your cocktail(not token)' });
  } else {
    try {
      let tokenData = jwt.verify(token, TOKEN_SECRET);
      let userInfo = await User.findOne({
        where: { email: tokenData.email },
      });
      
      await Favorite.destroy({
        where: {
          userId: userInfo.dataValues.id,
          cocktailId,
        }
      });
      res.status(200).json({ message: 'complete remove your cocktail' });
    } catch (err) {
      res.status(500).json({ message: 'Fail to remove your cocktail' });
    }
  }
};
