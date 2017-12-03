"use strict";

const mongoose = require('mongoose');

module.exports = {
	username: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
    gender: {
        type: String
    },
	phone: {
		type: String,
		required: true
	},
    age: {
	    type: Number,
        required: true
    },
	salt: {
		type: String,
		required: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	avatarUrl: {
		type: String,
		default: '/images/avatars/default.png'
	},
	token: {
		type: String,
		default: ''
	},
	accessRights: {
		type: String,
		default: 'user'
	},
	timestamp: {
		type: Date,
		default: Date.now()
	},
	isBanned: {
		type: Boolean,
		default: false
	},
	availableChats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        }
    ],
    isDeleted: {
	    type: Boolean,
        default: false
    }
};