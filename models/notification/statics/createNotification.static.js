module.exports = function (notificationObj) {
    const Notification = this;
    const notification = new Notification(notificationObj);

    return new Promise((resolve, reject) => {
        notification.save((error, result, affected) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};