const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8082;
const db = require('./app/models/');
// const tutorialController = require('./app/controllers/tutorial.controller');
// const commentController = require('./app/controllers/comment.controller');

const app = express();

var corsOptions = {
    origin: 'http://localhost:8082/'
};

app.use(cors());

//parse request of content-type - application/json
app.use(express.json());

//parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//simple route
// app.get('/', (req, res) => {
//     res.json({message: 'Welcome to Luan Braga Application'});
// });

//Include routes
require('./app/routes/tutorial.routes')(app);
require('./app/routes/comment.routes')(app);

//set port, listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

//Sync Database
db.sequelize.sync({force: false}).then(() => {
    console.log('Re-sync database');
    // console.log('Drop and re-sync database');
    // run();
});

//Call conrtollers
// const run = async () => {

//     const tut1 = { id: 1 };
//     const tut2 = { id: 1 };
//     const comment1 = { id: 1 };
//     const comment2 = { id: 2 };
//     const comment3 = { id: 3 };
//     const comment4 = { id: 4 };

//     //Create tutorials
//     const tut1 = await tutorialController.createTutorial({
//         title: "Tut#1",
//         description: "Tut#1 Description",
//     });
    
//     const tut2 = await tutorialController.createTutorial({
//         title: "Tut#2",
//         description: "Tut#2 Description",
//     });

//     //Create comments
//     const comment1 = await commentController.createComment(tut1.id, {
//         name: "Mide mito",
//         text: "Good job!",
//     });

//     await commentController.createComment(tut1.id, {
//         name: "Kone",
//         text: "One of the best tuts!",
//     });

//     const comment2 = await commentController.createComment(tut2.id, {
//         name: "COCO MARAVILHA",
//         text: "Hi, thank you!",
//     });

//     await commentController.createComment(tut2.id, {
//         name: "anotherKoder",
//         text: "Awesome tut!",
//     });

//     //Find tutorial by given id
//     const tut1data = await tutorialController.findTutorialById(tut1.id);
//     console.log(
//         '>> Tutorial id: ' + tut1data.id,
//         JSON.stringify(tut1data, null, 2)
//     );

//     // Find comment by a given id
//     const comment1data = await commentController.findCommentById(comment1.id);
//     console.log(
//         '>> Comment id: ', + comment1data.id,
//         JSON.stringify(comment1data, null, 2)
//     );

//     //Find all tutorials
//     const tutorials = await tutorialController.findAll();
//     console.log('>> All tutorials: ', JSON.stringify(tutorials, null, 2)); 

// };

