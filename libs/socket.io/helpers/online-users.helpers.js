//IMPORTED MODELS
const Chat = require('@chatModel');

module.exports.getOnlineUsers = async (connections, id) => {
    const chat = await Chat.getChatById(id, true);

    const array = chat.members.filter(item => {
        return connections.hasOwnProperty(item._id);
    });

    return array;
};

