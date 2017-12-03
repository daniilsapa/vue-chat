"use strict";

module.exports = function (id, field, increment) {

    const User = this;
    const updateObj = {$inc: {}};

    updateObj['$inc'][field] = increment;

    return new Promise((resolve, reject) => {

        User.updateOne({_id: id}, updateObj, (error, result) => {

            if (error) {
                reject(error);
            }
            else{
                resolve(result);
            }

        })

    })

};