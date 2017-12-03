
const state = {
    appState: false
};

const mutations = {
    'APP_M_SET_READY_STATE'(state, appState) {
        state.appState = true;
    }
};

const actions = {
    'APP_A_INIT_APP'({ commit, dispatch, state }) {
        dispatch('LOCAL_STORAGE_A_INIT_STORAGE');
        dispatch('SOCKET_IO_A_INIT_SOCKETS');

    }
};

const getters = {
    'APP_G_GET_APP_STATE'(state) {
        return state.appState;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
