const router = require('express').Router();

const { getAll } = require('../services/hotelService');

// TODO replace with real controller by assignment
router.get('/', async (req, res) => {
    const hotels = await getAll();

    res.render('home', { title: 'Home Page', user: req.user });
});

module.exports = router;
