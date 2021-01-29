const { User, Favorite } = require('../../../models');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { TOKEN_SECRET } = config;

module.exports = (req, res) => {
  // const { authorizationCode } = req.body;
  const { authorizationCode } = req.body;
  console.log(authorizationCode);

  let url = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${config.KAKAO_API_KEY}&redirect_uri=${config.KAKAO_REDIRECT_URI}&code=${authorizationCode}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      let uri = 'https://kapi.kakao.com/v2/user/me';
      fetch(uri, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      })
        .then((res) => res.json())
        .then(async (json) => {
          let checkEmail = await User.findOne({
            where: { email: json.kakao_account.email },
          });

          if (!checkEmail) {
            await User.create({
              email: json.kakao_account.email,
              nickname: json.properties.nickname,
              profile:
                'https://avatars1.githubusercontent.com/u/47313528?s=88&v=4',
            });
            let token = jwt.sign(
              { email: json.kakao_account.email },
              TOKEN_SECRET,
            );

            let userInfo = await User.findOne({
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
              where: { email: json.kakao_account.email },
            });

            res
              .status(200)
              .cookie('token', token, {
                secure: true,
                httpOnly: true,
                sameSite: 'none',
              })
              .json({
                data: {
                  accessToken: token,
                  userInfo: userInfo.dataValues,
                  cocktailList: [],
                },
                message: 'Sign In completed',
              });
          } else {
            let token = jwt.sign(
              { email: json.kakao_account.email },
              TOKEN_SECRET,
            );

            let userInfo = await User.findOne({
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
              where: { email: json.kakao_account.email },
            });

            let cocktailList = await Favorite.findAll({
              where: { userId: userInfo.dataValues.id },
            });

            cocktailList = cocktailList.map((el) => el.dataValues.cocktailId);

            res
              .status(200)
              .cookie('token', token, {
                secure: true,
                httpOnly: true,
                sameSite: 'none',
              })
              .json({
                data: {
                  accessToken: token,
                  userInfo: userInfo.dataValues,
                  cocktailList,
                },
                message: 'Sign In completed',
              });
          }
        });
    });
};