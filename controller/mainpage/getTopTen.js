const { Cocktail, Rating } = require('../../models');

module.exports = async (req, res) => {
    //실제 로직
    let cocktailData = await Cocktail.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'name']
        },
    })
    cocktailData = cocktailData.map((el) => el.dataValues);

    for(let i=0; i<cocktailData.length; i++) {
        let countNumber = await Rating.findAll({
            where : {cocktailId : cocktailData[i].id}
        })
        cocktailData[i].number = String(countNumber.length);
    }

    res.status(200).json({ data : cocktailData, message : 'complete load top10 data' });
};