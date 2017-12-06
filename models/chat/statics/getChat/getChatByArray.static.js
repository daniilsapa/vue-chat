"use strict";

module.exports = function (chatArray) {

    const Chat = this;

    return new Promise((resolve, reject) => {

        Chat.find({_id: {$in: chatArray}})
            .populate({
                path: 'creator',
            })
            .exec((error, result) => {

                if (error) {
                    return reject(error);
                }
                return resolve(result);

            });

    });

};