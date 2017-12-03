
const state = {
    dataLS: null
};

const mutations = {
    'LOCAL_STORAGE_M_STORE_DATA'(state) {
        localStorage.setItem('data', JSON.stringify(state.dataLS));
    },
    'LOCAL_STORAGE_M_RESTORE_DATA'(state) {
        state.dataLS = JSON.parse(localStorage.getItem('data'));
    }
};

const actions = {
    'LOCAL_STORAGE_A_INIT_STORAGE'({ commit }) {

        if(!localStorage.data){
            localStorage.setItem('data', JSON.stringify({token: '', chats: {}}));
        }

        commit('LOCAL_STORAGE_M_RESTORE_DATA');
    },
    'LOCAL_STORAGE_A_SET_TOKEN'({ state, commit }, token) {

        state.dataLS.token = token;

        commit('LOCAL_STORAGE_M_STORE_DATA');
        commit('LOCAL_STORAGE_M_RESTORE_DATA');

    },
    'LOCAL_STORAGE_A_SET_MESSAGE'({ commit, state }, { chat, message }) {

        if(!state.dataLS.chats[chat]) {
            state.dataLS.chats[chat] = {};
        }

        state.dataLS.chats[chat].message = message;

        commit('LOCAL_STORAGE_M_STORE_DATA');
        commit('LOCAL_STORAGE_M_RESTORE_DATA');

    },
    'LOCAL_STORAGE_A_SET_LAST_MESSAGE'( { commit, state }, { chat, message } ) {
        if(!state.dataLS.chats[chat]) {
            state.dataLS.chats[chat] = {};
        }

        state.dataLS.chats[chat].lastReadMessage = message;

        commit('LOCAL_STORAGE_M_STORE_DATA');
        commit('LOCAL_STORAGE_M_RESTORE_DATA');
    }
};

const getters = {
    'LOCAL_STORAGE_G_GET_TOKEN'(state) {
        return state.dataLS.token;
    },
    'LOCAL_STORAGE_G_GET_STORAGE'(state){
        return state.dataLS;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
