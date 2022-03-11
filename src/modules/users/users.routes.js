const router = require('express').Router();
const controller = require('./users.controller');

/**
 * @swagger
 *   /api/users:
 *     get:
 *       description: Get all the users
 *       responses:
 *         200:
 *           Get a list of the users
 * 
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/users:
 *   post:
 *     description: Create a new user.
 *       responses:
 *         201:
 *           A new user is created.
 *         400:
 *           The petition does not follow the format specified.
 *         409:
 *           The user already exists.
 */
router.post('/', controller.create);

/**
 * 
 */

module.exports = router;