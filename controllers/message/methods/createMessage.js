const Message = require('../../../models/message/message.model');
const Chat = require('../../../models/chat/chat.model');

module.exports = async messageObj => {

    try {
        const message = await Message.createMessage(messageObj);
        const chat = await Chat.pushPullMessages(message.chat, message._id, true);
        const result = await Message.getMessageById(message._id, true);

        return result;
    }
    catch (error) {
        console.log(error);
        return {error};
    }

};