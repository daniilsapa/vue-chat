//IMPORTED FOREIGN ADDICTIONS
const jwtTools = require('jsonwebtoken');

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
const OUHelpers = require('./helpers/online-users.helpers');

const connections = {};
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

    (function joinNamespaces() {
        const Notifications = io.of('/notifications'),
              Messages = io.of('/messages');

        Notifications.on('connection', socket => {
            socket.on('auth', async token => {
                const payload = jwtTools.decode(token);
                if(!payload){
                    socket.emit('Unauthorized',  {});
                    socket.disconnect();
                    return;
                }

                socket.user = await userCtrl.getUserById(payload.id);
                connections[socket.user._id] = { notifications: socket };
                socket.emit('authenticated', socket.user);

                socket.join(`u${ socket.user._id }`, err => {
                    if(err) console.log('chat changin\' error', err);
                });

                socket.user.availableChats.forEach(async item => {
                    socket.join(item);
                    console.log('rooms item', rooms[item]);
                    Messages.in(item).emit('users.online', await OUHelpers.getOnlineUsers(connections, item));
                });

                socket.on('notification.invite', data => {
                    data.receivers.forEach(async item => {
                        const notification = await notificationCtrl.createNotification({
                            ...data.notification,
                            receiver: item._id
                        });
                        Notifications.in(`u${ item._id }`).emit('notification.invite', notification)
                    })
                });

                socket.on('join', ({ chatID }) => {
                    socket.join(chatID);
                })
            });
        });

        Messages.on('connection', socket => {
            socket.on('auth', async token => {
                const payload = jwtTools.decode(token);

                if (!payload){
                    socket.emit('Unauthorized', {});
                    socket.disconnect();
                    return;
                }

                socket.user = await userCtrl.getUserById(payload.id);
                connections[socket.user._id].messages = socket ;
                socket.emit('authenticated', socket.user);

                socket.on('changeChat', async data => {
                    try {
                        await socket.leave(data.previousChat, err => {
                            socket.join(data.currentChat, err => {
                                if(err) console.log('chat changin\' error', err);
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
                            author: socket.user._id,
                            chat: socket.currentChat
                        });

                    if(isPrivate){
                        message.target = await userCtrl.getUserById(message.target);
                    }

                    Messages.in(socket.currentChat).emit('message', message);
                    Notifications.in(socket.currentChat).emit('notification.message', { chat: socket.currentChat, isPrivate });
                });

                socket.on('chat.leave', async ({ chatID }) => {
                    let userID = socket.user._id;
                    try {
                        await userCtrl.leaveChat(userID, chatID);
                        const message = await messageCtrl.createMessage({
                            chat: chatID,
                            type: 'system',
                            author: userID,
                            target: userID,
                            content: 'User have just left the room!'
                        });

                        socket.emit('chat.leave', { id: chatID });

                        Messages.in(chatID).emit('message', message);
                        Notifications.in(chatID).emit('notification.message', { chat: chatID, isPrivate: false });

                    }
                    catch(e) {
                        socket.emit('chat.leave', { error: 'Cannot leave chat' })
                    }
                });

                socket.on('chat.join', async ({ chatID }) => {
                    let userID = socket.user._id;
                    try {
                        const chat = await chatCtrl.getChatById(chatID),
                              message = await messageCtrl.createMessage({
                                  chat: chatID,
                                  type: 'system',
                                  author: userID,
                                  target: userID,
                                  content: 'User have just join the room!'
                              });

                        message.target = await userCtrl.getUserById(userID);

                        socket.user.availableChats.push(chat._id);

                        Messages.in(chatID).emit('message', message);
                        Notifications.in(chatID).emit('notification.message', { chat: chatID, isPrivate: false });

                        connections[userID].notifications.join(chat._id);
                        socket.emit('chat.join', chat);
                    }
                    catch(e) {
                        socket.emit('error', { message: 'Cannot leave chat' })
                    }
                });

                socket.on('chat.create', async (chatObj, cb) => {
                    try {
                        const chat = await chatCtrl.createChat(chatObj);
                        socket.user.availableChats.push(chat._id);
                        connections[socket.user._id].notifications.join(chat._id);
                        rooms[chat._id] = { typingUsers: [] };
                        cb();
                        socket.emit('chat.join', chat);
                    }
                    catch(e) {
                        socket.emit('error', { message: 'Chat hasn\'t been created, try again later' })
                    }
                });

                require('./API/typing-users.api')(socket, rooms, Messages);
                require('./API/online-users.api')(socket, rooms, connections, Messages);

                require('./API/on-disconnect.api')(socket, rooms, connections, Messages)

            })

        });
    })();

    io.on('connection', function(socket) {

    });
};