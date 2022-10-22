const router = require('express').Router();

const { create, getById, update, deleteById, bookRoom } = require('../services/hotelService');
const { parseError } = require('../util/errorParser');


router.get('/:id/details', async (req, res) => {
    const hotel = await getById(req.params.id);
    // console.log(hotel);

    if (hotel.owner == req.user._id) {
        hotel.isOwner = true;
    } else if (hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
        hotel.isBooked = true;
    }

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

router.get('/:id/delete', async (req, res) => { // /hotel/{{_id}}/delete
    const hotel = await getById(req.params.id);

    if (hotel.owner != req.user._id) {
        return res.redirect('/auth/login');
    }

    await deleteById(req.params.id);
    res.redirect('/');
});

router.get('/:id/book', async (req, res) => { // /hotel/{{_id}}/book
    const hotel = await getById(req.params.id);

    try {
        if (hotel.owner == req.user._id) {
            hotel.isOwner = true;
            throw new Error('Cannot book your own hotel!');
        }

        if (hotel.bookings.map(b => b.toString()).includes(req.user._id.toString())) {
            hotel.isBooked = true;
            throw new Error('Cannot book twice!');
        }

        await bookRoom(req.params.id, req.user._id);
        res.redirect(`/hotel/${req.params.id}/details`);
    } catch (err) {
        res.render('details', {
            title: 'Hotel Details',
            ...hotel,
            errors: parseError(err),
        });
    }
});

module.exports = router;
