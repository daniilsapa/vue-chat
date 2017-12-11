"use strict";

module.exports.pushAvailableChats = function (_id, chat) {
    const User = this;

    return new Promise((resolve, reject) => {
        User.updateOne({ _id }, { $push: { availableChats: chat } },(error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};

module.exports.pullAvailableChats = function (_id, chat) {
    const User = this;

    return new Promise((resolve, reject) => {
        User.updateOne({ _id }, { $pull: { availableChats: chat } },(error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};
