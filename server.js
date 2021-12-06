const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8081;
const db = require('./app/models');

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

db.sequelize.sync();