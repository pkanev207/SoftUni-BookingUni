const router = require('express').Router();

const { getAll } = require('../services/hotelService');


router.get('/', async (req, res) => {
    const hotels = await getAll();

    res.render('home', { title: 'Home Page', hotels });
});

module.exports = router;
