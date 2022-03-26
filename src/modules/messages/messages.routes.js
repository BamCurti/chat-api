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
module.exports = router;