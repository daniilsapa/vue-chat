
import { ErrorHandler } from "../services/ErrorHandler.secvice"

import Home from '../components/Content/Home/Home.vue';

import ChatList from '../components/Content/ChatList/ChatList.vue';
    //      \/ NESTED COMPONENTS \/
    import MessageBox from '../components/Content/MessageBox/MessageBox.vue';
    import ChatInvite from '../components/Content/ChatInvite.vue';
    import ChatCreation from '../components/Content/ChatCreation/ChatCreation.vue';

import Profile from '../components/Content/Profile/Profile.vue';
    //      \/ NESTED COMPONENTS \/
    import UserProfile from '../components/Content/Profile/UserProfile/UserProfile.vue'
    import ProfileEdit from '../components/Content/Profile/ProfileEdit/ProfileEdit.vue'

import Notifications from '../components/Content/NotificationBox/NotificationBox.vue';
import ChatSettings from '../components/Content/ChatSettings/ChatSettings.vue';
import Members from '../components/Content/ChatSettings/Members/Members.vue';
import AddMembers from '../components/Content/ChatSettings/AddMembers/AddMembers.vue';

export const routes = [
    {
        path: '',
        components: {
            default: Home,

        }
    },
    {
        path: '/chats',
        component: ChatList,
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
        path: '/chats/:id/settings',
        component: ChatSettings,
        children: [
            {
                path: '/chats/:id/settings/members',
                component: Members
            },
            {
                path: '/chats/:id/settings/members/add',
                component: AddMembers
            },

        ]
    },
    {
        path: '/chats/:id',
        component: MessageBox
    },
    {
      path: '/notifications',
      component: Notifications
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
            },
            {
                path: 'edit',
                component: ProfileEdit
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