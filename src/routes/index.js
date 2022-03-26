const router = require('express').Router();
const userRoutes = require('./../modules/users/users.routes');
const channelRoutes = require('./../modules/channels/channels.routes');
const messageRoutes = require('./../modules/messages/messages.routes');
const authRoutes = require('./../auth/auth.routes');

router.use('/users', userRoutes);
router.use('/channels', channelRoutes);
router.use('/messages', messageRoutes);
router.use('/', authRoutes);

module.exports = router;
