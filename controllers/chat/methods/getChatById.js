const Chat = require('../../../models/chat/chat.model');

module.exports = async (chatId, full) => {

    try {
        const result = await Chat.getChatById(chatId, full);
        return result;
    }
    catch (error) {
        return {error};
    }

};