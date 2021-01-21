const config = require('../../../../config/index');

module.exports = async (req,res) => {
    console.log(req.originalUrl);
    let authorizationCode = req.originalUrl.split('=')[1];
    authorizationCode = authorizationCode.split('&')[0];
    console.log("authorization Code:",authorizationCode);
    
    res.redirect(`${config.SERVICE_URI}/signin/?code=${authorizationCode}&site=naver`)

}