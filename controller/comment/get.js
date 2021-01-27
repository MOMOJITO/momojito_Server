const { Comment } = require('../../models');

module.exports = async (req, res) => {
  const { contents } = req.query;

  let commentData = await Comment.findAll({
    order: [['createdAt', 'DESC']],
    where: { contents },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'contents','isUser', 'userId'],
    },
  });
  commentData = commentData.map((el) => el.dataValues);

  res.json({ message: 'complete load comment', data: commentData });
};
