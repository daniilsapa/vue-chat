const mongoose = require('mongoose');

module.exports = {
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
};