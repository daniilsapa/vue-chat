const state = {
    currentUser: {
        notifications: []
    },
    userType: null
};

const mutations = {
    'SESSION_M_PUSH_NOTIFICATIONS'(state, notification) {
        state.currentUser.notifications.push(notification);
    },
    'SESSION_M_SET_FIELD'(state, { field, value }) {
        state.currentUser[field] = value;
    },
    'SESSION_M_ADD_CHAT'(state, newChatId) {
        state.currentUser.availableChats.push(newChatId);
    }
};

const actions = {
    'SESSION_LOG_OUT'({ dispatch, state, commit }) {
        dispatch('LOCAL_STORAGE_A_SET_TOKEN', null);
        commit('SOCKET_IO_M_CLOSE_CONNECTIONS');
        state.currentUser = { notifications: [] };
        state.userType = 'guest';
    },
    'SESSION_SET_CURRENT_USER'({state, commit}, user) {
        state.currentUser = user;
        state.userType = user.accessRights;

        commit('APP_M_SET_READY_STATE');
    },
    'SESSION_A_JOIN_CHAT'({ getters }, id) {
        getters['SOCKET_IO_G_GET_MESSAGES_SOCKET'].emit('chat.join', { chatID: id });
        getters['SOCKET_IO_G_GET_NOTIFICATIONS_SOCKET'].emit('join', { chatID: id });
    },
    'SESSION_A_CREATE_CHAT'({ getters }, data) {
        getters['SOCKET_IO_G_GET_MESSAGES_SOCKET'].emit('chat.create', data.data, data.cb);
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
