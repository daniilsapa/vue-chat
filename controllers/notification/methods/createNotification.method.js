const Notification = require('@notificationModel');
const User = require('@userModel');

module.exports = async notificationObj => {
    try {
        const notification = await Notification.createNotification(notificationObj);

        await User.pushNotifications(notification.receiver, notification._id);
        return notification;
    }
    catch (error) {
        return {error};
    }
};