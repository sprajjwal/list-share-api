const router = require('express').Router();
const list = require('./list');

router.get('/', list.getIndex);
router.get('/list/:link', list.getList);
router.get('/new', list.getNewList)

router.post('/new', list.postNewList);
router.post('/list/:link/add', list.postAddItem);
router.post('/list/:link/item', list.postMarkPurchased);

module.exports = router