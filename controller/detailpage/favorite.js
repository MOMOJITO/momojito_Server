const { User, Favorite } = require('../../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const {TOKEN_SECRET} = config;

module.exports = async (req, res) => {
    let {cocktailId} = req.body;
    const token = req.cookies.token;

    if(!token) {
        res.status(400).json({ message : 'Fail to add your cocktail(not token)' });
    } else {
        let tokenData = jwt.verify(token, TOKEN_SECRET);
        let userInfo = await User.findOne({
            where : { email : tokenData.email }
        })

        
    }
};