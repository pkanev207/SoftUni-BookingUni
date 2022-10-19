const router = require('express').Router();

// TODO replace with real controller by assignment
router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', user: req.user });
});

module.exports = router;
