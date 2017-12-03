"use strict";

module.exports = function (array, userId) {

    const Chat = this;


    return new Promise((resolve, reject) => {

        Chat.updateMany({_id: {$in: array}}, {$push: {members: userId}},(error, result, affected) => {
            if (error) {
                console.log('error');
                return reject(error);
            }
            return resolve(result);
        });

    });

};

