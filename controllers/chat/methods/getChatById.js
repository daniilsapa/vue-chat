//IMPORTED MODELS
const Chat = require('@chatModel'),
    Notification = require('@notificationModel');

module.exports = async (chatId, full) => {
    try {
        const chat = await Chat.getChatById(chatId, full);
        const invites = await Notification.getNotificationsByChat(chatId);
        //console.log('notifications notifications notifications', notifications);

        return {
            ...chat._doc,
            invites
        };
    }
    catch (error) {
        return { error };
    }
};