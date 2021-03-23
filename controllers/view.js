const List = require('../models/list');
const getLink = require("../utils/getLink");

const LINK_SIZE = process.env.LINK_SIZE

module.exports = {
    index: (req, res) => res.render('index'),

    newList: (req, res) => res.render('new-list'),

    showList: (req, res) => {
        const link = req.params.link;
        List.findOne({ link }).lean()
            .then(list => {
                let ctx = {};
                if (list === null) {
                    ctx = {
                        message: `List ${link} wasn't found`,
                        name: null,
                        link: link
                    }
                } else {
                    ctx = {
                        name: list.name,
                        list: list.items,
                        link: link
                    }
                }
                res.render('show-list', ctx)
            })
            .catch(e => console.log(e))
    },

    postNewList: async (req, res) => {
        const l = new List(req.body);
        l.link = await getLink(LINK_SIZE);
        l.save()
            .then(_ => {
                return res.redirect(`/list/${l.link}`);
            })
        .catch(_ => res.redirect('/'))
    },

    postDelete: (req, res) => {
        List.findOneAndDelete({link: req.body.link})
            .then(_ => res.redirect('/'))
            .catch(err => res.send(err))
    },

    postDeleteItem: (req, res) => {
        const link = req.body.link;
        List.findOne({link})
            .then(list => {
                list.items = list.items.filter(item => item.name !== req.body.name)
                list.markModified("items")
                list.save()
                    .then(_ => res.redirect(`/list/${link}`))
            })
            .catch(err => res.send(err))
    }
}