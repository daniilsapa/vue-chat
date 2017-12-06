const mongoose = require('mongoose');

module.exports = {
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    content: {
        type: String,
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    state: {
        type: String,
        default: 'pending'
    },
    title: {
        type: String,
        required: true
    }
};