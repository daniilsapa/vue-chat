
const state = {
    errors: [],
    currentError: null,
    errorsState: 'noErrors'
};

const mutations = {
    'ERRORS_PUSH_ERRORS'(state, error) {

        state.errors.push(error);
        state.errors = [];

        if(state.errors.length = 1 && state.errorsState !== 'showingError') {
            state.errorsState = 'ready';
        }

    },
    'ERRORS_SET_ERRORS_STATE'(state, newState) {

        console.log('new state', newState);
        state.errorsState = newState;

    }
};

const actions = {
    'ERRORS_THROW_ERROR'({ commit }, error) {
        commit('ERRORS_PUSH_ERRORS', error);
    },
    'ERRORS_SHIFT_ERRORS'({ state, getters }) {



    }
};

const getters = {
    errors(state) {
        return state.errors;
    },
    errorsState(state) {
        return state.errorsState;
    },
    currentError(state) {
        return state.currentError;
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}