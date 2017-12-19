//IMPORTED MODELS
const Chat = require('@chatModel');

module.exports.getOnlineUsers = async (connections, id) => {
    const chat = await Chat.getChatById(id, true);

    console.log('-------------------------------------------------------------------------');
    console.log(chat.title);
    console.log('-------------------------------------------------------------------------');
    const array = chat.members.filter(item => {
        console.log('has property',connections.hasOwnProperty(item._id));
        console.log('has property',item.username);
        return connections.hasOwnProperty(item._id);
    });
    console.log('-------------------------------------------------------------------------');
    return array;
};

