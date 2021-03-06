const express = require('express');
const bodyParser = require('body-parser');
const userModel = require('./routes/user')
const eventModel = require('./routes/events')
const app = express();


const mongoose = require('mongoose');
let dev_db_url = "mongodb+srv://Petrukhinilya:zagune92@cluster0.gfevo.mongodb.net/Users?retryWrites=true&w=majority"
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');

    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', userModel);
app.use('/event',eventModel)

let port = 1133;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
