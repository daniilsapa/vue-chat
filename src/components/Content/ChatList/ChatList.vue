<template>
    <div>
        <div class="chat-list-box">

            <div class="chat-list-header text-center">
                <h5>Your Chats</h5>
                <hr>
            </div>

            <div class="chat-list" v-prevent-parent-scroll>
                <chat-list-item
                        class="chat-list-item"
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
    //IMPORTED COMPONENTS
    import ChatListItem from './ChatListItem.vue';
    //IMPORTED MAPPERS
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                appState: 'APP_G_GET_APP_STATE',
                availableChats: 'CHATLIST_G_GET_AVAILABLE_CHATS',
            })
        },
        watch: {
            appState(newState) {
                if(newState){
                    this.getChatList();
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
        }
    }

</script>

<style lang="scss" scoped>

    $box-border-color: rgba(210, 210, 210, 1);

    .chat-list-box {
        position: relative;

        height: 500px;

        background: rgba(255, 255, 255, 1);

        border: 1px solid $box-border-color;
        border-radius: 4px;

        .chat-list-header {
            padding: 15px 0 0 0;

            background: rgba(242, 242, 242, 0.8);

            border-radius: 4px 4px 0 0;

            h5 {
                padding: 0 0 15px 0;
            }

            hr {
                margin: 0;
            }
        }

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

                font-weight: 500;
            }

            .add-chat-btn:hover {
                background: rgba(23, 162, 184, 0.9);
            }

        }

    }

</style>