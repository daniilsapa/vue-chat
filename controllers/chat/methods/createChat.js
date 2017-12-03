const Chat = require('@chatModel');
const User = require('@userModel');


module.exports = async chatObj => {

    try {
        chatObj.members = await User.getAllUsers();

        const chat = await Chat.createChat(chatObj);

        await User.addAvailableChatForAll(chat._id);

        return {};

    }
    catch(error) {
        return {error};
    }

};