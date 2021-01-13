const { User } = require('../../models');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');
const bcrypt = require('bcrypt');
const saltRounds = 10; 
const {TOKEN_SECRET} = config;

module.exports = async (req, res) => {
    const token = req.cookies.token;
    const { currentPassword, newPassword } = req.body;

    if(!token) {
        res.status(400).json({message : 'Fail to change your password(not token)'});
    } else {
        try {
            let tokenData = jwt.verify(token, TOKEN_SECRET);
            let userInfo = await User.findOne({
                where : {email : tokenData.email}
            });
            
            let passwordCheck = await bcrypt.compare(currentPassword, userInfo.dataValues.password);
            if(passwordCheck) {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(newPassword, salt, async (err, hash) => {
                        if(err) {
                          console.log("hash", err);
                          res.send("hash error");
                        }
                        await User.update(
                            {
                                password : hash
                            },
                            {
                                where : {email : tokenData.email}
                            }
                        )
                        res.status(200).json({message : 'complete change your password'});
                    })
                });
            } else {
                res.status(400).json({message : 'Fail to change your password(wrong currentPW)'});
            }
        } catch(err) {
            res.statue(500).json({message: 'Fail to chage your password'})
        }
    }
};