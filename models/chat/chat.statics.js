module.exports = {
    ...require('./statics/members.static'),

    getChatByArray: require('./statics/getChat/getChatByArray.static'),
    getChatById: require('./statics/getChat/getChatById.static'),
    getAllChats: require('./statics/getChat/getAllChats.static'),
    createChat: require('./statics/createChat.static'),
    pushPullMessages: require('./statics/pushPullMessages.static')
};