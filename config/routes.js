const homeController = require('../controllers/homeController');
const authController = require('../controllers/authController');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);

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
