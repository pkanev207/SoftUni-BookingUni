const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');
const hotelController = require('../controllers/hotelController');
const profileController = require('../controllers/profileController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/hotel', hotelController);
    // '/hotel/:id/details' - to see the room
    app.use('/profile', profileController);

    // app.get('/error', (req, res, next) => {
    //     throw new Error('propagating error');
    //     next(new Error('propagating error'));
    // });

    // app.use((err, req, res, next) => {
    //     console.log('Global error handling');
    //     console.log(err.message);
    //     res.redirect('/');
    // });
};
