<template>
    <div class="row profile">

        <profile-avatar class="col-lg-12 text-center" :user="user" ></profile-avatar>
        <transition name="side" mode="out-in">
            <router-view :user="user" class="col-lg-6 router-view"></router-view>
        </transition>
    </div>
</template>

<script>

    //IMPORTED COMPONENTS
    import ProfileAvatar from './ProfileAvatar/ProfileAvatar.vue';
    import UserProfile from './UserProfile/UserProfile.vue';

    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                user: 'SESSION_G_GET_CURRENT_USER',
                css: 'PROFILE_G_GET_CSS'
            })
        },
        components: {
            ProfileAvatar,
            UserProfile
        }

    }

</script>

<style lang="scss" scoped>

    .router-view {

        margin: 15px 0 100px 0;

    }

    .side-enter-active {
        animation: side-in 200ms ease-out forwards;
    }

    .side-leave-active {
        animation: side-out 200ms ease-out forwards;
    }

    @keyframes side-in {
        from {
            transform: translateX(-30px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes side-out {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {

            transform: translateX(-30px);
            opacity: 0;
        }
    }

</style>