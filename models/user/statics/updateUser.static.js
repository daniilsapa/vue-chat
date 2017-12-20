"use strict";

module.exports = function (searchCriteria, updateObj) {
    const User = this;

    return new Promise((resolve, reject) => {

        User.updateOne(searchCriteria, updateObj, (error, result) => {
            if (error) {
                reject({ error });
            }
            else if (result) {
                resolve(result);
            }
        });
    });
};