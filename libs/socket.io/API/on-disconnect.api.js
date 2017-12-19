//IMPORTED MODELS
const User = require('@userModel');
//IMPORTED HELPERS
const TUHelpers = require('../helpers/typing-users.helpers'),
      OUHelpers = require('../helpers/online-users.helpers');

module.exports = (socket, rooms, connections, Messages) => {
    socket.on('disconnect', async () => {

        if(rooms[socket.currentChat]) {
            const typingUsers = rooms[socket.currentChat].typingUsers;

            //Removing socket from lists of online ones
            socket.user.availableChats.forEach(async item => {
                Messages.in(item).emit('users.online', await OUHelpers.getOnlineUsers(connections, item));
            });

            //Removing socket from connections
            delete connections[socket.user._id];

            //Removing disconnected socket from the list of typing users,
            //emitting an event that allows refresh same lists on client side
            TUHelpers.removeFromTyping(typingUsers, socket.user._id);
            Messages
                .in(socket.currentChat)
                .emit('typingUsers', await TUHelpers.getUsernamesOfTypingUsers(typingUsers));
        }
    })
};
