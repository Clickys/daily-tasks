const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
    debugger;
    console.log('requireAuth middleware');
    const token = req.cookies.get('jwt');
    if (token) {
        jwt.verify(token, 'secret key', (err, decodedToken) => {
            if (err) {
                res.set('Cache-Control', 'no-store');
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                res.status(200);
                next();
            }
        });
    } else {
        res.set('Cache-Control', 'no-store');
        res.redirect('/login');
    }
};

module.exports = { requireAuth };
