const db = require('../models');
const Comment = db.comment;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.name || !req.body.text || !req.body.tutorialId) {
        res.status(404).send({
            message: 'Contents cannot be empty'
        });
        return;
    }
    const comment = {
        name:req.body.name,
        text: req.body.text,
        tutorialId: req.body.tutorialId,
    }

    Comment.create(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while publish the comment."
            });
        });
}

// exports.createComment = (tutorialId ,comment) => {
//     return Comment.create({
//         name: comment.name,
//         text: comment.text,
//         tutorialId: tutorialId
//     })
//     .then((comment) => {
//         console.log('>> Created comment: ' + JSON.stringify(comment, null, 4));
//         return comment;
//     })
//     .catch((err) => {
//         console.log('>> Error while creating comment: ', err);
//     });
// };


// exports.findCommentById = (id) => {
//     return Comment.findByPk(id, { include: ["tutorial"] })
//         .then((comment) => {
//         return comment;
//     })
//     .catch((err) => {
//         console.log(">> Error while finding comment: ", err);
//     });
// };

// exports.findAll = () => {
//     return Tutorial.findAll({
//       include: ["comments"],
//     }).then((tutorials) => {
//       return tutorials;
//     });
// };