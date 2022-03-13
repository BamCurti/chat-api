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
    controller.validateCreationForm,
    controller.nameNotTaken,
    controller.create
);
router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    controller.validateLinkForm,
    controller.createdBy,
    controller.get
)

module.exports = router;