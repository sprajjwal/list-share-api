// import { nanoid } from 'nanoid';
const {nanoid} = require('nanoid')
const List = require("../models/list");


const getLink = async (size) => {
    while (true) {
        const link = nanoid(size);
        try {
            const item = await List.findOne( { link }).exec();
            if (item === null) {
                return link;
            }
        }
        catch(error) { //brendawazhere
            console.log(error);
        }
    }
}

module.exports = getLink