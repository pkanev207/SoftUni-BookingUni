const router = require('express').Router();

const { create } = require('../services/hotelService');
const { parseError } = require('../util/errorParser');


router.get('/:id/details', (req, res) => {
    res.render('details', { title: 'Hotel Details' });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Hotel' });
});

router.post('/create', async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
        owner: req.user._id,
    };

    try {
        if (Object.values(hotel).some(v => !v)) {
            throw new Error('All fields are required!');
        }

        await create(hotel);
        res.redirect('/');
    } catch (err) {
        res.render('create', {
            title: 'Create Hotel Again!',
            data: hotel,
            errors: parseError(err),
        });
    }
});

router.get('/:id/edit', (req, res) => {
    res.render('edit', { title: 'Edit Hotel' });
});

module.exports = router;