var express = require('express');
var router = express.Router();
var customerController = require('./customerController.js');

/*
 * GET
 */
router.get('/', customerController.list);

/*
 * GET
 */
router.get('/:id', customerController.show);

/*
 * POST
 */
router.post('/', customerController.create);

/*
 * PUT
 */
router.put('/:id', customerController.update);

/*
 * DELETE
 */
router.delete('/:id', customerController.remove);

module.exports = router;
