<template>
    <div class="row profile">
        <div class="col-lg-12">
            <div class="row">

                <div class="col-lg-5 avatar text-center">
                    <img class="rounded-circle" :src="user.avatarUrl"/>
                </div>

                <transition name="side" mode="out-in">
                    <router-view :user="user" class="col-lg-7 router-view"></router-view>
                </transition>

            </div>
        </div>
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
            UserProfile
        }

    }

</script>

<style lang="scss" scoped>

    $box-border-color: rgba(210, 210, 210, 1);

    .profile {
        padding: 30px;

        border: 1px solid $box-border-color;
        border-radius: 4px;

        background: rgba(255, 255, 255, 1);

        .avatar {
            padding: 50px;

            img {
                height: 200px;
            }
        }
    }


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

            transform: translateX(30px);
            opacity: 0;
        }
    }

</style>