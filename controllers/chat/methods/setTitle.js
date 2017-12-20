const Chat = require('@chatModel');

module.exports = async (_id, title) => {
    try {
        await Chat.setTitle(_id, title);
        return await Chat.getChatById(_id, false)
    }
    catch (error) {
        return { error };
    }
};