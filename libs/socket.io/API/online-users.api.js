//IMPORTED MODELS
const User = require('@userModel');
//IMPORTED HELPERS
const helpers = { ...require('../helpers/online-users.helpers') };

module.exports = (socket, rooms, connections, Messages) => {
    socket.on('users.online', async ({ id }) => {
        socket.emit('users.online', await helpers.getOnlineUsers(connections, id));
    });
};