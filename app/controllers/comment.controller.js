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
                message: err.message || "Some error occurred while publishing the comment."
            });
        });
}

exports.findAll = (req, res) => {
    Comment.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error ocurred while retrieving comments."
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    Comment.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            }else{
                res.status(404).send({
                    message: `cannot find comment with id = ${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Some error ocurred while retrieving comment with id= ${id}.`
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;

    Comment.destroy({where: {id: id}})
        .then(num => {
            if (num == 1){
                res.send({
                    message: `${id} comment with id = ${id} deleted successfully`
                });
            }else {
                res.send(`Cannot delete comment with id = ${id}. Maybe this comment was not found!`);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `${err.message}` || `Some error occurred while deleting comment with id = ${id}`
            });
        });
}

exports.update = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {where: {id: id}})
        then(num => {
            if (num == 1) {
                res.send({
                    message: 'Comment was updated successfully '
                });
            }else {
                res.send({
                    message: `Cannot update comment with id = ${id}. Maybe comment was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `${err.message}` || `Some error occurred while updating comment with id = ${id}`
            });
        });
};

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