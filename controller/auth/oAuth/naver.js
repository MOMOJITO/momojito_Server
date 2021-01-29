const { User, Favorite } = require('../../../models');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');
const { TOKEN_SECRET } = config;

module.exports = async (req, res) => {
  const { authorizationCode } = req.body;

  let url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${config.NAVER_API_KEY}&client_secret=${config.NAVER_SECRET}&redirect_uri=${config.NAVER_REDIRECT_URI}&code=${authorizationCode}&state=rara`;

  fetch(url, {
    method: 'GET',
    headers: {
      'X-Naver-Client-Id': config.NAVER_API_KEY,
      'X-Naver-Client-Secret': config.NAVER_SECRET,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      fetch('https://openapi.naver.com/v1/nid/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      })
        .then((res) => res.json())
        .then(async (json) => {

          let checkEmail = await User.findOne({
            where: { email: json.response.email },
          });

          if (!checkEmail) {
            await User.create({
              email: json.response.email,
              nickname: json.response.nickname,
              profile: json.response.profile_image,
            });
            //여기서 db에 이메일 저장하고 jwt토큰발급.. 그리고 쿠키로 전송
            let token = jwt.sign({ email: json.response.email }, TOKEN_SECRET);

            let userInfo = await User.findOne({
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
              where: { email: json.response.email },
            });

            res
              .status(200)
              .cookie('token', token, {
                secure: true,
                httpOnly: true,
                sameSite: 'None',
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
            let token = jwt.sign({ email: json.response.email }, TOKEN_SECRET);

            let userInfo = await User.findOne({
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
              where: { email: json.response.email },
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
                sameSite: 'None',
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
