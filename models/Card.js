const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    frontContent: {
        type: String,
        required: true
    },
    backContent: {
        type: String,
        required: true
    },
    stack: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stack",
        required: true
    }
});

module.exports = mongoose.model('Card', CardSchema, 'cards');