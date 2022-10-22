const router = require('express').Router();

const { getByUserBooking } = require('../services/hotelService');


router.get('/', async (req, res) => {
    const bookings = await getByUserBooking(req.user._id);

    res.render('profile', {
        title: 'Profile Page',
        user: Object.assign({ bookings: bookings.map(b => b.name) }, req.user),
        // user: Object.assign({ bookings }, req.user),
    });
});

module.exports = router;