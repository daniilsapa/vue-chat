"use strict";

const md5 = require('md5');
const mongoose = require('../../libs/mongoose/mongoose'),
    Schema = mongoose.Schema,
    messageScheme = require('../../libs/mongoose/schemes/message.scheme'),
    messageStatics = require('./message.statics');


const Message = new Schema(messageScheme);

Message.methods = {} ;

Message.statics = messageStatics;

module.exports = mongoose.model('Message', Message);