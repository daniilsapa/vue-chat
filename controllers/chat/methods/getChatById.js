const Chat = require('@chatModel');

module.exports = async (chatId, full) => {
    try {
        const result = await Chat.getChatById(chatId, full);
        return result;
    }
    catch (error) {
        return { error };
    }
};