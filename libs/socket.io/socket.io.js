//IMPORTED FOREIGN ADDICTIONS
const socketioJwt = require('socketio-jwt'),
      jwtsecret = "mysecretkey",
      jwtAuth = require('socketio-jwt-auth'),
      passportSocketIO = require('passport.socketio');

//IMPORTED CONTROLLERS
const userCtrl = require('@userCtrl')(),
      chatCtrl = require('@chatCtrl'),
      messageCtrl = require('../../controllers/message/message.controller'),
      notificationCtrl = require('@notificationCtrl');

//IMPORTED MODELS
const User = require('@userModel');

//IMPORTED HELPERS
const TUHelpers = require('./helpers/typing-users.helpers');

const rooms = {};

(async () => {

    const allChats =  await chatCtrl.getAllChats();

    if(allChats.error){
       throw new Error(allChats.error);
    }
    else{
        allChats.forEach((item) => {

            rooms[item._id] = {
                typingUsers: []
            }

        })
    }

})();

module.exports = io => {

    io.use(jwtAuth.authenticate({
        secret: jwtsecret,
        algorithm: 'HS256',
        succeedWithoutToken: true
    }, async (payload, done) => {
        if (payload) {
            const user = await userCtrl.getUserById(payload.id);
                if (user && user.error) {
                    // return error
                    return done(user.error);
                }
                if (!user) {
                    // return fail with an error message
                    return done(null, false, 'user does not exist');
                }
                // return success with a user info
                return done(null, user);
        }
        else {
            return done() // in your connection handler user.logged_in will be false
        }
    }));

    (function joinNamespaces() {

        const Notifications = io.of('/notifications');
        const Messages = io.of('/messages');

        Notifications.on('connection', socket => {

            if(socket.request.user.logged_in === false){
                socket.disconnect();
                return;
            }

            socket.join(`u${ socket.request.user._id }`, err => {
                if(err) console.log('chat changin\' error', err);
            });

            socket.request.user.availableChats.forEach(item => {
                socket.join(item)
            });

            socket.on('notification.invite', data => {
                console.log('notification notification notification notification', data);
                data.receivers.forEach(async item => {
                    const notification = await notificationCtrl.createNotification({
                        ...data.notification,
                        receiver: item._id
                    });
                    Notifications.in(`u${ item._id }`).emit('notification.invite', notification)
                })
            })

        });

        Messages.on('connection', socket => {

            if(!socket.request.user.logged_in){
                socket.disconnect();
                return
            }

            socket.on('changeChat', async data => {
                try {
                    await socket.leave(data.previousChat, err => {
                        socket.join(data.currentChat, err => {
                            if(err) console.log('chat changin\' error', err);
                            console.log('changeChat', data);
                            socket.currentChat = data.currentChat;

                            socket.emit('changeChat', {});
                        });
                    });
                }
                catch(e) {
                    socket.emit('changeChat', { error: 'server error' });
                }
            });

            socket.on('message', async data => {
                const isPrivate = data.type === 'private',
                      message = await messageCtrl.createMessage({
                            ...data,
                            author: socket.request.user._id,
                            chat: socket.currentChat
                      });

                if(isPrivate){
                    message.target = await userCtrl.getUserById(message.target);
                }

                Messages.in(socket.currentChat).emit('message', message);
                Notifications.in(socket.currentChat).emit('notification.message', {chat: socket.currentChat});

            });

            require('./API/typing-users.api')(socket, rooms, Messages);

            socket.on('disconnect', async () => {
                if(rooms[socket.currentChat]) {
                    const typingUsers = rooms[socket.currentChat].typingUsers;

                    TUHelpers.removeFromTyping(typingUsers, socket.request.user._id);
                    Messages.in(socket.currentChat).emit('typingUsers',
                        await TUHelpers.getUsernamesOfTypingUsers(typingUsers));
                }
            })
        });
    })();

    io.on('connection', function(socket) {

        socket.emit('success', {
            message: 'success logged in!',
            user: socket.request.user
        });

        socket.on('changeChat', async data => {

            try {

                await socket.leave(data.previousChat, err => {

                    socket.join(data.currentChat, err => {

                        socket.currentChat = data.currentChat;

                        console.log('chat changin\'', socket.request.user.username, data.currentChat);

                        socket.emit('changeChat', {});

                    });

                });
            }
            catch(e) {
                socket.emit('changeChat', { error: 'server error' });
            }

        });

        socket.on('message', async data => {

            let isPrivate = data.type === 'private';

            data.author = socket.request.user._id;
            data.chat = socket.currentChat;

            const message = await messageCtrl.createMessage(data);

            if(isPrivate){
                message.target = await userCtrl.getUserById(message.target);
            }

            console.log('Current Chat Current Chat', socket.currentChat);

            io.emit('message', message);
        //.of('/').in(socket.currentChat)

        });

    });
};