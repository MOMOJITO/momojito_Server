module.exports = (req, res) => {
    const token = req.cookies.token;

    if(!token) {
      res.status(400).json({message : "Fail to SignOut"});
    } else {
      res.clearCookie('token').json({ data: null, message : 'SignOut completed'});
    }
};