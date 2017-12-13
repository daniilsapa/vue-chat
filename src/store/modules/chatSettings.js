//IMPORTED MODULES
import axios from 'axios';

//IMPORTED SERVICES
import { ErrorHandler } from "../../services/ErrorHandler.secvice"

const state = {
    chat: {
        _id: null
    },
    invited: [],
    inviteReceivers: [],
    users: [],

};

const mutations = {
    'CHAT_SETTINGS_M_PUSH_INVITE_RECEIVERS'(state, receiver) {
        state.inviteReceivers.push(receiver);
    },
    'CHAT_SETTINGS_M_SPLICE_INVITE_RECEIVERS'(state, index) {
        state.inviteReceivers.splice(index, 1);
    },
    'CHAT_SETTINGS_M_RESET_INVITE_RECEIVERS'(state, index) {
        state.inviteReceivers = [];
    },
    'CHAT_SETTINGS_M_SET_FIELD'(state, { field, value }) {
        state.chat[field] = value;
    }
};

const actions = {
    'CHAT_SETTINGS_A_FETCH_CHAT'({state, dispatch}, id) {
        axios.get(`/private/chats/${id}`)
            .then(({ data }) => {
                state.chat = data;
                state.invited = data.invites
                    .filter(item => {
                        return item.state === 'pending';
                    })
                    .map(item => {
                        return item.receiver;
                    })
            })
            .catch(error => {
                ErrorHandler.pushError({message: 'Cannot get chat!'})
            });
    },
    'CHAT_SETTINGS_A_FETCH_USERS'({state, dispatch, getters}, id) {
        axios.get(`/private/users`)
            .then(response => {
                state.users = response.data;
            })
            .catch(error => {
                ErrorHandler.pushError({message: 'Cannot get a list of users!'})
            });
    },
    'CHAT_SETTINGS_A_SEND_NOTIFICATIONS'({state, dispatch, getters}, id) {

        getters['SOCKET_IO_G_GET_NOTIFICATIONS_SOCKET'].emit('notification.invite', {
            receivers: state.inviteReceivers,
            notification: {
                chat: state.chat._id,
                content: `You\'ve been invited to "${ state.chat.title }" chat`,
                sender: state.chat.creator,
                title: "Invite to the chat"
            }
        });

        state.invited = state.invited.concat(state.inviteReceivers);
        state.inviteReceivers = [];
    }

};

const getters = {
    'CHAT_SETTINGS_G_GET_CHAT'(state) {
        return state.chat;
    },
    'CHAT_SETTINGS_G_INVITED'(state) {
        return state.invited;
    },
    'CHAT_SETTINGS_G_INVITE_RECEIVERS'(state) {
        return state.inviteReceivers;
    },
    'CHAT_SETTINGS_G_GET_USERS'(state) {
        const unnecessaryUsers = {};

        if(state.chat._id){
            state.chat.members.forEach(member => {
                unnecessaryUsers[member._id] = true;
            });
        }

        state.inviteReceivers.forEach(receiver => {
            unnecessaryUsers[receiver._id] = true;
        });

        state.invited.forEach(receiver => {
            unnecessaryUsers[receiver._id] = true;
        });

        return state.users.filter((user, index) => {
            console.log('filter function', unnecessaryUsers[user._id]);
            return !unnecessaryUsers[user._id];
        });
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}