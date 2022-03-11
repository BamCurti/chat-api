const router = require('express').Router();
const userRoutes = require('./../modules/users/users.routes');
const authRoutes = require('./../auth/auth.routes');

router.use('/users', userRoutes);
router.use('/', authRoutes);

module.exports = router;
