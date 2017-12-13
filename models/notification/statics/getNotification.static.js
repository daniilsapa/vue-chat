module.exports.getNotification = function (_id) {
    const Notification = this;

    return new Promise((resolve, reject) => {
        Notification
            .findOne({ _id })
            .exec((error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
    });
};

module.exports.getNotificationsByChat = function (chat) {
    const Notification = this;

    return new Promise((resolve, reject) => {
        Notification
            .find({ chat })
            .populate({ path: 'receiver' })
            .exec((error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve(result);
            });
    });
};