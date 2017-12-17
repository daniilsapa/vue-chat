const User = require('@userModel');
const Chat = require('@chatModel');

module.exports = async (userID, chatID) => {
    await User.pullAvailableChats(userID, chatID);
    await Chat.pullMembers(chatID, userID);


};