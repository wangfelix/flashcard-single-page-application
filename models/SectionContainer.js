const mongoose = require('mongoose');

const SectionContainerSchema = mongoose.Schema({
    sectionContainerName: {
        type: String,
        required: true
    },
    stacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stack"
    }]
});

module.exports = mongoose.model('SectionContainer', SectionContainerSchema, 'sectionContainer');