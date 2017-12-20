const state = {
    css: {
        profileAvatarClass: false
    }

};

const mutations = {
    'PROFILE_M_SET_CSS'(state, {element, value}) {
        return state[element] = value;
    }
};

const actions = {

};

const getters = {
    'PROFILE_G_GET_CSS'(state) {
        return state.css;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
