"use strict";

module.exports = function (id) {

    const User = this;

    return new Promise((resolve, reject) => {

        User.deleteOne({_id: id}, (error, result) => {
            if (error) {
                reject(error);
            }
            else if (result) {
                resolve(result);
            }
        })

    });

};
