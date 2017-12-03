<template>
    <div>
        <div class="chat-list-box">

            <div class="chat-list-header text-center">
                <h5>Your Chats</h5>
            </div>

            <div class="chat-list" v-prevent-parent-scroll>


                    <chat-list-item
                            v-for="chat in availableChats"
                            :chat="chat"
                    >
                    </chat-list-item>



            </div>

            <div class="add-chat-btn-wrapper">
                <div class="text-center">
                    <router-link tag="button" to="/chats/create" class="btn btn-info text-center add-chat-btn">
                        Add new chat
                    </router-link>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import ChatListItem from './ChatListItem.vue';

    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                availableChats: 'CHATLIST_G_GET_AVAILABLE_CHATS',
                socket: 'SOCKET_IO_G_GET_ROOT_SOCKET',
                appState: 'APP_G_GET_APP_STATE',
                user: 'SESSION_G_GET_CURRENT_USER'
            })
        },
        watch: {
            appState(newState) {
                if(newState){
                    this.$store.dispatch('CHATLIST_A_FETCH_AVAILABLE_CHATS', {});
                }
            }
        },
        methods: {
            ...mapActions({
                getChatList: 'CHATLIST_A_FETCH_AVAILABLE_CHATS'
            })
        },
        components: {
            ChatListItem
        },
        created() {

            if(this.appState){
                this.$store.dispatch('CHATLIST_A_FETCH_AVAILABLE_CHATS', {});
            }

        }
    }

</script>

<style lang="scss" scoped>

    .chat-list-header {
        padding: 15px 0 15px 0;

        background: rgba(215,215,215, 0.8);

        border-radius: 3px 3px 0 0;
        border-bottom: 1px solid rgba(180, 180, 180, 1);

        box-shadow: 0px 1px 7px 0px rgba(0,0,0,0.45);
    }

    .chat-list-box {
        background: rgba(255, 255, 255, 1);

        border: 1px solid rgba(180, 180, 180, 1);
        border-radius: 3px;

        height: 500px;

        position: relative;

        .chat-list {

            padding: 20px;
            overflow: auto;
            max-height: 438px;

        }

        .add-chat-btn-wrapper {
            position: absolute;
            bottom: 5px;

            width: 100%;

            div {
                position: static;
            }

            .add-chat-btn {
                background: rgba(23, 162, 184, 0.4);

            }

            .add-chat-btn:hover {
                background: rgba(23, 162, 184, 0.7);
            }

        }

    }

</style>