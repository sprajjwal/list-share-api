const { reset } = require("nodemon");
const List = require("../models/list");
const getLink = require("../utils/getLink");

const LINK_SIZE = 6;

module.exports = {
    getIndex: (req, res) => {
        return res.render('index')
    },
    getList: (req, res) => {
        const link = req.params.link;
        List.findOne({ link })
            .then(list => res.send(list))
            .catch(e => {
                console.log(e)
                return res.send({error: `List ${link} not found`})
        })
    },

    getNewList: (req, res) => {},

    postNewList: async (req, res) => {
        const l = new List(req.body);
        l.link = await getLink(LINK_SIZE);
        l.save()
            .then(_ => {
                return res.send(l);
            })
    },

    postAddItem: (req, res) => {
        List.findOne({link: req.body.link})
            .then(list => {
                list.items.unshift(...req.body.items);
                list.markModified("items")
                list.save()
                return res.send({isSuccess: true})
            })
            .catch(e => res.send({isSuccess: False}))
    },
    postMarkPurchased: (req, res) => {
        List.findOne({link: req.body.link})
            .then(list => {
                const selectedItem = req.body.item;
                const isPurchased = req.body.isPurchased;
                list.items.forEach((item, i) => {
                    if (item === selectedItem) {
                        list.items[i].isPurchased = isPurchased;
                        list.markModified("items");
                        list.save()
                            .then(_ => {
                                return res.send({isSuccess: true});
                            })
                    }
                })
            })
            .catch(e => res.send({isSuccess: false}));
    }
}