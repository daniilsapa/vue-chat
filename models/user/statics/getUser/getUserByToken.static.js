module.exports = function (token) {

    const User = this;

    return new Promise(function(resolve, reject) {

        User.findOne({token}, (error, result) => {

            if (error) {
                reject(error);
            }
            else if (result) {
                resolve(result, 200);
            }
            else {
                resolve(null);
            }

        })

    });

};