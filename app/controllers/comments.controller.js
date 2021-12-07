const db = require('../models');
const Comment = db.comments;
const Op = db.sequelize.Op;

exports.createComment = (tutorialId ,comment) => {
    return Comment.create({
        name: comment.name,
        text: comment.text,
        tutorialId: tutorialId
    })
    .then((comment) => {
        console.log('>> Created comment: ' + JSON.stringify(comment, null, 4));
        return comment;
    })
    .catch((err) => {
        console.log('>> Error while creating comment: ', err);
    });
};


exports.findCommentById = (id) => {
    return Comment.findByPk(id, { include: ["tutorial"] })
        .then((comment) => {
        return comment;
    })
    .catch((err) => {
        console.log(">> Error while finding comment: ", err);
    });
};

exports.findAll = () => {
    return Tutorial.findAll({
      include: ["comments"],
    }).then((tutorials) => {
      return tutorials;
    });
};