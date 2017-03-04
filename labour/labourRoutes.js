var express = require('express');
var router = express.Router();
var labourController = require('./labourController.js');

/*
 * GET
 */
router.get('/', labourController.list);

/*
 * GET
 */
router.get('/:id', labourController.show);

/*
 * POST
 */
router.post('/', labourController.create);

/*
 * PUT
 */
router.put('/:id', labourController.update);

/*
 * DELETE
 */
router.delete('/:id', labourController.remove);

module.exports = router;
