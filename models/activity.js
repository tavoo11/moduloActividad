const { Schema, model } = require('mongoose')


const Activity = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    images: [String],
    questions: [{ response: String, options: [String] }],
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    subcategories: [{
        type: Schema.Types.ObjectId,
        ref: "Subcategory"
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tags:[String],
    resources:[String],
})

module.exports = model('Activity', Activity)