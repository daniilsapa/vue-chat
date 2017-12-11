module.exports = function (_id, notificationId) {
    const User = this;

    return new Promise(function(resolve, reject) {

        User.updateOne({_id}, {$push: {notifications: notificationId}}, (error, result) => {
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