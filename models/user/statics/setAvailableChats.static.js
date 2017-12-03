"use strict";

module.exports = function (_id, availableChats) {

    const User = this;

    return new Promise((resolve, reject) => {

        User.updateOne({_id}, {$set: { availableChats }},(error, result) => {
            if (error) {
                console.log('error');
                return reject(error);
            }
            return resolve(result);
        });

    });

};

