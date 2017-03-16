var express = require('express');
var router = express.Router();
var orderController = require('./orderController.js');

/*
 * GET
 */
router.get('/all', orderController.list);

/*
 * GET
 */
router.get('/one/:id', orderController.show);

/*
 * POST
 */
router.post('/', orderController.create);

/*
 * PUT
 */
router.put('/:id', orderController.update);

/*
 * DELETE
 */

router.get('/summary', orderController.getOrders)
router.delete('/:id', orderController.remove);

module.exports = router;
