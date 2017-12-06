//IMPORTED MODULES
import axios from 'axios';

//IMPORTED SERVICES
import { ErrorHandler } from "../../services/ErrorHandler.secvice"

const state = {
    chat: {
        _id: null
    }
};

const mutations = {

};

const actions = {
    'CHAT_SETTINGS_A_FETCH_CHAT'({state, dispatch}, id) {
        axios.get(`/private/chats/${id}`)
            .then(response => {
                state.chat = response.data;
            })
            .catch(error => {
                ErrorHandler.pushError({message: 'Cannot get chat!'})
            });
    }
};

const getters = {
    'CHAT_SETTINGS_G_GET_CHAT'(state) {
        return state.chat;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}