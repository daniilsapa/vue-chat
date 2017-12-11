const state = {
    currentUser: {
        notifications: []
    },
    userType: null
};

const mutations = {
    'SESSION_M_PUSH_NOTIFICATIONS'(state, notification) {
        state.currentUser.notifications.push(notification);
    }
};

const actions = {
    'SESSION_LOG_OUT'({ dispatch, state }) {
        dispatch('LOCAL_STORAGE_A_SET_TOKEN', '');
        state.currentUser = { notifications: [] };
        state.userType = 'guest';
    },
    'SESSION_SET_CURRENT_USER'({state, commit}, user) {
        state.currentUser = user;
        state.userType = user.accessRights;

        commit('APP_M_SET_READY_STATE');
    }
};

const getters = {
    'SESSION_G_GET_CURRENT_USER'(state) {
        return state.currentUser;
    },
    'SESSION_G_GET_USER_TYPE'(state) {
        return state.userType;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
