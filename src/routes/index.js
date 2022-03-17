const router = require('express').Router();
const userRoutes = require('./../modules/users/users.routes');
const channelRoutes = require('./../modules/channels/channels.routes');
const authRoutes = require('./../auth/auth.routes');

router.use('/users', userRoutes);
router.use('/channels', channelRoutes);
router.use('/', authRoutes);

module.exports = router;
