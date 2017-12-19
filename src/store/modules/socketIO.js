import io from 'socket.io-client';

import { ErrorHandler } from "../../services/ErrorHandler.secvice"

const state = {
    socket: null,
    notifications: null,
    messages: null
};

const mutations = {
    'SOCKET_IO_M_CONNECT_TO_SOCKET'(state, { socket, title }) {
        state[title] = socket;
    },
    'SOCKET_IO_M_CLOSE_CONNECTIONS'(state) {
        if(state.socket){ state.socket.close(); }
        if(state.notifications){ state.notifications.close(); }
        if(state.messages){ state.messages.close(); }
    }
};

const actions = {
    'SOCKET_IO_A_INIT_SOCKETS'({ commit, getters, state, dispatch }) {

        const token = JSON.parse(localStorage.getItem('data')).token;

        commit('SOCKET_IO_M_CONNECT_TO_SOCKET', {
            title: 'socket',
            socket: io({ query: `token=${token}` })
        });

        //state.socket.on('connection', (data) => {



            commit('SOCKET_IO_M_CONNECT_TO_SOCKET', {
                title: 'notifications',
                socket: io('/notifications')
            });

            state.notifications.emit('auth', token );

            state.notifications.on('authenticated', data => {
                console.log('notifications auth', data)
                dispatch('SESSION_SET_CURRENT_USER', data);

                state.notifications.on('notification.message', notification => {
                    console.log('notification message')
                    if(getters['CHAT_G_GET_CHAT']['_id'] !== notification.chat && !notification.isPrivate){
                        commit('CHATLIST_M_ADD_NOTIFICATION', notification);
                    }
                });

                state.notifications.on('notification.invite', notification => {
                    console.log('notification invite')

                    commit('SESSION_M_PUSH_NOTIFICATIONS', notification);
                });

            });


            commit('SOCKET_IO_M_CONNECT_TO_SOCKET', {
                title: 'messages',
                socket: io('/messages')
            });

            state.messages.emit('auth', token);

            state.messages.on('authenticated', () => {
                state.messages.on('chat.leave', ({ id }) => {
                    commit('CHATLIST_M_PULL_AVAILABLE_CHATS', id)
                });

                state.messages.on('chat.join', chat => {
                    commit('SESSION_M_ADD_CHAT', chat);
                    dispatch('CHATLIST_A_FETCH_AVAILABLE_CHATS');
                });

                state.messages.on('message', message => {
                    if(message.error && message.error.message.indexOf('content') !== -1){
                        ErrorHandler.pushError({ message: 'Sent message is empty!' })
                    }
                    else if(message.error){
                        ErrorHandler.pushError({message: 'An error occurred!'})
                    }

                    const currentChat = getters['CHAT_G_GET_CHAT'];
                    const messages = currentChat.messages;

                    if(message.chat !== currentChat._id) return;

                    if((messages[messages.length - 1] && messages[messages.length -1].type !== 'system') && message.type !== 'system'){
                        if( messages[messages.length - 1] &&
                            (messages[messages.length - 1]['author']['_id'] === message['author']['_id'])){
                            message['sameUser'] = true;
                        }
                    }

                    commit('CHAT_M_ADD_MESSAGE', message);
                });

                state.messages.on('typingUsers', typingUsers => {
                    commit('CHAT_M_SET_TYPING_USERS', typingUsers);
                });

                state.messages.on('users.online', users => {
                    commit('CHAT_M_SET_ONLINE_USERS', users);
                });
            })



        // }).on('error', function(err) {
        //     console.log(err)
        // }).on('connect', function () {
        //     console.log('authenticated');
        //
        // }).on('disconnect', function () {
        //     console.log('disconnected');
        // });
    },
};

const getters = {
    'SOCKET_IO_G_GET_ROOT_SOCKET'(state) {
        return state.socket;
    },
    'SOCKET_IO_G_GET_NOTIFICATIONS_SOCKET'(state) {
        return state.notifications;
    },
    'SOCKET_IO_G_GET_MESSAGES_SOCKET'(state) {
        return state.messages;
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}
