"use strict";

module.exports = function (userObj) {
    const User = this;
    const user = new User(userObj);

    return new Promise((resolve, reject) => {
        try{
            user.save((error, result, affected) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });

        }
        catch(e){
            throw new Error(e);
        }
    });
};

