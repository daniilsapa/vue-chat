"use strict";

module.exports = function (data, id, field, option) {

    const User = this;

    let updateObj = {};

    if (option){
        updateObj['$push'] = {};
        updateObj['$push'][field] = data;
    }
    else{
        updateObj['$pull'] ={};
        updateObj['$pull'][field] = data;
    }

    return new Promise (function (resolve, reject) {

        User.updateOne({_id: id}, updateObj ,(error, result) => {

            if (error) {
                return reject(error);
            }

            return resolve(result);

        });


    });
};