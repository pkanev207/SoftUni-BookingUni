const router = require('express').Router();

const { create, getById, update } = require('../services/hotelService');
const { parseError } = require('../util/errorParser');


router.get('/:id/details', async (req, res) => {
    const hotel = await getById(req.params.id);
    console.log(hotel);

    res.render('details', { title: 'Hotel Details', ...hotel });
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

router.get('/:id/edit', async (req, res) => {
    const hotel = await getById(req.params.id);

    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    res.render('edit', { title: 'Edit Hotel', hotel });
});

router.post('/:id/edit', async (req, res) => {
    const hotel = await getById(req.params.id);

    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    const edited = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: Number(req.body.rooms),
    };

    try {
        if (Object.values(edited).some(v => !v)) {
            throw new Error('All fields are required!');
        }

        await update(req.params.id, edited);
        res.redirect(`/hotel/${req.params.id}/details`);
    } catch (err) {
        res.render('edit', {
            title: 'Edit Hotel Again!',
            hotel: Object.assign(edited, { _id: req.params.id }),
            // because we need the id for the address to work,
            errors: parseError(err),
        });
    }
});

module.exports = router;
