const router = require('express').Router();
const controller = require('./channels.controller');
const passport = require('passport');

/**
 * @swagger
 *   /api/channels
 *     post:
 *       description: Create a new channel passing the id of the creator and the name of the channel.
 *       responses: 
 *         201:
 *           The channel has been created
 *         400:
 *           The petition does not follow the format specified.
 *         409:
 *           The channel name is already taken.
 */
router.post('/',
    passport.authenticate('jwt', {session: false}),
    controller.validate,
    controller.nameNotTaken,
    controller.create
);

module.exports = router;