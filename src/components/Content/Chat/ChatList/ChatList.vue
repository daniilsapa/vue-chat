<template>
    <div>
        <div class="chat-list-box">

            <div class="chat-list-header text-center">
                <h5>Your Chats</h5>
            </div>

            <div class="chat-list-wrapper">
                <div class="chat-list">

                    <div class="chat-list-item">
                        chat 1
                    </div>

                    <hr>

                    <div class="chat-list-item">
                        chat 2
                    </div>

                    <hr>

                    <div class="chat-list-item">
                        chat 3
                    </div>

                    <hr>

                    <div class="chat-list-item">
                        chat 4
                    </div>

                    <hr>

                    <div class="chat-list-item">
                        chat 5
                    </div>

                    <hr>

                    <div class="chat-list-item">
                        chat 6
                    </div>

                    <hr>

                    <div class="chat-list-item">
                        chat 7
                    </div>

                    <hr>

                    <div class="chat-list-item">
                        chat 8
                    </div>

                    <hr>

                    <div class="chat-list-item">
                        chat 9
                    </div>

                    <hr>

                    <div class="chat-list-item">
                        chat 10
                    </div>

                </div>



            </div>



            <!--<chat-list-item-->
                    <!--v-for="chat in availableChats"-->
                    <!--:chat="chat"-->
            <!--&gt;-->
            <!--</chat-list-item>-->
            <!--<router-link tag="div" to="/chats/create" class="add-chat-btn text-center">-->
                <!--<h5>Add new chat</h5>-->
            <!--</router-link>-->
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

        box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.45);
    }

    .chat-list-box {
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 1px 4px 0 rgba(0,0,0,0.75);

        border-radius: 3px;

        height: 500px;



        .chat-list-wrapper {

            padding: 20px;
            overflow: auto;
            max-height: 438px;
            /*overflow-x: hidden;*/
            /*overflow-y: hidden;*/




            .chat-list {
                box-shadow: 0 0 4px 0 rgba(0,0,0,0.75);
                border-radius: 3px;

                .chat-list-item {
                    padding: 10px 5px 10px 5px;
                }

            }

        }

        .chat-list-wrapper::-webkit-scrollbar {
            width: 5px;
        }

        .chat-list-wrapper::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        }

        .chat-list-wrapper::-webkit-scrollbar-thumb {
            background-color: darkgrey;
            outline: 1px solid slategrey;
        }

        .add-chat-btn {
            margin: 5px 0 0 0;
            padding: 7px 0 5px 0;
            background: rgba(74, 157, 222, 1);
            cursor: pointer;
        }

    }

</style>