const router = require('express').Router();
const userRoutes = require('./../models/users/users.routes');

router.use('/users', userRoutes);

module.exports = router;
