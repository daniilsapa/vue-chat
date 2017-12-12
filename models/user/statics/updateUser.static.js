"use strict";

module.exports = function (searchCriteria, updateObj) {
    const User = this;

    console.log('searchCriteria', searchCriteria)
    console.log('updateObj', updateObj)

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