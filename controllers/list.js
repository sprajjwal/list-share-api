const List = require("../models/list");
const getLink = require("../utils/getLink");

const LINK_SIZE = 6;

module.exports = {
    getList: (req, res) => {
        const link = req.params.link;
        List.findOne({ link })
            .then(list => {
                if (list === null) {
                    return res.send({
                        isSuccess: false,
                        error: `List ${link} not found`,
                        list: list
                    })
                } else {
                    res.send({
                        isSuccess: true,
                        list
                    })
                }
            })
            .catch(e => {
                console.log(e)
                return res.send({
                    isSuccess: false,
                    error: `List ${link} not found`
                })
        })
    },

    postNewList: async (req, res) => {
        const l = new List(req.body);
        l.link = await getLink(LINK_SIZE);
        l.save()
            .then(_ => {
                return res.send({isSuccess: true});
            })
        .catch(_ => res.send({
            isSuccess: false
        }))
    },

    postAddItem: (req, res) => {
        List.findOne({link: req.body.link})
            .then(list => {
                const item = {
                    name: req.body.name,
                    amount: req.body.amount,
                    isPurchased: false
                }
                list.items.unshift(item);
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
                    if (item.name === selectedItem) {
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