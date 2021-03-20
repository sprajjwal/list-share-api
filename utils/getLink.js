// import { nanoid } from 'nanoid';
const {nanoid} = require('nanoid')
const List = require("../models/list");


const getLink = async () => {
    while (true) {
        const link = nanoid(7);
        try {
            await List.findOne( { link }).exec();
        }
        catch(error) { //brendawazhere
            return link
        }
    }
}

module.exports = getLink