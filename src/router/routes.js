
import { ErrorHandler } from "../services/ErrorHandler.secvice"

import Home from '../components/Content/Home/Home.vue';

import Chat from '../components/Content/Chat/Chat.vue';
    //      \/ NESTED COMPONENTS \/
    import MessageBox from '../components/Content/Chat/MessageBox/MessageBox.vue';
    import ChatInvite from '../components/Content/Chat/ChatInvite.vue';
    import ChatCreation from '../components/Content/Chat/ChatCreation/ChatCreation.vue';

import Profile from '../components/Content/Profile/Profile.vue';
    //      \/ NESTED COMPONENTS \/
import UserProfile from '../components/Content/Profile/UserProfile/UserProfile.vue'


export const routes = [
    {
        path: '',
        components: {
            default: Home,

        }
    },
    {
        path: '/chats',
        components: {
            default: Chat,
        },
        children: [
            {
                path: '',
                component: ChatInvite
            },
            {
                path: 'create',
                component: ChatCreation,

            },
            {
                path: ':id',
                component: MessageBox
            }

        ],
        beforeEnter(to, from, next) {

            const data = JSON.parse(localStorage.getItem('data'));

            if(data && data.token !== ''){
                next();
            }
            else{
                next(false);
                ErrorHandler.pushError({message: 'Only authorized users can access Chats'})
            }


        }
    },
    {
        path: '/profile',
        components: {
            default: Profile,
        },
        children: [
            {
                path: '',
                component: UserProfile
            }

        ],
        beforeEnter(to, from, next) {

            const data = JSON.parse(localStorage.getItem('data'));

            if(data && data.token !== ''){
                next();
            }
            else{
                next(false);
                ErrorHandler.pushError({message: 'Only authorized users can access Profile'})
            }


        }

    },
    {
        path: '*',
        redirect: '/'
    }
];