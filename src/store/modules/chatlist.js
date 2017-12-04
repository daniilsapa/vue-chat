import axios from 'axios';

import { ErrorHandler } from "../../services/ErrorHandler.secvice"

const state = {
    availableChats: []
};

const mutations = {
    'CHATLIST_M_SET_AVAILABLE_CHATS'(state, availableChats) {

        availableChats.forEach(item => {
            item.notifications = 0;
        });

        state.availableChats = availableChats

    },
    'CHATLIST_M_ADD_NOTIFICATION'(state, notification) {

        state.availableChats.forEach(item => {
           if(item._id === notification.chat){
               item.notifications += 1;
           }
        });

    },
    'CHATLIST_M_RESET_NOTIFICATIONS'(state, id) {
        state.availableChats.forEach(item => {
            if(item._id === id){
                item.notifications = 0;
            }
        })
    }
};

const actions = {
    'CHATLIST_A_FETCH_AVAILABLE_CHATS'({ commit, getters }, id) {

        axios.post('/private/chats/available', getters['SESSION_G_GET_CURRENT_USER']['availableChats'])
            .then(result => commit('CHATLIST_M_SET_AVAILABLE_CHATS', result.data))
            .catch(error => {

                ErrorHandler.pushError({message: 'Can\'t load chat list, try again later.'})

            });

    }
};

const getters = {
    'CHATLIST_G_GET_AVAILABLE_CHATS'(state) {
        return state.availableChats;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}