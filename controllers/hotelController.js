const router = require('express').Router();

router.get('/:id/details', (req, res) => {
    res.render('details', { title: 'Hotel Details' });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create Hotel' });
});

router.get('/:id/edit', (req, res) => {
    res.render('edit', { title: 'Edit Hotel' });
});

module.exports = router;