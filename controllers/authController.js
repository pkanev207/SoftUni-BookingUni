const router = require('express').Router();
const userService = require('../services/userService');
const { parseError } = require('../util/errorParser');

router.get('/register', (req, res) => {
    // TODO replace with actual view from assignment
    res.render('register', { title: 'Register Page' });
});

router.post('/register', async (req, res) => {
    try {
        if (req.body.username.trim() == '' || req.body.password.trim() == '') {
            throw new Error('All fields are required!');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }
        const token = await userService.register(req.body.username, req.body.password);

        // TODO check assignment to see if register creates session
        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        const errors = parseError(error);

        // TODO add error display to actual template from assignment
        res.render('register', {
            title: 'Register Page',
            errors,
            data: { username: req.body.username }
        });
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

router.post('/login', async (req, res) => {
    try {
        if (req.body.username.trim() == '' || req.body.password.trim() == '') {
            throw new Error('All fields are required!');
        }

        const token = await userService.login(req.body.username, req.body.password);

        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        const errors = parseError(error);

        res.render('login', {
            title: 'Login Page',
            errors,
            data: { username: req.body.username }
        });
    }
});

module.exports = router;
