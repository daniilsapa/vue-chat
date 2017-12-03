module.exports = {

    getChatByArray: require('./statics/getChat/getChatByArray.static'),
    getChatById: require('./statics/getChat/getChatById.static'),
    getAllChats: require('./statics/getChat/getAllChats.static'),

    setMemberForManyChats: require('./statics/setMemberForManyChats.static'),

    createChat: require('./statics/createChat.static'),
    pushPullMessages: require('./statics/pushPullMessages.static')
};