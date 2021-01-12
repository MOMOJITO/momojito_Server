const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const {TOKEN_SECRET} = config;

module.exports = async (req, res) => {
  const token = req.cookies('token');

  if(!token) {
      res.status(400).json({message: 'Fail to get User data(not token)'});
  } else {
      try {
        let tokenData = jwt.verify(token, TOKEN_SECRET);
        let userInfo = await User.findOne({
            where : {email : tokenData.email},
        })
      } catch(err) {
          res.status(500).json({message: 'Fail to get User data'});
      }
  }
};