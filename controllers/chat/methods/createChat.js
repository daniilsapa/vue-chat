const Chat = require('@chatModel');
const User = require('@userModel');

module.exports = async chatObj => {
    try {
        const chat = await Chat.createChat(chatObj);

        await Chat.pushMembers(chat._id, chat.creator);
        await User.pushAvailableChats(chat.creator, chat._id);

        return chat;
    }
    catch(error) {
        return {error};
    }

};