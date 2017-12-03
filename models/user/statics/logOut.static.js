"use strict";

module.exports = function (token) {

    const User = this;

    return new Promise(function(resolve, reject) {

        User.updateOne({token: token}, {$set: {token: ''}}, (error, result) => {
            if(error){
                reject(error);
            }
            else{
                resolve(result);
            }
        })

    });

};