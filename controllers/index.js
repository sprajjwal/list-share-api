const router = require('express').Router();
const list = require('./list');

router.get('/list/:link', list.getList);

router.post('/new', list.newList);
router.post('/list/:link/add', list.addItem);
router.post('/list/:link/item', list.markPurchased);

module.exports = router