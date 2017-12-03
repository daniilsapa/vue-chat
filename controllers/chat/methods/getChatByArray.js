const Chat = require('../../../models/chat/chat.model');

module.exports = async chatArray => {

    try {
        const result = await Chat.getChatByArray(chatArray);
        return result;
    }
    catch (error) {
        return {error};
    }

};