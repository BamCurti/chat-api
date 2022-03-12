const router = require('express').Router();
const passport = require('passport');

router.post('/',
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
    const body = req.body;
    res.json(body);
});

module.exports = router;