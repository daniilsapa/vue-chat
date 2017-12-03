"use strict";

module.exports = function (chatObj) {

    const Chat = this;
    const chat = new Chat(chatObj);

    return new Promise((resolve, reject) => {

        chat.save((error, result, affected) => {

            if (error) {
                return reject(error);
            }
            return resolve(result);

        });

    });

};