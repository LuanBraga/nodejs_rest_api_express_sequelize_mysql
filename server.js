const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8081;
const db = require('./app/models');
const controller = require('./app/controllers/tutorial.controller');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

//parse request of content-type - application/json
app.use(express.json());

//parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//simple route
app.get('/', (req, res) => {
    res.json({message: 'Welcome to Luan Braga Application'});
});


//set port, listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and re-sync database');
    run();
});

const run = async () => {
    const tut1 = await controller.createTutorial({
        title: "Tut#1",
        description: "Tut#1 Description",
    });
    
    const tut2 = await controller.createTutorial({
        title: "Tut#2",
        description: "Tut#2 Description",
    });

    const comment1 = await controller.createComment(tut1.id, {
        name: "Mide mito",
        text: "Good job!",
    });

    await controller.createComment(tut1.id, {
        name: "Kone",
        text: "One of the best tuts!",
    });

    const comment2 = await controller.createComment(tut2.id, {
        name: "COCO MARAVILHA",
        text: "Hi, thank you!",
    });

    await controller.createComment(tut2.id, {
        name: "anotherKoder",
        text: "Awesome tut!",
    });
};

