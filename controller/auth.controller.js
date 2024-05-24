const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Cookies = require('cookies');

handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    return errors;
};

createToken = async (id) => {
    return (token = await jwt.sign({ id }, 'secret key', {
        expiresIn: '30s',
    }));
};
registration = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        //using jwt to create a token if you use the call back function the token will be returned as a promise
        const token = await createToken(user._id);
        const cookies = new Cookies(req, res);
        cookies.set('jwt', token, {
            httpOnly: true,
            maxAge: 1000 * 30,
        });

        res.status(201).redirect('/tasks');
    } catch (error) {
        errors = handleErrors(error);
        res.json(errors);
    }
};

login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        if (!user) {
            throw Error('incorrect credentials');
        }
        const token = await createToken(user._id);
        const cookies = new Cookies(req, res);
        cookies.set('jwt', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 30,
        });
        res.status(200).redirect('/tasks');
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = { registration, login };
