const { User, Favorite } = require('../../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const {TOKEN_SECRET} = config;

module.exports = async (req, res) => {
  let token = req.cookies.token;
  
  if(!token) {
    res.status(400).json({message : 'Fail to get your cocktail(not token)'});
  } else {
    try {
      let tokenData =  await jwt.verify(token, TOKEN_SECRET);
      let userInfo = await User.findOne({
          where : {email : tokenData.email}
      });

      let favorites = await Favorite.findAll({
          where : {userId : userInfo.dataValues.id}
      });
      
      favorites = favorites.map((el) => el.dataValues.cocktailId);
      res.status(200).json({data : favorites, message : 'complete get your cocktails'});
    } catch(err) {
      res.status(500).json({message : 'Fail to get your cocktail'});
    }
  }
};