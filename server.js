const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/TasksRouter.js');
const authRoutes = require('./routes/authRoutes.js');
const authorization = require('./middleware/authorization.js');
const Cookies = require('cookies');

// const User = require('./models/User.js');
// const jwt = require('jsonwebtoken');

require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nodejsapi.dhxbmts.mongodb.net/?retryWrites=true&w=majority&appName=nodejsapi`;
const port = 3000;

// set up handlebars
app.set('view engine', 'hbs');

// set up views directory and public directory
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(Cookies.express());

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

hbs.registerHelper('formatDate', (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
});

// body parser middleware to parse request body as JSON and URL encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/tasks', authorization.requireAuth, taskRouter);
app.use('/', authRoutes);
