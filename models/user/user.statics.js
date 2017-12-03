"use strict";

module.exports = {
    getUserByToken: require('./statics/getUser/getUserByToken.static'),
    getUserById: require('./statics/getUser/getUserById.static'),
    getAllUsers: require('./statics/getUser/getAllUsers.static'),

    addAvailableChatForAll: require('./statics/addAvailableChatForAll.static'),

    setAvatar: require('./statics/setAvatar.static'),
    setAvailableChats: require('./statics/setAvailableChats.static'),

    pushPullField:  require('./statics/pushPullField.static'),
    incDecField:    require('./statics/incDecField.static'),
    customFind:     require('./statics/customFind.static'),
    updateUser:     require('./statics/updateUser.static'),
    deleteUser:     require('./statics/deleteUser.static'),

    authorize:      require('./statics/authorize.static'),
    authorizeJWT:   require('./statics/authorizeJWT.static'),
	getUsers:       require('./statics/getUsers.statics'),
	addUser:        require('./statics/addUser.static'),
    logOut:         require('./statics/logOut.static')
};