const validator = require('validator');
const router = require('express').Router();
const userService = require('../services/userService');
const { parseError } = require('../util/errorParser');


router.get('/register', (req, res) => {
    res.render('register', { title: 'Register Page' });
});

router.post('/register', async (req, res) => {
    try {
        if (validator.isEmail(req.body.email) == false) {
            throw new Error('Invalid email!');
        }
        if (req.body.username.trim() == '' || req.body.password.trim() == '') {
            throw new Error('All fields are required!');
        }
        if (req.body.password.length < 5) {
            throw new Error('Password must be at least 5 characters long!');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }
        const token = await userService.register(req.body.email, req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        const errors = parseError(error);

        // TODO add error display to actual template from assignment
        res.render('register', {
            title: 'Register Page',
            errors,
            data: { email: req.body.email, username: req.body.username }
        });
    }
});


router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});


router.post('/login', async (req, res) => {
    try {
        if (req.body.email.trim() == '' || req.body.password.trim() == '') {
            throw new Error('All fields are required!');
        }

        const token = await userService.login(req.body.email, req.body.password);

        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        const errors = parseError(error);

        res.render('login', {
            title: 'Login Page',
            errors,
            data: { email: req.body.email }
        });
    }
});


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


module.exports = router;
