<template>

    <ul class="nav flex-column">
        <li class="nav-item">
            <router-link active-class="text-info" class="nav-link" exact tag="div" to="/">Home</router-link>
        </li>

        <li class="nav-item">
            <router-link active-class="text-info" class="nav-link" tag="div" to="/profile">Profile</router-link>
        </li>

        <li class="nav-item">
            <router-link active-class="text-info" class="nav-link" tag="div" to="/chats">
                Chats
                <span v-show="countOfNotifications !== 0" class="badge badge-secondary">{{ countOfNotifications }}</span>
            </router-link>
        </li>

        <li class="nav-item">
            <router-link active-class="text-info" class="nav-link" tag="div" to="/notifications">
                Notifications
                <span v-show="notifications.length !== 0" class="badge badge-secondary">{{ notifications.length }}</span>
            </router-link>
        </li>

    </ul>

</template>

<script>
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex'

    export default {
        name: 'SideBar',
        computed: {
            ...mapGetters({
                countOfNotifications: 'CHATLIST_G_GET_COUNT_OF_NOTIFICATIONS',
                user: 'SESSION_G_GET_CURRENT_USER'
            }),
            notifications() {
                if(this.user.notifications){
                    return this.user.notifications.filter(item => {
                        return item.state === 'pending';
                    });
                }
                else{
                    return [];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .nav-link {
        font-weight: 500;

        cursor: pointer;
    }
</style>