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

//Sync Database
db.sequelize.sync({force: false}).then(() => {
    console.log('Drop and re-sync database');
    run();
});

//Call conrtollers
const run = async () => {

    const tut1 = { id: 1 };
    const tut2 = { id: 1 };
    const comment1 = { id: 1 };
    const comment2 = { id: 2 };
    const comment3 = { id: 3 };
    const comment4 = { id: 4 };

    //Create tutorials
    // const tut1 = await controller.createTutorial({
    //     title: "Tut#1",
    //     description: "Tut#1 Description",
    // });
    
    // const tut2 = await controller.createTutorial({
    //     title: "Tut#2",
    //     description: "Tut#2 Description",
    // });

    //Create comments
    // const comment1 = await controller.createComment(tut1.id, {
    //     name: "Mide mito",
    //     text: "Good job!",
    // });

    // await controller.createComment(tut1.id, {
    //     name: "Kone",
    //     text: "One of the best tuts!",
    // });

    // const comment2 = await controller.createComment(tut2.id, {
    //     name: "COCO MARAVILHA",
    //     text: "Hi, thank you!",
    // });

    // await controller.createComment(tut2.id, {
    //     name: "anotherKoder",
    //     text: "Awesome tut!",
    // });

    //Find tutorial by given id
    // const tut1data = await controller.findTutorialById(tut1.id);
    // console.log(
    //     '>> Tutorial id: ' + tut1data.id,
    //     JSON.stringify(tut1data, null, 2)
    // );

    //Find comment by a given id
    const comment1data = await controller.findCommentById(comment1.id);
    console.log(
        '>> Comment id: ', + comment1data.id,
        JSON.stringify(comment1data, null, 2)
    );
};

