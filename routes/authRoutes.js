const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller.js');

router.post('/register', authController.registration);
router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/', (req, res) => {
    res.render('login');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', authController.login);
module.exports = router;
