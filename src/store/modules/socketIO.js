import io from 'socket.io-client';

const state = {
    socket: null,
    notifications: null,
    messages: null
};

const mutations = {
    'SOCKET_IO_M_CONNECT_TO_SOCKET'(state, {socket, title}) {
        state[title] = socket;
    }
};

const actions = {
    'SOCKET_IO_A_INIT_SOCKETS'({ commit, getters, state, dispatch }) {

        const token = getters['LOCAL_STORAGE_G_GET_TOKEN'];

        commit('SOCKET_IO_M_CONNECT_TO_SOCKET', {
            title: 'socket',
            socket: io({query: `auth_token=${token}` })
        });

        state.socket.on('success', (data) => {

            dispatch('SESSION_SET_CURRENT_USER', data.user);

            commit('SOCKET_IO_M_CONNECT_TO_SOCKET', {
                title: 'notifications',
                socket: io('http://localhost:3000/notifications')
            });

            state.notifications.on('notification.message', notification => {

                if(getters['CHAT_G_GET_CHAT']['_id'] !== notification.chat){
                    commit('CHATLIST_M_ADD_NOTIFICATION', notification);
                }

            });

            commit('SOCKET_IO_M_CONNECT_TO_SOCKET', {
                title: 'messages',
                socket: io('http://localhost:3000/messages')
            });

            state.messages.on('message', message => {

                const currentChat = getters['CHAT_G_GET_CHAT'];

                if(message.chat !== currentChat._id) return;

                if(currentChat.messages[currentChat.messages.length - 1] &&
                    ( currentChat.messages[currentChat.messages.length - 1]['author']['_id'] === message['author']['_id'])){
                    message['sameUser'] = true;
                }

                commit('CHAT_M_ADD_MESSAGE', message);
                commit('CHAT_M_SCROLL');

            });

            state.messages.on('typingUsers', typingUsers => {

                commit('CHAT_M_SET_TYPING_USERS', typingUsers);

            })

        }).on('error', function(err) {
            throw new Error(err);
        }).on('connect', function () {
            console.log('authenticated');

        }).on('disconnect', function () {
            console.log('disconnected');
        });


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
