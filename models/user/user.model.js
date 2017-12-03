"use strict";

const crypto = require('crypto');
const mongoose = require('../../libs/mongoose/mongoose'),
		Schema = mongoose.Schema,
		userSchema = require('../../libs/mongoose/schemes/user.scheme'),
		userStatics = require('./user.statics');


const User = new Schema(userSchema);

User.methods = {
    checkPassword: function (password) {

        if (!password) return false;
        if (!this.hashedPassword) return false;

        return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1').toString('hex') === this.hashedPassword;

    }

} ;

User.statics = userStatics;

User.virtual('password')
    .set(function (password) {

        this._plainPassword = password;

        if (password) {
            this.salt = crypto.randomBytes(128).toString('base64');
            this.hashedPassword = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1').toString('hex');
        } else {
            this.salt = undefined;
            this.hashedPassword = undefined;
        }

    })
    .get(function () {

        return this._plainPassword;

    });

module.exports = mongoose.model('User', User);