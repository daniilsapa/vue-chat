//IMPORTED MODULES
import axios from 'axios';

//IMPORTED SERVICES
import { ErrorHandler } from "../../services/ErrorHandler.secvice"

const state = {
    chatFetched: false,
    currentChat: {
        _id: null
    },
    newMessage: '',
    scrollEvent: false
};

const mutations = {
    'CHAT_M_ADD_MESSAGE'(state, message) {
        state.currentChat.messages.push(message);
        state.scrollEvent = true;
        setTimeout(() => {state.scrollEvent = false}, 100)
    },
    'CHAT_M_RESET_CHAT'(state) {
        state.currentChat = {};
        state.newMessage = '';
        state.chatFetched = false;
    },
    'CHAT_M_SCROLL'(state, message) {
        state.scrollHandler = true;
        setTimeout(() => {
            state.scrollHandler = false;
        }, 100)
    },
    'CHAT_M_SET_NEW_MESSAGE'(state, message) {
        state.newMessage = message;
    },
    'CHAT_M_SET_TYPING_USERS'(state, typingUsers) {
        state.currentChat.typingUsers = typingUsers;
    }
};

const actions = {
    'CHAT_A_BEFORE_LEAVE_CHAT'({ state, commit, dispatch, getters }) {
        const data = JSON.parse(localStorage.getItem('data')),
              currentChatId = state.currentChat._id;

        if(data.chats[currentChatId]){
            data.chats[currentChatId].message = state.newMessage;

            if(state.currentChat.messages[state.currentChat.messages.length - 1]){
                data.chats[currentChatId].lastMessage = state.currentChat.messages[state.currentChat.messages.length - 1]['_id'];
            }

            localStorage.setItem('data', JSON.stringify(data));
        }

        commit('CHAT_M_RESET_CHAT');
    },

    'CHAT_A_CHANGE_TYPING_STATE'({ getters }, state) {
        const messagesSocket = getters['SOCKET_IO_G_GET_MESSAGES_SOCKET'];

        if(state) {
            messagesSocket.emit('beginTyping', {});
        }
        else {
            messagesSocket.emit('finishTyping', {});
        }
    },

    'CHAT_A_FETCH_CHAT'({ state, dispatch }, id) {
        axios.get(`/private/chats/${id}`)
            .then(response => {
                dispatch('CHAT_A_SET_CHAT', response.data);
                state.chatFetched = true;
            })
            .catch(error => {
                ErrorHandler.pushError({message: 'Cannot get chat!'})
            });
    },

    'CHAT_A_SEND_MESSAGE'({ getters, commit }, message) {
        getters['SOCKET_IO_G_GET_MESSAGES_SOCKET'].emit('message',  message);
        commit('CHAT_M_SET_NEW_MESSAGE', '')
    },

    'CHAT_A_SET_CHAT'({ state, getters, commit }, chat) {
        const messagesSocket = getters['SOCKET_IO_G_GET_MESSAGES_SOCKET'],
              storedChats = JSON.parse(localStorage.getItem('data')).chats;

        chat.messages = chat.messages.map((message, index) => {
            let prevMessage = chat.messages[index - 1];

            if(prevMessage && message){
                if(prevMessage.author._id === message.author._id){
                    message.sameUser = true;
                }
            }

            return message;
        });

        messagesSocket
            .emit('changeChat', {
                currentChat: chat._id,
                previousChat: state.currentChat._id
            })
            .emit('typingUsers', {});

        chat.typingUsers = [];
        state.currentChat = chat;

        if(storedChats[chat._id] && storedChats[chat._id].message){
            commit('CHAT_M_SET_NEW_MESSAGE', storedChats[chat._id].message);
        }
    }
};

const getters = {
    'CHAT_G_GET_CHAT'(state) {
        return state.currentChat;
    },
    'CHAT_G_GET_NEW_MESSAGE'(state) {
        return state.newMessage;
    },
    'CHAT_G_GET_SCROLL_EVENT'(state) {
        return state.scrollEvent;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}