const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    items: [{
        name: {
            type: String
        },
        amount: {
            type: Number
        },
        isPurchased: {
            type:Boolean,
            default: false
        }
    }],
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    }

}, {
    minimize: false
})

ListSchema.pre("save", function (next) {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;
    if (!this.createdAt) {
      this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model("List", ListSchema)