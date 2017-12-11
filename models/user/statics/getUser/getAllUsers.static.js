module.exports = function () {
    const User = this;

    return new Promise(function(resolve, reject) {
        User.find({}, (error, result) => {
            if (error) {
                reject({error});
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