const { Schema, model } = require('mongoose')


const Category = new Schema({
    name: {
        type: String,
        required: true,
        index: { unique: true }
    },
    description: {
        required: true,
        type: String
    },
}, {
    timestamps: true
})


module.exports = model('Category', Category)