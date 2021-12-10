module.exports = app => {
    const comment = require('../controllers/comment.controller');

    var router = require('express').Router();

    router.post('/', comment.create);

    // router.get();
    // router.get();
    // router.get();

    // router.put();

    // router.delete();
    // router.delete();

    app.use('/api/comments', router);
}