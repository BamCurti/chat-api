const router = require('express').Router();
const controller = require('./channels.controller');
const userController = require('./../users/users.controller');
const passport = require('passport');

/**
 * @swagger
 *   /api/channels:
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
/**
 * @swagger
 *   /api/channels/{channelId}:
 *     get:
 *       description: Get the information an the invitation link of the channel.
 *       responses:
 *         200: 
 *           description: It returns the information of the channel.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: the id of the channel.
 *                       name:
 *                         type: string
 *                         description: The name of the channel.
 *                       creator:
 *                         type: string
 *                         description: The id of the channel creator.
 *                       url:
 *                         type: string
 *                         description: The url that the user will be redirected to.
 *         400:
 *           description: The petition does not follow the format specified.
 *         404:
 *           description: The required channel does not exist.
 */
router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    controller.get
);
/**
 * @swagger
 *   /api/channels/{id}:
 *     patch:
 *       description: Add a member to a channel.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: Hex ID of the channel to be added.
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The id of the user to add to the channel.
 *       responses:
 *         200:
 *           description: user has successfully added the channel.
 *         400:
 *           description: The petition does not follow the format specified.
 *         401:
 *           description: The bearer token is invalid.
 *         409:
 *           description: The user is already added to the channel.
 */
router.patch('/:id',
    passport.authenticate('jwt', {session: false}),
    controller.addUserValidator,
    controller.addUser
)

module.exports = router;