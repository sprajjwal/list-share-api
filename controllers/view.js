const list = require('./list');
const getList = list.getList;

module.exports = {
    index: (req, res) => res.render('index'),

    newList: (req, res) => res.render('new-list'),

    showList: async (req, res) => {
        const r = await getList(req, res);
        const ctx = {}
        ctx.list = r.list;
        return res.render('show-list', ctx)
    }
}