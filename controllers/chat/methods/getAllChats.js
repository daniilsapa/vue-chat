const Chat = require('@chatModel');

module.exports = async () => {

    try {
        const result = await Chat.getAllChats();
        return result;
    }
    catch (error) {
        return {error};
    }

};