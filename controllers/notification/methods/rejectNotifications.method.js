const Chat = require('@chatModel'),
      Notification = require('@notificationModel'),
      User = require('@userModel');

module.exports = async notification => {
    try {
        await Chat.pullMembers(notification.chat, notification.receiver);
        await User.pullAvailableChats(notification.receiver, notification.chat);
        await Notification.rejectNotification(notification._id);

        return Notification.getNotification(notification._id);
    }
    catch (error) {
        return {error};
    }
};