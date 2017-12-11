module.exports = function (_id) {
    const Notification = this;

    return new Promise((resolve, reject) => {
        Notification.updateOne({ _id }, { $set: { state: 'rejected' } }, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};