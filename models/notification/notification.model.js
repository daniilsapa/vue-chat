"use strict";

const md5 = require('md5');
const mongoose = require('../../libs/mongoose/mongoose'),
    Schema = mongoose.Schema,
    notificationScheme = require('../../libs/mongoose/schemes/notification.scheme'),
    notificationStatics = require('./notification.statics');

const Notification = new Schema(notificationScheme);

Notification.methods = {} ;

Notification.statics = notificationStatics;

module.exports = mongoose.model('Notification', Notification);