module.exports = app => {
    const tutorials =  require('../controllers/tutorial.controller');
    
    var router = require('express').Router();

    router.post('/', tutorials.create);

    app.use('/api/tutorials', router);
};