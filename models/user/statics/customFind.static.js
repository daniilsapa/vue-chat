"use strict";

module.exports = function (token, searchParams) {

    const User = this;

    return new Promise (function(resolve, reject) {

        if(searchParams) {
            User.findOne(searchParams, (error, result) => {
                if (error) {

                }
                else if (result) {

                }
            })
        }
        else {
            User.findOne({token: token})
                .populate('posts')
                .populate({
                    path:'comments',
                    populate: {
                        path: 'article'
                    }
                })
                .exec((error, result) => {

                    if (error) {
                        reject(error);
                    }
                    else if (result) {
                        resolve(result);
                    }
                    else {
                        reject(null);
                    }
            })
        }

    });

};

