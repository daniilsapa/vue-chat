"use strict";

module.exports = function (id, array) {

    const User = this;

    return new Promise((resolve, reject) => {

        if(id) {
            User.findOne({_id: id})
                .populate('posts')
                .populate('comments')
                .exec((error, result) => {

                    if (error) {
                        reject(error);
                    }
                    else if (result) {
                        resolve(result);
                    }

                })
        }
        else if(array instanceof Array) {
            User.find({_id: {$in: array}}, (error, result) => {
                if (error) {
                    reject(error);
                }
                else if (result) {
                    resolve(result);
                }
            })
        }
        else {
            User.find({}, (error, result) => {
                if (error) {
                    reject(error);
                }
                else if (result) {
                    resolve(result);
                }
            })
        }

    });

};