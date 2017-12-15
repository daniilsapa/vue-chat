import axios from 'axios';

import { ErrorHandler } from "../../services/ErrorHandler.secvice"

const state = {
    availableChats: [],
    storedNotifications: {}
};

const mutations = {
    'CHATLIST_M_SET_AVAILABLE_CHATS'(state, availableChats) {
        availableChats.forEach(item => {
            if(state.storedNotifications[item._id]){
                item.notifications = state.storedNotifications[item._id];
            }
            else{
                item.notifications = 0;
            }
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
    },
    'CHATLIST_M_SET_FIELD_OF_CHAT'(state, obj) {
        state.availableChats.forEach(item => {
            if(item._id === obj.id){
                item[obj.changes.field] = obj.changes.value;
            }
        })
    },
    'CHATLIST_M_STORE_NOTIFICATIONS'(state) {
        let availableChats = state.availableChats;
        if(availableChats.length !== 0) {
            availableChats.forEach(item => {

                state.storedNotifications[item._id] = item.notifications;
            })
        }
    }
};

const actions = {
    'CHATLIST_A_FETCH_AVAILABLE_CHATS'({ commit, getters }, id) {
        commit('CHATLIST_M_STORE_NOTIFICATIONS');

        axios.post('/private/chats/available', getters['SESSION_G_GET_CURRENT_USER']['availableChats'])
            .then(({ data }) => {
                commit('CHATLIST_M_SET_AVAILABLE_CHATS', data);
            })
            .catch(error => {

                ErrorHandler.pushError({message: 'Can\'t load chat list, try again later.'})

            });
    }
};

const getters = {
    'CHATLIST_G_GET_AVAILABLE_CHATS'(state) {
        return state.availableChats;
    },
    'CHATLIST_G_GET_COUNT_OF_NOTIFICATIONS'(state) {
        let count = 0;

        state.availableChats.forEach(item => {
            count += item.notifications;
        });

        return count;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}