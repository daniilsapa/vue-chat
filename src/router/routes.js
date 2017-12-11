//IMPORTED SERVICES
import { ErrorHandler } from "../services/ErrorHandler.secvice"
//IMPORTED COMPONENTS
import AddMembers from '../components/Content/ChatSettings/AddMembers/AddMembers.vue';
import ChatCreation from '../components/Content/ChatCreation/ChatCreation.vue';
import ChatList from '../components/Content/ChatList/ChatList.vue';
import ChatSettings from '../components/Content/ChatSettings/ChatSettings.vue';
import Home from '../components/Content/Home/Home.vue';
import Members from '../components/Content/ChatSettings/Members/Members.vue';
import MessageBox from '../components/Content/MessageBox/MessageBox.vue';
import Notifications from '../components/Content/NotificationBox/NotificationBox.vue';
import Profile from '../components/Content/Profile/Profile.vue';
import ProfileEdit from '../components/Content/Profile/ProfileEdit/ProfileEdit.vue'
import UserProfile from '../components/Content/Profile/UserProfile/UserProfile.vue'

const beforeEnter = (to, from, next) => {

    const data = JSON.parse(localStorage.getItem('data'));

    if(data && data.token !== ''){
        next();
    }
    else{
        next(false);
        ErrorHandler.pushError({message: 'Only authorized users can access route'})
    }
};

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
        beforeEnter: beforeEnter
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
        ],
        beforeEnter: beforeEnter
    },
    {
        path: '/chats/create',
        component: ChatCreation,
        beforeEnter: beforeEnter
    },
    {
        path: '/chats/:id',
        component: MessageBox,
        beforeEnter: beforeEnter
    },
    {
        path: '/notifications',
        component: Notifications,
        beforeEnter: beforeEnter
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
        beforeEnter: beforeEnter
    },
    {
        path: '*',
        redirect: '/'
    }
];