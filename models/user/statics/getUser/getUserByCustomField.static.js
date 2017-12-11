module.exports = function (obj) {
    const User = this;

    return new Promise((resolve, reject) => {
        User.findOne({ ...obj }, (error, result) => {
            if (error) {
                reject({ error });
            }
            else if (result) {
                resolve(result);
            }
            else {
                resolve(null);
            }
        })
    });
};