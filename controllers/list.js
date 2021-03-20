const List = require("../models/list");

module.exports = {
    getList: (req, res) => {
        const code = req.params.link;
        List.findOne({ code })
            .then(list => res.send(list))
    },

    newList: (req, res) => {
        const l = new List(req.body);
    },

    addItem: (req, res) => {},
    markPurchased: (req, res) => {}
}