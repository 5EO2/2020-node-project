const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 8080;

const Book = require('./models/book.js');
const { static } = require('express');

const route = require('./routes/router.js')(app, Book);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log("connected to mongoDB server");
});

mongoose.connect('mongodb://localhost/movies', {useNewUrlParser: true});
//mongoose.connect('mongodb://seo0814:seoPB0814?@localhost:27017/movieAPI', {useNewUrlParser: true});

const server = app.listen(port, () => {
    console.log("express server has started on port " + port);
});
