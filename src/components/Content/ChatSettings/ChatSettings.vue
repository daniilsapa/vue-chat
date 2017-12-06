<template>
    <div>
        <div class="profile row ww-box">

            <ww-header class="col-lg-12" title="Chat settings"></ww-header>

            <div class="col-lg-5 avatar text-center">
                <img class="rounded-circle" :src="chat.coverUrl"/>
            </div>

            <div class="col-lg-12">
                <ul class="nav">
                    <li class="nav-item">
                        <router-link :to="`/chats/${chat._id}/settings/members`" tag="a" class="nav-link" active-class="text-info" exact>Members</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="`/chats/${chat._id}/settings/members/add`" tag="a" class="nav-link" active-class="text-info">Add Members</router-link>
                    </li>
                </ul>
            </div>


            <transition name="side" mode="out-in">
                <router-view class="col-lg-12 router-view" :members="chat.members"></router-view>
            </transition>

        </div>
    </div>
</template>

<script>
    //IMPORTED MAPPERS
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                appState: 'APP_G_GET_APP_STATE',
                chat: 'CHAT_SETTINGS_G_GET_CHAT'
            })
        },
        components: {

        },
        watch: {
            appState(newState) {
                if(newState) {
                    this.getChat(this.$route.params.id);
                }
            }
        },
        methods: {
            ...mapActions({
                getChat: 'CHAT_SETTINGS_A_FETCH_CHAT'
            })
        },
        created () {
            if(this.appState) {
                this.getChat(this.$route.params.id);
            }
        },
    }



</script>

<style lang="scss" scoped>

    $box-border-color: rgba(210, 210, 210, 1);

    .profile {

        .avatar {
            padding: 50px;

            img {
                height: 200px;
            }
        }
    }


    .nav-link {
        color: rgba(190, 190, 190, 1);
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