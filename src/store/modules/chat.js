import Vue from 'vue';


const state = {
    currentChat: {
        _id: 'none'
    },
    newMessage: '',
    scrollHandler: false,
    chatFetched: false
};

const mutations = {
    'CHAT_M_ADD_MESSAGE'(state, message) {

        state.currentChat.messages.push(message);

    },
    'CHAT_M_SCROLL'(state, message) {

        state.scrollHandler = true;
        setTimeout(() => {
            state.scrollHandler = false;
        }, 100)

    },
    'CHAT_M_RESET_CHAT'(state) {
        state.currentChat = {};
    },
    'CHAT_M_SET_NEW_MESSAGE'(state, message) {
        state.newMessage = message;
    },
    'CHAT_M_SET_TYPING_USERS'(state, typingUsers) {
        state.currentChat.typingUsers = typingUsers;
    }

};

const actions = {
    'CHAT_A_FETCH_CHAT'({ state, dispatch }, id) {

        Vue.http.get(`/private/chats/${id}`)
            .then(response => {

                dispatch('CHAT_A_SET_CHAT', response.body);
                state.chatFetched = true;

            });


    },
    'CHAT_A_SET_CHAT'({ state, getters }, chat) {

        let repeatsCount = 0;
        let currentUser = null;

        chat.messages = chat.messages.map((item, index) => {

            if(item.author._id !== currentUser){
                repeatsCount = 0;
            }

            currentUser = item.author._id;
            ++repeatsCount;

            if(repeatsCount >= 2){
                item.sameUser = true;
            }

            return item;

        });

        chat.typingUsers = [];

        getters['SOCKET_IO_G_GET_MESSAGES_SOCKET'].emit('changeChat', {
            currentChat: chat._id,
            previousChat: state.currentChat._id
        });

        getters['SOCKET_IO_G_GET_MESSAGES_SOCKET'].emit('typingUsers', {});

        state.currentChat = chat;

        const currentChatId = state.currentChat._id,
              localStorage = getters['LOCAL_STORAGE_G_GET_STORAGE'],
              messageStored = localStorage.chats[currentChatId] && localStorage.chats[currentChatId].message;

        if(messageStored) {
            state.newMessage = localStorage.chats[currentChatId].message;
        }
        else {
            state.newMessage = '';
        }

    },
    'CHAT_A_SEND_MESSAGE'({ getters, state }, message) {
        getters['SOCKET_IO_G_GET_MESSAGES_SOCKET'].emit('message',  message);
    },
    'CHAT_A_BEFORE_LEAVE_CHAT'({ state, commit, dispatch, getters }) {

        if(state.currentChat._id){
            const currentChatId = state.currentChat._id;

            dispatch('LOCAL_STORAGE_A_SET_MESSAGE', {
                chat: currentChatId,
                message: state.newMessage
            });

            dispatch('LOCAL_STORAGE_A_SET_LAST_MESSAGE', {
                chat: currentChatId,
                message: state.currentChat.messages[state.currentChat.messages.length - 1]['_id']
            });

            commit('CHAT_A_RESET_CHAT');

            state.chatFetched = false;
        }

    },
    'CHAT_A_CHANGE_TYPING_STATE'({ getters }, state) {

        if(state) {
            getters['SOCKET_IO_G_GET_MESSAGES_SOCKET'].emit('beginTyping', {})
        }
        else {
            getters['SOCKET_IO_G_GET_MESSAGES_SOCKET'].emit('finishTyping', {})
        }


    }

};

const getters = {
    'CHAT_G_GET_CHAT'(state) {
        return state.currentChat;
    },
    'CHAT_G_GET_SCROLL'(state) {
        return state.scrollHandler;
    },
    'CHAT_G_GET_NEW_MESSAGE'(state) {
        return state.newMessage;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}