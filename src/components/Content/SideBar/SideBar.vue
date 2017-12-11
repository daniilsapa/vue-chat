<template>

    <ul class="nav flex-column">
        <li class="nav-item">
            <router-link tag="div" class="nav-link" active-class="text-info" to="/" exact>Home</router-link>
        </li>
        <li class="nav-item">
            <router-link tag="div" class="nav-link" active-class="text-info" to="/profile">Profile</router-link>
        </li>
        <li class="nav-item">
            <router-link tag="div" class="nav-link" active-class="text-info" to="/chats">Chats</router-link>
        </li>
        <li class="nav-item">
            <router-link tag="div" class="nav-link" active-class="text-info" to="/notifications">
                Notifications
                <span class="badge badge-secondary" v-show="notifications.length !== 0">{{ notifications.length }}</span>
            </router-link>
        </li>
    </ul>

</template>

<script>

    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
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