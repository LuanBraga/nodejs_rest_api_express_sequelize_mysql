const sql = require('./db');

const Tutorial = function(tutorial) {
    this.title = tutorial.title;
    this.description = tutorial.description;
    this.published = tutorial.published;
};

Tutorial.create = (newTutorial, result) => {
    sql.query('INSERT INTO tutorials SET ?', newTutorial, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log('created tutorial: ', {id: res.insertId, ...newTutorial});
        result(null, {id: res.insertId, ...newTutorial});
    });
};

