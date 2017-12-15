import Vue from 'vue';
import axios from 'axios'
import App from './App.vue';
import VeeValidate from 'vee-validate';

import http from 'vue-resource'

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
//GLOBAL COMPONENTS
import WWHeader from './components/global/WWHeader.vue';
import Notification from './components/global/Notification.vue';
import AddresseeList from './components/global/AddresseeList/AddresseeList.vue';
import InputField from './components/global/InputField/InputField.vue';
import VModal from 'vue-js-modal'

import { routes } from "./router/routes.js"
import { store } from "./store/store"

Vue.config.productionTip = false;

Vue.use(http);

VeeValidate.Validator.extend('usernameExists', {
    getMessage: field => 'This username already exists!',
    validate: value => {
        return axios.post('/public/check/username', { field: value })
            .then(response => {
                console.log(response.data.result);
                return { valid: !response.data.result };
            })
            .catch(error => {
                return false;
                // ErrorHandler.pushError({ message: 'An issue with server-side validation!' })
            });
    }
});

VeeValidate.Validator.extend('emailExists', {
    getMessage: field => 'This email already exists!',
    validate: value => {
        return axios.post('/public/check/email', { field: value })
            .then(response => {
                console.log(response.data.result);
                return { valid: !response.data.result };
            })
            .catch(error => {
                return false;
                // ErrorHandler.pushError({ message: 'An issue with server-side validation!' })
            });
    }
});

VeeValidate.Validator.extend('chatExists', {
    getMessage: field => 'This chat title already exists!',
    validate: value => {
        return axios.post('/public/check/chat/title', { field: value })
            .then(response => {
                return { valid: !response.data.result };
            })
            .catch(error => {
                return false;
                //ErrorHandler.pushError({ message: 'An issue with server-side validation!' })
            });
    }
});

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.use(VModal);
Vue.use(require('vue-prevent-parent-scroll'));

const router = new VueRouter({
    routes
});

axios.interceptors.request
    .use(
        (config) => {
            config.headers.authorization = `${JSON.parse(localStorage.getItem('data')).token}`;
            return config;
        },
        (error) => {
            // Do something with request error
            return Promise.reject(error);
        }
    );



Vue.component('ww-header', WWHeader);
Vue.component('ww-notification', Notification);
Vue.component('addressee-list', AddresseeList);
Vue.component('input-field', InputField);

Vue.filter('timestamp', value => {

    const messageDate = new Date(value),
          currentDate = new Date(Date.now());

    const sameDay = messageDate.getFullYear() === currentDate.getFullYear() &&
        messageDate.getMonth() === currentDate.getMonth() &&
        messageDate.getDay() === currentDate.getDay();

    if(sameDay){
        return `${messageDate.getHours()} : ${messageDate.getMinutes()}`;
    }
    else{
        return `${messageDate.getMonth()}/${messageDate.getDay()}/${messageDate.getFullYear()} at ${messageDate.getHours()} : ${messageDate.getMinutes()}`
    }

});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});




