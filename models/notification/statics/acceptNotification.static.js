module.exports = function (_id) {
    const Notification = this;

    return new Promise((resolve, reject) => {
        Notification.findOneAndUpdate({_id}, {$set: {state: 'accepted'}}, (error, result, affected) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};