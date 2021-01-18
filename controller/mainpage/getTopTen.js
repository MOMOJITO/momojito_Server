const { Cocktail } = require('../../models');

module.exports = async (req, res) => {
    //실제 로직
    let cocktailData = await Cocktail.findAll({
        order: [['avrRate', 'DESC']],
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'name']
        },
        limit : 10
    })
    cocktailData = cocktailData.map((el) => el.dataValues);

    //객체의 프로퍼티에 숫자를 넣을때 오름차순으로 정렬되서 들어감.
    let obj = {};
    cocktailData.forEach((el) => {
        console.log(el.id);
        obj[el.id] = el.avrRate
        return;
    })

    res.status(200).json({ data : obj, message : 'complete load top10 data'});
    

    //테스트용
    // let obj = {};
    // for(let i=1; i<17; i++) {
    // let randomNum = Math.floor(Math.random()*6);
    //     obj[i] = randomNum;
    // }

    // res.status(200).json({ data : obj, message : 'complete load top10 data'});


};