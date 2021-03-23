const router = require('express').Router();
const list = require('./list');
const view = require('./view');

router.get('/', view.index);
router.get('/new', view.newList);
router.get('/list/:link', view.showList);

router.get('/api/list/:link', list.getList);

router.post('/new', view.postNewList);
router.post('/list/:link/delete', view.postDelete);
router.post('/list/:link/item/delete', view.postDeleteItem);

router.post('/api/new', list.postNewList);
router.post('/api/list/:link/add', list.postAddItem);
router.post('/api/list/:link/item', list.postMarkPurchased);

module.exports = router