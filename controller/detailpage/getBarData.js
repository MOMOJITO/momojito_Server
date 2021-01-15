const { Bar } = require('../../models');

module.exports = async (req, res) => {
  let barData = await Bar.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  }).then((el) => el.map((el2) => el2.dataValues));

  if (barData.length) {
    res.status(200).json({ data: barData, message: 'complete load Bar data' });
  } else {
    res.json({ data: [], message: 'no bar data in DB' });
  }
};
