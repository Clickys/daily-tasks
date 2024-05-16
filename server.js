const express = require('express');
const app = express();
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const taskRouter = require('./routes/TasksRouter.js');
const User = require('./models/User.js');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nodejsapi.dhxbmts.mongodb.net/?retryWrites=true&w=majority&appName=nodejsapi`;
const port = 3000;

// set up handlebars
app.set('view engine', 'hbs');

// set up views directory and public directory
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

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

app.get('/', (req, res) => {
    res.render('login.hbs');
});

app.use('/tasks', taskRouter);

User.create({
    email: 'koc.clicky@gmail.com',
    password: 'password',
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = user && user.password === password;
    if (isPasswordCorrect) {
        const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } else {
        res.send('Login failed');
    }
});

app.get('/protected', (req, res) => {
    const token = req.headers['authorization'];
    console.log(token);

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res
                .status(500)
                .json({ message: 'Failed to authenticate token' });
        }
        // Token is valid
        res.json({ message: 'Welcome to the protected route!', user: decoded });
    });
});
