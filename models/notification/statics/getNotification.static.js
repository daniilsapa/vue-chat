module.exports = function (_id) {
    const Notification = this;

    return new Promise((resolve, reject) => {
        Notification
            .findOne({ _id }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
    });



};