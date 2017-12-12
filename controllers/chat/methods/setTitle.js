const Chat = require('@chatModel');

module.exports = async (_id, title) => {
    try {
        console.log('search criteria', { _id })

        await Chat.setTitle(_id, title);
        return await Chat.getChatById(_id, false)
    }
    catch (error) {
        console.log(error);
        return { error };
    }

};