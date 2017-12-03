"use strict";

const md5 = require('md5');
const mongoose = require('../../libs/mongoose/mongoose'),
    Schema = mongoose.Schema,
    chatScheme = require('../../libs/mongoose/schemes/chat.scheme'),
    chatStatics = require('./chat.statics');


const Chat = new Schema(chatScheme);

Chat.methods = {} ;

Chat.statics = chatStatics;

module.exports = mongoose.model('Chat', Chat);