const db = require('../models');
const Tutorial = db.tutorials;
const Comment = db.comments;
const Op = db.Sequelize.Op;


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

    Tutorial.findAll({where: condition})
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
    
    Tutorial.findByPk(id)
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
            })
        })
};

//Update a tutorial by the id in the request
// exports.update = (req, res) => {};

//Delete a tutorials with the specified id in the request
// exports.delete = (req, res) => {};

//Delete all tutorials from the database
// exports.deleteAll = (req, res) => {};

//Find all published Tutorials
// exports.findAllPublished = (req, res) => {};