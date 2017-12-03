import Vue from 'vue';
import App from './App.vue';

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import { routes } from "./routes.js"
import { store } from "./store/store"

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.use(require('vue-prevent-parent-scroll'));

const router = new VueRouter({
    routes
});

Vue.http.interceptors.push((request, next) => {

    request.headers.set('authorization', `${JSON.parse(localStorage.getItem('data')).token}`);
    next();

});

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
        return `${messageDate.getMonth()}|${messageDate.getDay()}|${messageDate.getFullYear()} at ${messageDate.getHours()} : ${messageDate.getMinutes()}`
    }

});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});




