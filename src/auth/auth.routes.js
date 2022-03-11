const router = require('express').Router();
const passport = require('passport');
const controller = require('./auth.controller');

router.post('/login',
    passport.authenticate('local', {session: false}),
    controller.sendToken
)

module.exports = router;