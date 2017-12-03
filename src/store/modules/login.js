import Vue from 'vue';

import {ErrorHandler} from "../../services/ErrorHandler.secvice"

import {closeLogInModal} from "../../jQuery/closeLogInModal"

const state = {
    form: {
        email: '',
        password: ''

    }
};

const mutations = {

};

const actions = {
    'LOGIN_SEND_A_LOGIN_REQUEST'({ state, dispatch }) {

        console.log('login', {
            email: state.form.email,
            password: state.form.password
        });

        Vue.http.post('/auth/login', {
            email: state.form.email,
            password: state.form.password
        })
            .then(result => {

                dispatch('LOCAL_STORAGE_A_SET_TOKEN', result.body.token.split(' ')[1]);
                dispatch('APP_A_INIT_APP');
                closeLogInModal();

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
