module.exports = app => {
    const tutorial =  require('../controllers/tutorial.controller');

    var router = require('express').Router();

    router.post('/', tutorial.create);

    router.get('/', tutorial.findAll);
    router.get('/published', tutorial.findAllPublished);
    router.get('/:id', tutorial.findOne);

    router.put('/:id', tutorial.update);

    router.delete('/:id', tutorial.delete);

    router.delete('/', tutorial.deleteAll);

    app.use('/api/tutorials', router);
};