module.exports = {
    ...require('./statics/getNotification.static'),
    acceptNotification: require('./statics/acceptNotification.static'),
    createNotification: require('./statics/createNotification.static'),
    rejectNotification: require('./statics/rejectNotification.static')
};