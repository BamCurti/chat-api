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
 * 
 */
router.post('/', controller.create);

module.exports = router;