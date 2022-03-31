const router = require('express').Router();
const passport = require('passport');
const messageController = require('./messages.controller');

/**
 * @swagger
 *   /api/messages:
 *     post:
 *       description: Create a new message.
 * 
 *       parameters:
 *         - in: body
 *           name: Message
 *           description: The information about the message.
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - channelId
 *               - content
 *             properties:
 *               userId:
 *                 type: string
 *               channelId:
 *                 type: string
 *               content:
 *                 type: string
 *           
 *       responses:
 *         201:
 *           description: The message has been created.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The id of the created message.
 */
router.post('/',
    passport.authenticate('jwt', {session: false}),
    messageController.createValidator,
    messageController.create
);
/**
 * @swagger
 *   /api/messages:
 *     get:
 *       description: Get all the messages. you can filter the messages by user or channel.
 *       parameters:
 *         - in: query
 *           name: user
 *           schema:
 *             type: string
 *           description: The id of the user to get the messages.
 *         - in: query
 *           name: channel
 *           schema:
 *             type: string
 *           description: The id of the channel to get the messages.
 *       responses:
 *         200:
 *           description: Fetch all the messages.
 */
router.get('/',
    passport.authenticate('jwt', {session: false}),
    messageController.get
);
module.exports = router;