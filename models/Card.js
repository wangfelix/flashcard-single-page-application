const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    frontContent: {
        type: String,
        required: true},
    backContent: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Stack', CardSchema, 'cards');