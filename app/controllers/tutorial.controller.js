const db = require('../models');
const Tutorial = db.tutorial;
const Op = db.Sequelize.Op;

//Create and save tutorial
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: 'Content can be empty!'
        });
        return;
    }

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Tutorial.'
            });
        });
};

//Retrieve all tutorials from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: { [Op.like]: `%${title}%`} } : null;

    Tutorial.findAll({where: condition, include: ["comments"]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message ||  "Some error occurred while retrieving tutorials."
            })
        });
};

//Find a single tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    
    Tutorial.findByPk(id, {include: ["comments"]})
        .then(data => {
            if (data) {
                res.send(data);
            }else {
                res.status(404).send({
                    message: `Cannot find tutorial with id = ${id}` 
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `${err.message}` || `Some error occurred while retrieving tutorial with id = ${id}`
            });
        });
};

//Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving published tutorials."
            });
        });
};

//Update a tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {where: {id: id}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Tutorial was updated successfully '
                });
            }else {
                res.send({
                    message: `Cannot update Tutorial with id = ${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `${err.message}` || `Some error occurred while updating tutorial with id = ${id}`
            });
        });
};

//Delete a tutorials with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({where: {id: id}})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Tutorial was deleted successfully!'
                });
            }else {
                res.send({
                    message: `Cannot delete Tutorial with id = ${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `${err.message}` || `Some error occurred while deleting tutorial with id = ${id}`
            });
        });
};

//Delete all tutorials from the database
exports.deleteAll = (req, res) => {
    Tutorial.destroy({where: {}, truncate: false})
        .then(nuns => {
            res.send({
                message: `${nuns} tutorials were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// exports.createTutorial = (tutorial) => {
//     return Tutorial.create({
//         title: tutorial.title,
//         description: tutorial.description
//     })
//     .then((tutorial) => {
//         console.log('>> Created tutorial: ' + JSON.stringify(tutorial, null, 4));
//         return tutorial;
//     })
//     .catch((err) => {
//         console.log('>> Error while creating tutorial: ', err);
//     });
// };


// exports.findTutorialById = (tutorialId) => {
//     return Tutorial.findByPk(tutorialId, { include: ["comments"] })
//         .then((tutorial) => {
//         return tutorial;
//     })
//     .catch((err) => {
//         console.log(">> Error while finding tutorial: ", err);
//     });
// };


// exports.findAll = () => {
//     return Tutorial.findAll({
//       include: ["comments"],
//     }).then((tutorials) => {
//       return tutorials;
//     });
// };