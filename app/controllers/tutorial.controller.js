const db = require('../models');
const Tutorial = db.tutorials;
const Comment = db.comments;
const Op = db.Sequelize.Op;

//Create and save tutorial
// exports.create = (req, res) => {};
exports.createTutorial = (tutorial) => {
    return Tutorial.create({
        title: tutorial.title,
        description: tutorial.description
    })
    .then((tutorial) => {
        console.log('>> Created tutorial: ' + JSON.stringify(tutorial, null, 4));
        return tutorial;
    })
    .catch((err) => {
        console.log('>> Error while creating tutorial: ', err);
    });
};

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

exports.findTutorialById = (tutorialId) => {
    return Tutorial.findByPk(tutorialId, { include: ["comments"] })
        .then((tutorial) => {
        return tutorial;
    })
    .catch((err) => {
        console.log(">> Error while finding tutorial: ", err);
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

//Retrieve all tutorials from the database
exports.findAll = (req, res) => {};

//Find a single tutorial with an id
exports.findOne = (req, res) => {};

//Update a tutorial by the id in the request
exports.update = (req, res) => {};

//Delete a tutorials with the specified id in the request
exports.delete = (req, res) => {};

//Delete all tutorials from the database
exports.deleteAll = (req, res) => {};

//Find all published Tutorials
exports.findAllPublished = (req, res) => {};