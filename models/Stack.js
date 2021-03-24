const mongoose = require('mongoose');

const StackSchema = mongoose.Schema({
    stackName: {
        type: String,
        required: true
    },
    divider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SectionContainer",
        required: true
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Card",
        required: true
    }]
});

module.exports = mongoose.model('Stack', StackSchema, 'stacks');
