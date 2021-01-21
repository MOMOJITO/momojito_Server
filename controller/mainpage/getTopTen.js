const { Cocktail } = require('../../models');

module.exports = async (req, res) => {
    //실제 로직
    let cocktailData = await Cocktail.findAll({
        order: [['avrRate', 'DESC']],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'name']
        },
    })
    cocktailData = cocktailData.map((el) => el.dataValues);

    res.status(200).json({ data : cocktailData, message : 'complete load top10 data' });

    //테스트용
    // let obj = {};
    // for(let i=1; i<17; i++) {
    // let randomNum = Math.floor(Math.random()*6);
    //     obj[i] = randomNum;
    // }

    // res.status(200).json({ data : obj, message : 'complete load top10 data'});


};