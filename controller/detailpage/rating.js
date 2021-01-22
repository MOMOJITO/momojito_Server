const { User, Rating, Cocktail } = require('../../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const { TOKEN_SECRET } = config;

module.exports = async (req, res) => {
  let token = req.cookies.token;
  let { cocktailId, rating } = req.body;

  if (!token) {
    res.status(400).json({ message: 'Fatil to update rating(not token)' });
  } else {
    try {
      let tokenData = jwt.verify(token, TOKEN_SECRET);
      let userInfo = await User.findOne({
        where: { email: tokenData.email },
      });

      let doubleCheck = await Rating.findOne({
        where: {
          userId: userInfo.dataValues.id,
          cocktailId,
        },
      });
      
      //중복체크
      if (!doubleCheck) {
        await Rating.create({
          userId: userInfo.dataValues.id,
          cocktailId,
          rate: rating,
        });

        calculateRate(cocktailId).then((newRate) => {
          res
          .status(200)
          .json({ rate : newRate, message: 'complete update rating' });
        });

      } else {

        await Rating.update(
          {
            rate : rating
          },
          {
            where : {
              userId : userInfo.dataValues.id,
              cocktailId
            }
          }
        );
        calculateRate(cocktailId).then((newRate) => {
          res
          .status(200)
          .json({ rate : newRate, message: 'complete update rating' });
        });

      }
    } catch (err) {
      res.status(500).json({ message: 'Fail to update rating' });
    }
  }
};

async function calculateRate(cocktailId) {
  let countCocktail = await Rating.findAll({
    attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
    where: { cocktailId },
  }).then((el) => el.map((el2) => el2.dataValues.rate));

  let calculateRate = countCocktail.reduce((el1, el2) => {
    return el1 + el2;
  });

  calculateRate = (calculateRate / countCocktail.length).toFixed(1);

  await Cocktail.update(
    {
      avrRate: calculateRate,
    },
    {
      where: { id: cocktailId },
    },
  );
  return calculateRate;
}
