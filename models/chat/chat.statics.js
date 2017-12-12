module.exports = {
    //STATIC METHODS FOR MODELS FIELDS
    ...require('./statics/coverUrl.static'),
    ...require('./statics/members.static'),
    ...require('./statics/title.static'),
    //OTHER STATIC METHODS
    getChatByArray: require('./statics/getChat/getChatByArray.static'),
    getChatById: require('./statics/getChat/getChatById.static'),
    getAllChats: require('./statics/getChat/getAllChats.static'),
    createChat: require('./statics/createChat.static'),
    pushPullMessages: require('./statics/pushPullMessages.static')
};