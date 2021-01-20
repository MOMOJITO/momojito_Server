module.exports = async (req,res) => {
    console.log(req.originalUrl);
    let authorizationCode = req.originalUrl.split('=')[1];
    authorizationCode = authorizationCode.split('&')[0];
    console.log("authorization Code:",authorizationCode);
    
    res.redirect(`http://localhost:3000/signin/?code=${authorizationCode}&site=kakao`)

}