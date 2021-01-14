const { User, Favorite } = require('../../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const {TOKEN_SECRET} = config;

module.exports = async (req, res) => {
    let { cocktailId } = req.body;
    const token = req.cookies.token;

    if(!token) {
        res.status(400).json({ message : 'Fail to add your cocktail(not token)' });
    } else {
        try {
            let tokenData = jwt.verify(token, TOKEN_SECRET);
            let userInfo = await User.findOne({
                where : { email : tokenData.email }
            });
            
            await Favorite.create({
                userId : userInfo.dataValues.id,
                cocktailId
            })
            res.status(200).json({ message : 'complete add your cocktail' });
        } catch(err) {
            res.status(500).json({ message : 'Fail to add your cocktail' });
        }
    }
};