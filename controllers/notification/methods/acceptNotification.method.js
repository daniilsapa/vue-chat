const Chat = require('@chatModel'),
      Notification = require('@notificationModel'),
      User = require('@userModel');

module.exports = async notification => {
    try {
        await Chat.pushMembers(notification.chat, notification.receiver);
        await User.pushAvailableChats(notification.receiver, notification.chat);
        await Notification.acceptNotification(notification._id);

        return Notification.getNotification(notification._id);
    }
    catch (error) {
        console.log(error);
        return {error};
    }

};