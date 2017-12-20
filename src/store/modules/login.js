import Vue from 'vue';

import { ErrorHandler } from "../../services/ErrorHandler.secvice"

const state = {
    form: {
        email: '',
        password: ''
    }
};

const mutations = {};

const actions = {
    'LOGIN_SEND_A_LOGIN_REQUEST'({ state, dispatch, commit }) {

        Vue.http.post('/auth/login', {
            email: state.form.email,
            password: state.form.password
        })
            .then(result => {
                commit('SOCKET_IO_M_CLOSE_CONNECTIONS');
                setTimeout(() => {
                    dispatch('LOCAL_STORAGE_A_SET_TOKEN', result.body.token.split(' ')[1]);
                    dispatch('APP_A_INIT_APP');
                }, 100)

            })
            .catch(error => {
                ErrorHandler.pushError({message: 'User not found or incorrect password'})
            });

    }
};

const getters = {
    'LOGIN_G_GET_FORM'(state) {
        return state.form;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
