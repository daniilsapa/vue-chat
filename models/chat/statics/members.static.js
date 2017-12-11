"use strict";

module.exports.pushMembers = function (_id, userId) {
    const Chat = this;

    return new Promise((resolve, reject) => {
        Chat.updateOne({ _id }, { $push: { members: userId } },(error, result, affected) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};

module.exports.pullMembers = function (_id, userId) {
    const Chat = this;

    return new Promise((resolve, reject) => {
        Chat.updateOne({ _id }, { $pull: { members: userId } },(error, result, affected) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};