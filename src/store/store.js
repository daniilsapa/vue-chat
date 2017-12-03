import Vue from 'vue';
import VueX from 'vuex';

//IMPORTED MODULES
import app from './modules/app';
import stocks from './modules/stocks';
import portfolio from './modules/portfolio';
import chat from './modules/chat';
import chatlist from './modules/chatlist';
import localStorage from './modules/localStorage';
import session from './modules/session';
import socketIO from './modules/socketIO';
import login from './modules/login';
import signup from './modules/signup';
import profile from  './modules/profile';


import errors from './modules/errors';


Vue.use(VueX);

export const store = new VueX.Store({
    modules: {
        app,
        stocks,
        portfolio,
        chat,
        chatlist,
        localStorage,
        session,
        socketIO,
        login,
        signup,
        profile
    }
});