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
router.use('/', controller.getAll);

module.exports = router;