const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/TasksRouter.js');

require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nodejsapi.dhxbmts.mongodb.net/?retryWrites=true&w=majority&appName=nodejsapi`;
const port = 3000;

// set up handlebars
app.set('view engine', 'hbs');

// set up views directory and public directory
app.set('views', path.join(__dirname, 'views'));
express.static(path.join(__dirname, 'public'));

// Connect to MongoDB
mongoose
    .connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// body parser middleware to parse request body as JSON and URL encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/tasks', taskRouter);
