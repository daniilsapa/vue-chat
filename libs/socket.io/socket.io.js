const socketioJwt = require('socketio-jwt');
const jwtsecret = "mysecretkey";

const jwtAuth = require('socketio-jwt-auth');

const passportSocketIO = require('passport.socketio');

const userCtrl = require('@userCtrl')(),
      chatCtrl = require('@chatCtrl'),
      messageCtrl = require('../../controllers/message/message.controller');

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
        secret: jwtsecret,    // required, used to verify the token's signature
        algorithm: 'HS256',        // optional, default to be HS256
        succeedWithoutToken: true
    }, async (payload, done) => {
        // you done callback will not include any payload data now
        // if no token was supplied

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

        const notifications = io.of('/notifications');
        const messages = io.of('/messages');

        notifications.on('connection', socket => {


            if(socket.request.user.logged_in === false){
                socket.disconnect();
                return;
            }

            console.log('connected to notifications namespace');

            socket.request.user.availableChats.forEach(item => {
                socket.join(item)
            })

        });



        messages.on('connection', socket => {


            if(!socket.request.user.logged_in){
                socket.disconnect();
                return
            }

            console.log('connected to message namespace');

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
                    socket.emit('changeChat', {error: 'server error'});
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

                messages.in(socket.currentChat).emit('message', message);
                notifications.in(socket.currentChat).emit('notification.message', {chat: socket.currentChat});

            });

            socket.on('beginTyping', () => {

                const typingUsers = rooms[socket.currentChat].typingUsers;
                let alreadyExists = false;

                typingUsers.forEach((item, index) => {
                    if(item === socket.request.user.username){
                        alreadyExists = true;
                    }
                });

                if(alreadyExists){return}

                typingUsers.push(socket.request.user.username);

                messages.emit('typingUsers', typingUsers);
            });

            socket.on('finishTyping', () => {

                const typingUsers = rooms[socket.currentChat].typingUsers;

                typingUsers.forEach((item, index) => {
                    if(item === socket.request.user.username){
                        typingUsers.splice(index, 1);
                    }
                });

                messages.emit('typingUsers', typingUsers);

            });

            socket.on('typingUsers', () => {

                messages.emit('typingUsers',  rooms[socket.currentChat].typingUsers);

            });

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
                socket.emit('changeChat', {error: 'server error'});
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