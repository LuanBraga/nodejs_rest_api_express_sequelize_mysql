const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: 0,

        pool:{
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            accquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorial = require('./tutorial.model.js')(sequelize, Sequelize);
db.comment = require('./comment.model.js')(sequelize, Sequelize);

//implements one to many relationship
db.tutorial.hasMany(db.comment, {as: 'comments'});
db.comment.belongsTo(db.tutorial, {
    foreignKey: 'tutorialId',
    as: 'tutorial'
});

module.exports = db;